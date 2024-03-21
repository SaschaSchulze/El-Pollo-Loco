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
        }, 50);
    }

    checkThrowObjects() {
        if(this.keyboard.SPACE && this.character) {
            let bottle = new ThrowableObject(this.character.x +60, this.character.y + 80, this);
            this.throwableObjects.push(bottle);
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                if (enemy.isDead) {
                    if (this.character.isJumpingOnEnemy(enemy)) {
                        // Wenn der Charakter auf dem toten Feind springt, wird keine Aktion ausgeführt
                    }
                } else {
                    if (!this.character.isJumpingOnEnemy(enemy) && this.character.speedY <= 0) {
                        // Andernfalls wird der Charakter verletzt, wenn er nicht auf dem Feind springt
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);
                    } else if (this.character.isJumpingOnEnemy(enemy) && this.character.y < enemy.y) {
                        // Wenn der Charakter von oben auf dem lebenden Feind landet, markiere den Feind als tot
                        enemy.die();
                    }
                }
            }
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
                this.character.hitBottle();
                this.bottlesBar.setPercentageBottle(this.bottlesBar.percentage + 20);
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