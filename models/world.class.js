class World {
    character = new Character();
    level1 = level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinsBar = new CoinsBar();
    bottlesBar = new BottlesBar();
    bossBar = new BossBar();
    throwableObjects = [];
    chicken_hit = new Audio('audio/chicken.mp3');
    throwing_bottle = new Audio('audio/throw.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.draw();
        this.setWorld();
        this.run();
    }

    startGame() {
        this.resetEnergyBoss();
        this.resetLevel();
        this.character.reset(); 
        this.clearRunInterval();
        this.run();
    }

    resetLevel() {
        this.level1.bottles = [];
        this.level1.coins = [];
        this.level1.enemies = [];
        this.level1.enemies.push(new Endboss());
        this.level1.enemies[this.level1.enemies.length - 1].world = this;
        this.isGameOver = false;

        for (let i = 0; i < 5; i++) {
            this.level1.bottles.push(new Bottles());
        }
        for (let i = 0; i < 5; i++) {
            this.level1.coins.push(new Coins());
        }
        for (let i = 0; i < 3; i++) {
            this.level1.enemies.push(new Chicken());
        }
        for (let i = 0; i < 4; i++) {
            this.level1.enemies.push(new ChickenSmall());
        }
        this.isGameOver = false;
    }

    resetEnergyBoss() {
        this.level1.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss) {
                enemy.bossBar.reset();
            }
        });
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        this.runInterval = setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollectableObjects();
            this.checkCollisionWithBottle();
            this.checkCollisionWithEndBoss();
        }, 50);
    }

    clearRunInterval() {
        clearInterval(this.runInterval);
    }

    checkThrowObjects() {
        if (this.character && this.keyboard.SPACE && this.character.availableBottles > 0 && !this.character.isThrowingBottle) {
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 80, this);
            this.throwableObjects.push(bottle);
            this.character.isThrowingBottle = true;
            this.throwing_bottle.play();
            this.character.availableBottles--;
    
            let newPercentage = this.bottlesBar.percentage - 20;
    
            if (newPercentage < 0) {
                newPercentage = 0;
            }
    
            this.bottlesBar.setPercentageBottle(newPercentage);
    
            bottle.animateFlyingBottle();
        } else if (this.character && !this.keyboard.SPACE) {
            this.character.isThrowingBottle = false;
        }
    }

    checkCollisions() {
        if (!this.character || this.character.isDead) {
            return; // Stop the method if the character is dead or does not exist
        }
    
        this.level1.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (enemy.isDead && this.character.isJumpingOnEnemy(enemy)) {
                    // handle collision logic here
                } else if (!enemy.isDead && !this.character.isJumpingOnEnemy(enemy)) {
                    if (this.character.isCollidingFromSide(enemy)) {
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);
                    }
                } else if (this.character.isJumpingOnEnemy(enemy)) {
                    enemy.chickenDie();
                }
            }
        });
    
        if (this.character.isDead) {
            this.character.checkIsDead();
        }
    }

    checkCollisionWithBottle() {
        this.throwableObjects.forEach((bottles, bottleIndex) => {
            this.level1.enemies.forEach((enemy) => {
                if (enemy instanceof Chicken || enemy instanceof ChickenSmall) {
                    if (bottles.isColliding(enemy)) {
                        enemy.chickenDie();
                        this.chicken_hit.play();
                        bottles.stopAnimation();
                        bottles.playSplashAnimation();
                    }
                }
            });
        });
    }

    checkCollisionWithEndBoss() {
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

    handleBossHit(bottle, enemy) {
        this.chicken_hit.play();
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

    checkCollectableObjects() {
        if (!this.character || this.character.isDead) {
            return;
        }
    
        this.level1.coins.forEach((coins, index) => {
            if (this.character && this.character.isCollectCoins(coins)) {
                this.character.hitCoin();
                this.coinsBar.setPercentageCoin(this.coinsBar.percentage + 20);
                this.level1.coins.splice(index, 1);
            }
        });
    
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


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // löscht das canvas zum Anfang immer wieder

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level1.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); // Zurück
        // ----------------Space for foxed objects --------------------
        this.addToMap(this.statusBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.bottlesBar);
        this.addToMap(this.bossBar);
        this.ctx.translate(this.camera_x, 0); // Vorwärts

        this.addToMap(this.character);
        this.addObjectsToMap(this.level1.clouds);
        this.addObjectsToMap(this.level1.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level1.coins);
        this.addObjectsToMap(this.level1.bottles);

        this.ctx.translate(-this.camera_x, 0);

        // Draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () { // self ist die variable für this bzw. als Platzhalter für this eine Zeile weiter unten
            self.draw(); // this. funktioniert innerhalb solch einer Funktion nicht, aus diesem Grund muss eine Variable erstellt werden an dieser Stelle, die hier self heißt
        });
    }

    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    addToMap(moveableObject) {
        if (moveableObject && moveableObject.draw) {
            if (moveableObject instanceof Character && !moveableObject.isDead) {
                if (moveableObject.otherDirection) {
                    this.flipImage(moveableObject);
                }
                moveableObject.draw(this.ctx);
                moveableObject.drawFrame(this.ctx);
                if (moveableObject.otherDirection) {
                    this.flipImageBack(moveableObject);
                }
            } else if (!(moveableObject instanceof Character)) {
                if (moveableObject.otherDirection) {
                    this.flipImage(moveableObject);
                }
                moveableObject.draw(this.ctx);
                moveableObject.drawFrame(this.ctx);
                if (moveableObject.otherDirection) {
                    this.flipImageBack(moveableObject);
                }
            }
        }
    }

    flipImage(moveableObject) {
        this.ctx.save();
        this.ctx.translate(moveableObject.width, 0);
        this.ctx.scale(-1, 1); // -1 verschiebt das Bild um -1 beim drehen. 1 verschiebt das Bild wieder 1 um rechts, damit es auf der selben Stelle ist wie vor dem drehen
        moveableObject.x = moveableObject.x * -1;
    }

    flipImageBack(moveableObject) {
        moveableObject.x = moveableObject.x * -1;
        this.ctx.restore();
    }
}