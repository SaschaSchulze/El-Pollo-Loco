let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    level = createLevel1();
    world = new World(canvas, keyboard);
    if (world) {
        world.startGame();
        console.log("Initialisiert");
    }  
}

window.addEventListener("keydown", (e) => { // (e) steht für Event, kann auch anders genannt werden
    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if(e.keyCode == 87) {
        keyboard.UP = true;
    }

    if(e.keyCode == 68) {
        keyboard.RIGHT = true;
    }

    if(e.keyCode == 65) {
        keyboard.LEFT = true;
    }

    if(e.keyCode == 83) {
        keyboard.DOWN = true;
    }
});

window.addEventListener("keyup", (e) => { // (e) steht für Event, kann auch anders genannt werden
    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if(e.keyCode == 87) {
        keyboard.UP = false;
    }

    if(e.keyCode == 68) {
        keyboard.RIGHT = false;
    }

    if(e.keyCode == 65) {
        keyboard.LEFT = false;
    }

    if(e.keyCode == 83) {
        keyboard.DOWN = false;
    }
});