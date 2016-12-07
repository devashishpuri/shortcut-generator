var debug = true;
var isShortcutMode = false;
var keysDown = [];
var keysDownName = [];
var keyConDefault = '';
var shortcuts = {};
var generatedCode = '';

var keyDisp = document.getElementById('keysContainer');
keyConDefault = keyDisp.innerHTML;

//KEYDOWN EVENT
document.addEventListener("keydown", function(e){
	debug?console.log('Key Down Event', e): '';

	if(!isShortcutMode) {
		keyDisp.innerHTML = keyConDefault;
		document.getElementById('pressedKeyCode').innerText = e.keyCode;
		document.getElementById('pressedKeyName').innerText = e.code;
		keysDown.push(e.keyCode);
		keysDownName.push(e.code);
	}
	else {

		if(!keysDown.length) {
			keyDisp.innerHTML = '';
		}

		var alreadyPressed = keysDown.includes(e.keyCode);
		if(!alreadyPressed) {
			var keyCon = document.getElementById('keysContainer');
			keyCon.innerHTML += ''+
				'<div class="pressedKey">'+
					'<p class="pressedKeyCode">'+e.keyCode+'</p>'+
					'<p  class="pressedKeyName">'+e.code+'</p>'+
				'</div>';
			keysDown.push(e.keyCode);
			keysDownName.push(e.code);
		}
	}

	/*keysDown.push(e.keyCode);
	keysDownName.push(e.code);*/
});

//KEYUP EVENT
document.addEventListener("keyup", function(e){
	debug?console.log('Key Up Event', e): '';
	
	if(keysDown.length > 1 && isShortcutMode) {
		var shortcutStr = [];
		keysDownName.forEach(function(keyName){
			shortcutStr.push(keyName);
		});
		shortcutStr = shortcutStr.join('_');

		if(!shortcuts[shortcutStr]) {
			shortcuts[shortcutStr] = [];
			shortcuts[shortcutStr] = keysDown.slice();

			while(shortcutStr.indexOf('_') != -1){
				shortcutStr = shortcutStr.replace('_', ' + ');
			}

			document.getElementById('addedShortcuts').innerText += shortcutStr + '\n'; 
		}
	}
	keysDown = [];
	keysDownName = [];
	isShortcutMode = false;
});

var addShortcutBt = document.getElementById('addShortcut');
addShortcutBt.addEventListener('click', function(e){
	keyDisp.innerHTML = keyConDefault;
	document.getElementById('pressedKeyName').innerText = 'Press Keys to Add Shortcut';
	isShortcutMode = true;
});
addShortcutBt.addEventListener('focus', function(e){
	debug? console.log('FOCUS', e.target): '';
	e.target.blur();
})

codeGenBt = document.getElementById('codeGenBt');
codeGenBt.addEventListener('click', function(){
    var codeStr = '<code>'+
                    '(function() {<br>'+
                	    '&emsp;var keyStack = [];<br>'+
                	    '&emsp;document.addEventListener(\'keydown\', function(event){<br>'+
                		    '&emsp;&emsp;keyCode = event.keyCode;<br>'+
                		    '&emsp;&emsp;if(!keyStack.includes(keyCode)) {<br>'+
                			    '&emsp;&emsp;&emsp;keyStack.push(keyCode);<br>'+
                		    '&emsp;&emsp;}<br>'+
                	    '&emsp;});<br>'+
                	    '&emsp;document.addEventListener(\'keyup\', function(event){<br>'+
                		    '&emsp;&emsp;keyStackLength = keyStack.length;<br>'+
                		    '&emsp;&emsp;keyStackStr = \'\';<br>'+
                		    '&emsp;&emsp;for(var i=0; i&lt;keyStackLength; i++) {<br>'+
                			    '&emsp;&emsp;&emsp;keyStackStr += (keyStack[i] + \'>\');<br>'+
                		    '&emsp;&emsp;}<br>'+
                		    '&emsp;&emsp;expression = keyStackStr;<br>'+
                		    '&emsp;&emsp;switch(expression) {<br>';

    for(var key in shortcuts) {
    	var keySet = key;
    	while(keySet.indexOf('_')!= -1){
    		keySet = keySet.replace('_', ' + ');
    	}
    	codeStr +=              '&emsp;&emsp;&emsp;//'+ keySet + '<br>';
    	var keys = '';
    	keysLength = shortcuts[key].length;
    	for(var i = 0; i<keysLength; i++){
    		keys += shortcuts[key][i] + '>';
    	}
    	codeStr +=              '&emsp;&emsp;&emsp;case \'' + keys + '\':<br>';
    	codeStr +=              '&emsp;&emsp;&emsp;&emsp;//Your Function Here<br>'
    	codeStr +=              '&emsp;&emsp;&emsp;&emsp;break;<br>';
    }

    codeStr+=               '&emsp;&emsp;}<br>'+
                    	    '&emsp;&emsp;keyStack = [];<br>'+ 
                        '&emsp;});<br>'+
                    '}());<br>'+
                  '</code>';
    document.getElementById('generatedCode').innerHTML = codeStr;
    document.getElementById('generatedCodeCon').style.display = 'block';
});

var closeButton = document.getElementById('generatedCodeConClose');
closeButton.addEventListener('click', function(){
	document.getElementById('generatedCode').innerHTML = '';
    document.getElementById('generatedCodeCon').style.display = 'none';
});
