var debug = false;
var isShortcutMode = false;
var keysDown = [];
var keysDownName = [];
var keyConDefault = '';
var shortcuts = {};

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
	
	if(keysDown.length > 1) {
		var shortcutStr = [];
		keysDownName.forEach(function(keyName){
			shortcutStr.push(keyName);
		});
		shortcutStr = shortcutStr.join('_');

		shortcuts[shortcutStr] = [];
		shortcuts[shortcutStr] = keysDown.slice();
	
		//add Shortcut in 
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

