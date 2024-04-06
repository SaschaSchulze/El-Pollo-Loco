let game_music = new Audio('audio/game_music.mp3');
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