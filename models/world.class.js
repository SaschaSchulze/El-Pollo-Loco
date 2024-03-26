class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinsBar = new CoinsBar();
    bottlesBar = new BottlesBar();
    bossBar = new BossBar();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkCollectableObjects();
            this.checkCollisionWithBottle();
            this.checkCollisionWithEndboss();
        }, 50);
    }

    checkThrowObjects() {
        if(this.keyboard.SPACE && this.character.availableBottles > 0 && !this.character.isThrowingBottle) {
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 80, this);
            this.throwableObjects.push(bottle);
            this.character.isThrowingBottle = true;
            this.character.availableBottles--;
    
            let newPercentage = this.bottlesBar.percentage - 20;
    
            if (newPercentage < 0) {
                newPercentage = 0;
            }
    
            this.bottlesBar.setPercentageBottle(newPercentage);
    
            bottle.animateFlyingBottle();
        } else if (!this.keyboard.SPACE) {
            this.character.isThrowingBottle = false;
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (enemy.isDead && this.character.isJumpingOnEnemy(enemy)) {
                } else if (!enemy.isDead && !this.character.isJumpingOnEnemy(enemy)) {
                    if (this.character.isCollidingFromSide(enemy)) {
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);
                    }
                } else if (this.character.isJumpingOnEnemy(enemy)) {
                    enemy.die();
                }
            }
        });
    }

    checkCollisionWithBottle() {
        this.throwableObjects.forEach((bottles, bottleIndex) => {
            this.level.enemies.forEach((enemy) => {
                if (bottles.isColliding(enemy)) {
                    enemy.die();
                    bottles.stopAnimation();
                    bottles.playSplashAnimation();
                }
            });
        });
    }

    checkCollisionWithEndboss() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy instanceof Endboss && bottle.isColliding(enemy)) {
                    enemy.die(); 
                    bottle.stopAnimation();
                    let newPercentage = this.bossBar.percentage - 20;
                    if (newPercentage < 0) {
                        newPercentage = 0;
                    }
                    this.bossBar.setPercentage(newPercentage);
                    bottle.playSplashAnimation();
                }
            });
        });
    }

    checkCollectableObjects() {
        this.level.coins.forEach((coins, index) => {
            if (this.character.isCollectCoins(coins)) {
                this.character.hitCoin();
                this.coinsBar.setPercentageCoin(this.coinsBar.percentage + 20);
                this.level.coins.splice(index, 1);
            }
        });
    
        this.level.bottles.forEach((bottles, index) => {
            if (this.character.isCollectBottles(bottles)) {
                this.character.collectBottles();
                this.character.hitBottle();
                let newPercentage = this.bottlesBar.percentage + 20;
                if (newPercentage > 100) {
                    newPercentage = 100;
                }
                this.bottlesBar.setPercentageBottle(newPercentage);
                this.level.bottles.splice(index, 1);
            }
        });
    }

    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // löscht das canvas zum Anfang immer wieder

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); // Zurück
        // ----------------Space for foxed objects --------------------
        this.addToMap(this.statusBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.bottlesBar);
        this.addToMap(this.bossBar);
        this.ctx.translate(this.camera_x, 0); // Vorwärts

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        
        this.ctx.translate(-this.camera_x, 0);

        // Draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() { // self ist die variable für this bzw. als Platzhalter für this eine Zeile weiter unten
            self.draw(); // this. funktioniert innerhalb solch einer Funktion nicht, aus diesem Grund muss eine Variable erstellt werden an dieser Stelle, die hier self heißt
        });
    }

    addObjectsToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    addToMap(moveableObject) {
        if(moveableObject.otherDirection) {
            this.flipImage(moveableObject);
        }
        moveableObject.draw(this.ctx);
        moveableObject.drawFrame(this.ctx);
        
        if(moveableObject.otherDirection) {
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