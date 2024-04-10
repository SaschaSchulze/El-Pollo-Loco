let game_music = new Audio('audio/game_music.mp3');
let win_music = new Audio('audio/win.mp3');
let lose_music = new Audio('audio/gameLose.mp3');
let musicMuted = false;

/**
 * Toggles the visibility of the description window.
 * If the window is hidden, it will be displayed; otherwise, it will be hidden.
 * Additionally, it adds or removes an event listener to close the description window when clicked outside.
 */
function toggleDescription() {
    let descriptionWindow = document.getElementById("description-window");
    if (descriptionWindow.style.display === "none") {
        descriptionWindow.style.display = "block";
        document.addEventListener("mousedown", closeDescriptionOnClickOutside);
    } else {
        descriptionWindow.style.display = "none";
        document.removeEventListener("mousedown", closeDescriptionOnClickOutside);
    }
}

/**
 * Closes the description window if the click event occurs outside of the window.
 * @param {MouseEvent} event - The mouse event object.
 */
function closeDescriptionOnClickOutside(event) {
    let descriptionWindow = document.getElementById("description-window");
    if (!descriptionWindow.contains(event.target)) {
        descriptionWindow.style.display = "none";
        document.removeEventListener("mousedown", closeDescriptionOnClickOutside);
    }
}

/**
 * Toggles the display of the controls legend.
 */
function toggleControlls() {
    let legendContainer = document.querySelector('.legend-container');
    let overlay = document.querySelector('.overlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);
    }

    if (legendContainer.style.display === 'none' || legendContainer.style.display === '') {
        overlay.addEventListener('click', closeControlsOnClickOutside);
        overlay.style.display = 'block';

        if (isFullscreen()) {
            adjustLegendContainerForFullscreen();
        } else {
            adjustLegendContainerForNormalScreen();
        }

        legendContainer.style.display = 'block';

        let closeButton = document.querySelector('.close');
        closeButton.addEventListener('click', closeControls);
    } else {
        closeControls();
    }
}

/**
 * Adjusts the position and size of the legend container for fullscreen mode.
 */
function adjustLegendContainerForFullscreen() {
    let legendContainer = document.querySelector('.legend-container');
    legendContainer.style.position = 'fixed';
    legendContainer.style.top = '50%';
    legendContainer.style.left = '50%';
    legendContainer.style.height = '100%';
    legendContainer.style.width = '100%';
    legendContainer.style.transform = 'translate(-50%, -50%)';
}

/**
 * Adjusts the position of the legend container for normal screen mode.
 */
function adjustLegendContainerForNormalScreen() {
    let legendContainer = document.querySelector('.legend-container');
    legendContainer.style.position = 'absolute';
    legendContainer.style.top = '50%';
    legendContainer.style.left = '50%';
    legendContainer.style.transform = 'translate(-50%, -50%)';
}

/**
 * Closes the controls legend.
 */
function closeControls() {
    let legendContainer = document.querySelector('.legend-container');
    let overlay = document.querySelector('.overlay');
    legendContainer.style.display = 'none';
    overlay.style.display = 'none';
    overlay.removeEventListener('click', closeControlsOnClickOutside);
}

/**
 * Closes the controls legend if a click occurs outside the legend.
 */
function closeControlsOnClickOutside(event) {
    let legendContainer = document.querySelector('.legend-container');
    if (!legendContainer.contains(event.target)) {
        closeControls();
    }
}

/**
 * Checks if the document is currently in fullscreen mode.
 * @returns {boolean} True if fullscreen mode is active, otherwise false.
 */
function isFullscreen() {
    return !!(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
}

/**
 * Toggles the game music on/off.
 */
function toggleMusic() {
    if (!musicMuted) {
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
        soundIcon.src = "./img_pollo_locco/speaker_on.svg";
    } else {
        soundIcon.src = "./img_pollo_locco/speaker_off.svg";
    }
}

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
    let jumpButtonRight = document.getElementById('jump-btn-right');
    let throwButtonRight = document.getElementById('throw-btn-right');

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
    let jumpButtonRight = document.getElementById('jump-btn-right');
    let throwButtonRight = document.getElementById('throw-btn-right');

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
 * Displays the game over screen and handles character cleanup.
 * 
 * @function gameOverScreen
 * @global
 * @returns {void}
 */
function gameOverScreen() {
    let gameOverScreen = document.getElementById('gameOverScreen');
    gameOverScreen.style.display = 'block';
    game_music.pause();
    win_music.play();
    win_music.addEventListener('ended', function () {
        game_music.play();
    });
    if (world && world.character && world.character.stopIntervals && world.character.removeCharacter) {
        world.character.stopIntervals();
        world.character.removeCharacter();
    }
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
    if (!musicMuted) {
        toggleMusic();
    }
    game_music.play();
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