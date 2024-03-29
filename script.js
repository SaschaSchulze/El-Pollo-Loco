let game_music = new Audio('audio/game_music.mp3');
let musicMuted = false;

// Event-Handler für das Laden des Audioobjekts
game_music.addEventListener('canplaythrough', function () {
    // Musik abspielen und Lautsprechersymbol aktualisieren, wenn das Audioobjekt geladen ist
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

// Musik abspielen und Lautsprechersymbol aktualisieren beim Laden der Seite
window.onload = function () {
    updateSoundIcon();
};

function showFullscreen() {
    const canvas = document.getElementById('canvas');
    const gameSymbols = document.querySelector('.game-symbols');
    const docElm = document.documentElement;

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

    // Zeige die Symbole nach dem Verlassen des Vollbildmodus wieder an
    const gameSymbols = document.querySelector('.game-symbols');
    gameSymbols.style.display = 'block';
}