let game_music = new Audio('audio/game_music.mp3');
let win_music = new Audio('audio/win.mp3');
let lose_music = new Audio('audio/gameLose.mp3');
let musicMuted = false;

/**
 * Mutes all audio objects associated with the character.
 * @method muteSounds
 * @memberof Character.prototype
 */
Character.prototype.muteSounds = function() {
    if (this.AUDIO) {
        for (let key in this.AUDIO) {
            if (this.AUDIO.hasOwnProperty(key)) {
                this.AUDIO[key].muted = true;
            }
        }
    }
};

/**
 * Mutes all audio objects associated with the end boss.
 * @method muteSounds
 * @memberof Endboss.prototype
 */
Endboss.prototype.muteSounds = function() {
    if (this.AUDIO) {
        for (let key in this.AUDIO) {
            if (this.AUDIO.hasOwnProperty(key)) {
                this.AUDIO[key].muted = true;
            }
        }
    }
};

/**
 * Mutes all audio objects associated with throwable objects.
 * @method muteSounds
 * @memberof ThrowableObject.prototype
 */
ThrowableObject.prototype.muteSounds = function() {
    if (this.AUDIO) {
        for (let key in this.AUDIO) {
            if (this.AUDIO.hasOwnProperty(key)) {
                this.AUDIO[key].muted = true;
            }
        }
    }
};

/**
 * Mutes all sounds in the game world, including those associated with characters, enemies, and throwable objects.
 * @method muteSounds
 * @memberof World.prototype
 */
World.prototype.muteSounds = function() {
    if (this.AUDIO) {
        for (let key in this.AUDIO) {
            if (this.AUDIO.hasOwnProperty(key)) {
                this.AUDIO[key].muted = true;
            }
        }
    }

    if (this.throwableObjectsBottle && this.throwableObjectsBottle.muteSounds && typeof this.throwableObjectsBottle.muteSounds === 'function') {
        this.throwableObjectsBottle.muteSounds();
    }

    if (this.character && this.character.muteSounds && typeof this.character.muteSounds === 'function') {
        this.character.muteSounds();
    }

    if (this.level1 && this.level1.enemies) {
        this.level1.enemies.forEach(enemy => {
            if (enemy instanceof Chicken || enemy instanceof ChickenSmall || enemy instanceof Endboss) {
                if (enemy && enemy.muteSounds && typeof enemy.muteSounds === 'function') {
                    enemy.muteSounds();
                }
            }
        });
    }

    this.throwableObjects.forEach(object => {
        if (object && object.muteSounds && typeof object.muteSounds === 'function') {
            object.muteSounds();
        }
    });
};

/**
 * Toggles the game music on/off and mutes/unmutes all character, endboss, and world sounds.
 * @function toggleMusic
 */
function toggleMusic() {
    if (musicMuted) {
        muteAllSounds();
        game_music.pause();
    } else {
        unmuteAllSounds();
        game_music.play();
    }
    musicMuted = !musicMuted;
    updateSoundIcon();
}

/**
 * Mutes all sounds associated with characters, enemies, throwable objects, and the world.
 * @function muteAllSounds
 */
function muteAllSounds() {
    muteCharacterSounds();
    muteEnemySounds();
    if (world && world.muteSounds && typeof world.muteSounds === 'function') {
        world.muteSounds();
    }
    muteThrowableObjectSounds();
}

/**
 * Unmutes all sounds associated with characters, enemies, throwable objects, and the world.
 * @function unmuteAllSounds
 */
function unmuteAllSounds() {
    unmuteCharacterSounds();
    unmuteEnemySounds();
    if (world && world.AUDIO) {
        for (let key in world.AUDIO) {
            if (world.AUDIO.hasOwnProperty(key)) {
                world.AUDIO[key].muted = false;
            }
        }
    }
    unmuteThrowableObjectSounds();
}

/**
 * Mutes all sounds associated with the character.
 * @function muteCharacterSounds
 */
function muteCharacterSounds() {
    if (world && world.character && world.character.muteSounds && typeof world.character.muteSounds === 'function') {
        world.character.muteSounds();
    }
}

/**
 * Mutes all sounds associated with enemies.
 * @function muteEnemySounds
 */
function muteEnemySounds() {
    if (world && world.level1 && world.level1.enemies) {
        world.level1.enemies.forEach(enemy => {
            if (enemy && enemy.muteSounds && typeof enemy.muteSounds === 'function') {
                enemy.muteSounds();
            }
        });
    }
}

/**
 * Mutes all sounds associated with throwable objects.
 * @function muteThrowableObjectSounds
 */
function muteThrowableObjectSounds() {
    if (world && world.level1 && world.level1.throwableObjects) {
        world.level1.throwableObjects.forEach(object => {
            if (object && object.muteSounds && typeof object.muteSounds === 'function') {
                object.muteSounds();
            }
        });
    }
}

/**
 * Unmutes all sounds associated with the character.
 * @function unmuteCharacterSounds
 */
function unmuteCharacterSounds() {
    if (world && world.character && world.character.AUDIO) {
        for (let key in world.character.AUDIO) {
            if (world.character.AUDIO.hasOwnProperty(key)) {
                world.character.AUDIO[key].muted = false;
            }
        }
    }
}

/**
 * Unmutes all sounds associated with enemies.
 * @function unmuteEnemySounds
 */
function unmuteEnemySounds() {
    if (world && world.level1 && world.level1.enemies) {
        world.level1.enemies.forEach(enemy => {
            if ((enemy instanceof Endboss || enemy instanceof Chicken) && enemy.AUDIO) {
                for (let key in enemy.AUDIO) {
                    if (enemy.AUDIO.hasOwnProperty(key)) {
                        enemy.AUDIO[key].muted = false;
                    }
                }
            }
        });
    }
}

/**
 * Unmutes all sounds associated with throwable objects.
 * @function unmuteThrowableObjectSounds
 */
function unmuteThrowableObjectSounds() {
    if (world && world.level1 && world.level1.throwableObjects) {
        world.level1.throwableObjects.forEach(object => {
            if (object && object.AUDIO) {
                for (let key in object.AUDIO) {
                    if (object.AUDIO.hasOwnProperty(key)) {
                        object.AUDIO[key].muted = false;
                    }
                }
            }
        });
    }
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