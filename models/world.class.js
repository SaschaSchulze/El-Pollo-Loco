class World {
    level1 = level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    character = new Character();
    statusBar = new StatusBar();
    coinsBar = new CoinsBar();
    bottlesBar = new BottlesBar();
    bossBar = new BossBar();
    throwableObjects = [];

    AUDIO = {
        chicken_hit: new Audio('audio/chicken.mp3'),
        throwing_bottle: new Audio('audio/throw.mp3'),
        coin_collect: new Audio('audio/collectCoin.mp3'),
    };

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Starts the game.
     * It resets the energy of the end boss, clears the run interval, and starts the game loop.
     */
    startGame() {
        this.resetEnergyBoss();
        this.clearRunInterval();
        this.run();
    }

    /**
     * Resets the energy of the end boss.
     * It iterates over the enemies in level 1 and resets the energy of the end boss.
     */
    resetEnergyBoss() {
        this.level1.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                enemy.bossBar.reset();
            }
        });
    }

    /**
     * Sets the world reference for the character.
     * It assigns the current game instance as the world for the character object.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the game loop.
     * It continuously checks for collisions and updates game objects.
     */
    run() {
        this.runInterval = setInterval(() => {
            this.checkEnemyCollisions();
            this.checkEndbossCollision();
            this.checkThrowObjects();
            this.checkCollectableCoins();
            this.checkCollectableBottles();
            this.checkCollisionWithBottleEnemy();
            this.checkCollisionWithBottleEndBoss();
        }, 20);
    }

    /**
     * Clears the run interval.
     * It stops the game loop.
     */
    clearRunInterval() {
        clearInterval(this.runInterval);
    }

    /**
     * Checks for throwable object interactions.
     * It checks if the character can throw a bottle, handles bottle throwing animation and sound,
     * and updates the bottle count on the status bar.
     */
    checkThrowObjects() {
        let { character, keyboard, bottlesBar, throwableObjects } = this;
        let throwing_bottle = this.AUDIO.throwing_bottle

        if (character && keyboard.SPACE && character.availableBottles > 0 && !character.isThrowingBottle) {
            let newPercentage = Math.max(bottlesBar.percentage - 20, 0);
            bottlesBar.setPercentageBottle(newPercentage);

            let bottle = new ThrowableObject(character.x + 60, character.y + 80, this);
            throwableObjects.push(bottle);
            character.isThrowingBottle = true;
            throwing_bottle.play();
            character.availableBottles--;
            bottle.animateFlyingBottle();
        } else if (character && !keyboard.SPACE) {
            character.isThrowingBottle = false;
        }
    }

    /**
     * Checks for collisions between the character and enemies.
     * It iterates over enemies and checks for collisions with the character.
     * If a collision is detected, it triggers the appropriate action based on the enemy type.
     */
    checkEnemyCollisions() {
        if (!this.character || this.character.isDead) {
            return;
        }

        this.level1.enemies.forEach((enemy) => {
            if ((enemy instanceof Chicken || enemy instanceof ChickenSmall) && !enemy.isDead && this.character.isColliding(enemy)) {
                if (this.character.speedY < 0 && this.character.isAboveGround()) {
                    enemy.chickenDie();
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }

    /**
     * Checks for collisions between the character and the end boss.
     * It iterates over enemies and checks for collisions with the character.
     * If a collision is detected, it triggers the appropriate action based on the enemy type.
     */
    checkEndbossCollision() {
        if (!this.character || this.character.isDead) {
            return;
        }

        this.level1.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && !enemy.isDead && this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Checks for throwable object collisions with enemies.
     * It iterates over throwable objects and enemies to check for collisions.
     * If a collision is detected, it triggers the enemy's death animation and plays the corresponding sound.
     */
    checkCollisionWithBottleEnemy() {
        this.throwableObjects.forEach((bottles, bottleIndex) => {
            this.level1.enemies.forEach((enemy) => {
                if (enemy instanceof Chicken || enemy instanceof ChickenSmall) {
                    if (bottles.isColliding(enemy)) {
                        enemy.chickenDie();
                        this.AUDIO.chicken_hit.play();
                        bottles.stopAnimation();
                        bottles.playSplashAnimation();
                    }
                }
            });
        });
    }

    /**
     * Checks for throwable object collisions with the end boss.
     * It iterates over throwable objects and checks for collisions with the end boss.
     * If a collision is detected and the boss is not hurt, it handles the boss hit.
     */
    checkCollisionWithBottleEndBoss() {
        for (let bottle of this.throwableObjects) {
            for (let enemy of this.level1.enemies) {
                if (enemy instanceof Endboss && bottle.isColliding(enemy)) {
                    if (!bottle.hasCollided && !enemy.isHurtBoss()) {
                        this.handleBossHit(bottle, enemy);
                    }
                    if (enemy.bossWasHit) {
                        bottle.hasCollided = true;
                    }
                }
            }
        }
    }

    /**
     * Handles the hit event on the end boss by a throwable object.
     * It plays the corresponding sound, triggers the boss hit animation, updates the boss's health bar,
     * and checks if the boss has been defeated.
     * @param {ThrowableObject} bottle The throwable object that hit the boss.
     * @param {Endboss} enemy The end boss object.
     */
    handleBossHit(bottle, enemy) {
        this.AUDIO.chicken_hit.play();
        enemy.bossHit();
        bottle.stopAnimation();
        bottle.playSplashAnimation();
        bottle.hasCollided = true;
        let newPercentage = this.bossBar.percentage - 20;
        if (newPercentage < 0) {
            newPercentage = 0;
        }
        this.bossBar.setPercentageBoss(newPercentage);
        enemy.bossHit();
        enemy.bossWasHit = true;

        if (newPercentage <= 0) {
            enemy.bossDie();
        }
    }

    /**
     * Checks for collectable coins.
     * It checks if the character has collected coins,
     * updates the status bar accordingly, and removes collected coins from the game world.
     */
    checkCollectableCoins() {
        if (!this.character || this.character.isDead) {
            return;
        }

        this.level1.coins.forEach((coins, index) => {
            if (this.character && this.character.isCollectCoins(coins)) {
                this.character.hitCoin();
                this.AUDIO.coin_collect.play();
                this.coinsBar.setPercentageCoin(this.coinsBar.percentage + 20);
                this.level1.coins.splice(index, 1);
            }
        });
    }

    /**
     * Checks for collectable bottles.
     * It checks if the character has collected bottles,
     * updates the status bar accordingly, and removes collected bottles from the game world.
     */
    checkCollectableBottles() {
        if (!this.character || this.character.isDead) {
            return;
        }

        this.level1.bottles.forEach((bottles, index) => {
            if (this.character && this.character.isCollectBottles(bottles)) {
                this.character.collectBottles();
                this.character.hitBottle();
                let newPercentage = this.bottlesBar.percentage + 20;
                if (newPercentage > 100) {
                    newPercentage = 100;
                }
                this.bottlesBar.setPercentageBottle(newPercentage);
                this.level1.bottles.splice(index, 1);
            }
        });
    }

    /**
     * Draws all game objects on the canvas.
     * It clears the canvas, translates the context based on the camera position,
     * and draws the game objects.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level1.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.bottlesBar);
        this.addToMap(this.bossBar);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level1.clouds);
        this.addObjectsToMap(this.level1.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level1.coins);
        this.addObjectsToMap(this.level1.bottles);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () { 
            self.draw();
        });
    }

    /**
     * Adds an array of objects to the game map.
     * It iterates over the objects array and adds each object to the map.
     * @param {Array} objects An array of movable objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach((o) => {
            if (o) {
                this.addToMap(o);
            }
        });
    }

    /**
     * Adds a movable object to the game map.
     * It checks if the object needs to be flipped, draws the object, and restores the context transformation.
     * @param {MovableObject} moveableObject The movable object to be added to the map.
     */
    addToMap(moveableObject) {
        if (moveableObject && moveableObject.otherDirection) {
            this.flipImage(moveableObject);
        }
        if (moveableObject) {
            moveableObject.draw(this.ctx);
        }
        if (moveableObject && moveableObject.otherDirection) {
            this.flipImageBack(moveableObject);
        }
    }

    /**
     * Flips the image horizontally for a movable object.
     * It saves the context state, translates it based on the object's width, scales it to flip the image,
     * and updates the object's position accordingly.
     * @param {MovableObject} moveableObject The movable object to be flipped.
     */
    flipImage(moveableObject) {
        this.ctx.save();
        this.ctx.translate(moveableObject.width, 0);
        this.ctx.scale(-1, 1);
        moveableObject.x = moveableObject.x * -1;
    }

    /**
     * Restores the context after flipping the image for a movable object.
     * It updates the object's position and restores the context transformation.
     * @param {MovableObject} moveableObject The movable object to be restored.
     */
    flipImageBack(moveableObject) {
        moveableObject.x = moveableObject.x * -1;
        this.ctx.restore();
    }
}