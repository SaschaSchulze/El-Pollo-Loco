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
    };
    
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
        //this.character.reset(); 
        this.clearRunInterval();
        this.run();
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
            //this.character.checkIsDead();
        }, 20);
    }

    clearRunInterval() {
        clearInterval(this.runInterval);
    }

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

    checkCollisions() {
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
            } else if (enemy instanceof Endboss && !enemy.isDead && this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionWithBottle() {
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
            if (o) {
                this.addToMap(o);
            }
        });
    }

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