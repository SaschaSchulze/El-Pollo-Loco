let game_music = new Audio('audio/game_music.mp3');
let win_music = new Audio('audio/win.mp3');
let musicMuted = false;

game_music.addEventListener('canplaythrough', function () {
    game_music.play();
    updateSoundIcon();
});

function toggleMusic() {
    if (musicMuted) {
        game_music.play();
    } else {
        game_music.pause();
    }
    musicMuted = !musicMuted;
    updateSoundIcon();
}

function updateSoundIcon() {
    let soundIcon = document.getElementById('sound-icon');
    if (musicMuted) {
        soundIcon.src = "./img_pollo_locco/speaker_off.svg";
    } else {
        soundIcon.src = "./img_pollo_locco/speaker_on.svg";
    }
}

window.onload = function () {
    updateSoundIcon();
};

/*window.onload = function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        showFullscreen();
    }
};*/

document.addEventListener('DOMContentLoaded', function () {
    handleMobileKeyPressEvents();
    handleMobileKeyPressEventsEnd();
});

function handleMobileKeyPressEvents() {
    let rightButton = document.getElementById('right-btn');
    let leftButton = document.getElementById('left-btn');
    //let jumpButtonLeft = document.getElementById('jump-btn-left');
    let jumpButtonRight = document.getElementById('jump-btn-right');
    //let throwButtonLeft = document.getElementById('throw-btn-left');
    let throwButtonRight = document.getElementById('throw-btn-right');

    /*jumpButtonLeft.addEventListener('touchstart', (e) => {
        keyboard.UP = true;
    });

    throwButtonLeft.addEventListener('touchstart', (e) => {
        keyboard.SPACE = true;
    });*/

    throwButtonRight.addEventListener('touchstart', (e) => {
        keyboard.SPACE = true;
    });

    jumpButtonRight.addEventListener('touchstart', (e) => {
        keyboard.UP = true;
    });

    leftButton.addEventListener('touchstart', (e) => {
        keyboard.LEFT = true;
    });

    rightButton.addEventListener('touchstart', (e) => {
        keyboard.RIGHT = true;
    });
}

function handleMobileKeyPressEventsEnd() {
    let rightButton = document.getElementById('right-btn');
    let leftButton = document.getElementById('left-btn');
    //let jumpButtonLeft = document.getElementById('jump-btn-left');
    let jumpButtonRight = document.getElementById('jump-btn-right');
    //let throwButtonLeft = document.getElementById('throw-btn-left');
    let throwButtonRight = document.getElementById('throw-btn-right');

    /*jumpButtonLeft.addEventListener('touchend', (e) => {
        keyboard.UP = false;
    });

    throwButtonLeft.addEventListener('touchend', (e) => {
        keyboard.SPACE = false;
    });*/

    throwButtonRight.addEventListener('touchend', (e) => {
        keyboard.SPACE = false;
    });

    jumpButtonRight.addEventListener('touchend', (e) => {
        keyboard.UP = false;
    });

    rightButton.addEventListener('touchend', (e) => {
        keyboard.RIGHT = false;
    });

    leftButton.addEventListener('touchend', (e) => {
        keyboard.LEFT = false;
    });
}

function showFullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    let fullscreenIcon = document.querySelector('.game-symbols img[alt="Fullscreen"]');
    fullscreenIcon.src = "img_pollo_locco/fullscreen-exit.svg";
    fullscreenIcon.alt = "Exit Fullscreen";
    fullscreenIcon.onclick = exitFullscreen;

    enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function exitFullscreen() {
    let fullscreenIcon = document.querySelector('.game-symbols img[alt="Exit Fullscreen"]');
    fullscreenIcon.src = "img_pollo_locco/fullscreen.svg";
    fullscreenIcon.alt = "Fullscreen";
    fullscreenIcon.onclick = showFullscreen;

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function homeScreen() {
    showStartScreen();
    hideGameOverScreen();
    hideLostScreen();
}

function showLostScreen() {
    let gameOverScreen = document.getElementById('lostContainer');
    gameOverScreen.style.display = 'block';
}

function gameOverScreen() {
    let gameOverScreen = document.getElementById('gameOverScreen');
    gameOverScreen.style.display = 'block';
    win_music.play();
}

function showStartScreen() {
    let startScreen = document.getElementById('startScreenContainer');
    startScreen.style.backgroundImage = "url('img_pollo_locco/img/9_intro_outro_screens/start/startscreen_1.png')";
    startScreen.style.display = 'block';

    let canvas = document.getElementById('canvas');
    canvas.style.pointerEvents = 'none';
}

function startGame() {
    hideStartScreen();
    hideGameOverScreen();
    hideLostScreen();
    world = null;
    createLevel1();
    init();
}

function hideStartScreen() {
    let startScreen = document.getElementById('startScreenContainer');
    startScreen.style.display = 'none';
}

function hideGameOverScreen() {
    let gameOverScreen = document.getElementById('gameOverScreen');
    gameOverScreen.style.display = 'none';
}

function hideLostScreen() {
    let gameOverScreen = document.getElementById('lostContainer');
    gameOverScreen.style.display = 'none';
}