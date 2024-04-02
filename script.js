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
    let canvas = document.getElementById('canvas');
    let gameSymbols = document.querySelector('.game-symbols');
    let docElm = document.documentElement;

    if (docElm.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (docElm.mozRequestFullScreen) { /* Firefox */
        canvas.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        canvas.webkitRequestFullscreen();
    } else if (docElm.msRequestFullscreen) { /* IE/Edge */
        canvas.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
    }

    let gameSymbols = document.querySelector('.game-symbols');
    gameSymbols.style.display = 'block';
}

function showGameOverScreen() {
    let gameOverScreen = document.getElementById('gameOverScreenContainer');
    gameOverScreen.style.display = 'block';
}

document.addEventListener("DOMContentLoaded", function() {
    showStartScreen();
});

function showStartScreen() {
    let startScreen = document.getElementById('startScreenContainer');
    startScreen.style.backgroundImage = "url('img_pollo_locco/img/9_intro_outro_screens/start/startscreen_1.png')";
    startScreen.style.display = 'block';

    let canvas = document.getElementById('canvas');
    canvas.style.pointerEvents = 'none';
}

function startGame() {
    hideStartScreen();
    init();
}

function hideStartScreen() {
    let startScreen = document.getElementById('startScreenContainer');
    startScreen.style.display = 'none';
}

function hideGameOverScreen() {
    let gameOverScreen = document.getElementById('gameOverScreenContainer');
    gameOverScreen.style.display = 'none';
}

function restartGame() {
    hideGameOverScreen();
    startGame();
    location.reload();
    hideStartScreen();
}