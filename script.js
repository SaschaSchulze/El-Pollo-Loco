let game_music = new Audio('audio/game_music.mp3');
let win_music = new Audio('audio/win.mp3');
let lose_music = new Audio('audio/gameLose.mp3');
let musicMuted = false;

/**
 * Toggles the display of the controls legend.
 */
function toggleControlls() {
    let legendContainer = document.querySelector('.legend-container');

    if (legendContainer.style.display === 'none' || legendContainer.style.display === '') {
        let overlay = document.createElement('div');
        overlay.classList.add('overlay');

        overlay.addEventListener('click', function (event) {
            let controllContainer = document.querySelector('.controll-container');
            if (!controllContainer.contains(event.target)) {
                legendContainer.style.display = 'none';
                overlay.remove();
            }
        });

        document.body.appendChild(overlay);

        legendContainer.style.display = 'block';

        let closeButton = document.querySelector('.close');
        closeButton.addEventListener('click', function () {
            legendContainer.style.display = 'none';
            overlay.remove();
        });
    } else {
        legendContainer.style.display = 'none';
        document.querySelector('.overlay').remove();
    }
}

/**
 * Handles the canplaythrough event for the game music.
 */
game_music.addEventListener('canplaythrough', function () {
    game_music.play();
    updateSoundIcon();
});

/**
 * Toggles the game music on/off.
 */
function toggleMusic() {
    if (musicMuted) {
        game_music.play();
    } else {
        game_music.pause();
    }
    musicMuted = !musicMuted;
    updateSoundIcon();
}

/**
 * Updates the sound icon based on the current music state.
 */
function updateSoundIcon() {
    let soundIcon = document.getElementById('sound-icon');
    if (musicMuted) {
        soundIcon.src = "./img_pollo_locco/speaker_off.svg";
    } else {
        soundIcon.src = "./img_pollo_locco/speaker_on.svg";
    }
}

/**
 * Executes actions when the window loads.
 */
window.onload = function () {
    updateSoundIcon();
};

/*window.onload = function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        showFullscreen();
    }
};*/

/**
 * Handles touch events for mobile devices.
 */
document.addEventListener('DOMContentLoaded', function () {
    handleMobileKeyPressEvents();
    handleMobileKeyPressEventsEnd();
});

/**
 * Handles touchstart events for mobile devices.
 */
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

/**
 * Handles touchend events for mobile devices.
 */
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

/**
 * Displays the game in fullscreen mode.
 */
function showFullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    let fullscreenIcon = document.querySelector('.game-symbols img[alt="Fullscreen"]');
    fullscreenIcon.src = "img_pollo_locco/fullscreen-exit.svg";
    fullscreenIcon.alt = "Exit Fullscreen";
    fullscreenIcon.onclick = exitFullscreen;

    enterFullscreen(fullscreen);
}

/**
 * Requests to enter fullscreen mode.
 * @param {HTMLElement} element - The element to display in fullscreen mode.
 */
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

/**
 * Exits fullscreen mode and updates the fullscreen icon.
 */
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

/**
 * Navigates to the home screen, hiding other screens.
 */
function homeScreen() {
    showStartScreen();
    hideGameOverScreen();
    hideLostScreen();
}

/**
 * Displays the lost screen and plays the corresponding sound.
 */
function showLostScreen() {
    let gameOverScreen = document.getElementById('lostContainer');
    gameOverScreen.style.display = 'block';
    game_music.pause();
    lose_music.play();
    win_music.addEventListener('ended', function () {
        game_music.play();
    });
}

/**
 * Displays the game over screen and plays the corresponding sound.
 */
function gameOverScreen() {
    let gameOverScreen = document.getElementById('gameOverScreen');
    gameOverScreen.style.display = 'block';
    game_music.pause();
    win_music.play();
    win_music.addEventListener('ended', function () {
        game_music.play();
    });
}

/**
 * Displays the start screen and sets up initial configurations.
 */
function showStartScreen() {
    let startScreen = document.getElementById('startScreenContainer');
    startScreen.style.backgroundImage = "url('img_pollo_locco/img/9_intro_outro_screens/start/startscreen_1.png')";
    startScreen.style.display = 'block';

    let canvas = document.getElementById('canvas');
    canvas.style.pointerEvents = 'none';
}

/**
 * Starts the game by initializing the level and game components.
 */
function startGame() {
    hideStartScreen();
    hideGameOverScreen();
    hideLostScreen();
    world = null;
    createLevel1();
    init();
}

/**
 * Hides the start screen.
 */
function hideStartScreen() {
    let startScreen = document.getElementById('startScreenContainer');
    startScreen.style.display = 'none';
}

/**
 * Hides the game over screen.
 */
function hideGameOverScreen() {
    let gameOverScreen = document.getElementById('gameOverScreen');
    gameOverScreen.style.display = 'none';
}

/**
 * Hides the lost screen.
 */
function hideLostScreen() {
    let gameOverScreen = document.getElementById('lostContainer');
    gameOverScreen.style.display = 'none';
}