class moveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    coins = 0;
    bottles = 0;
    availableBottles = 0;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if(this instanceof ThrowableObject) { // ThrowableObject should always fall
            return true;
        } else {
            return this.y < 240;
        }
    }

    isColliding(moveableObject) {
        return this.x + this.width > moveableObject.x &&
            this.y + this.height > moveableObject.y &&
            this.x < moveableObject.x &&
            this.y < moveableObject.y + moveableObject.height
    }

    isCollectCoins(coins) {
        return this.x + this.width > coins.x &&
            this.y + this.height > coins.y &&
            this.x < coins.x &&
            this.y < coins.y + coins.height
    }

    isCollectBottles(bottles) {
        return this.x + this.width > bottles.x &&
            this.y + this.height > bottles.y &&
            this.x < bottles.x &&
            this.y < bottles.y + bottles.height
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    hitCoin() {
        this.coins += 20;
        if (this.coins > 100) {
            this.coins = 100;
        }
    }

    collectBottles() {
        this.availableBottles += 1;
    }

    hitBottle() {
        this.bottles += 20;
        if (this.bottles > 100) {
            this.bottles = 100;
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    checkIsDead() {
        console.log('tot')
        if (this.energy <= 0 && this.world.statusBar.percentage === 0) {
            showGameOverScreen();
            return true;
        }
        return false;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30; // Sprunghöhe
    }

    reset() {
        this.speed = 0.15;
        this.otherDirection = false;
        this.speedY = 0;
        this.acceleration = 2.5;
        this.energy = 100;
        this.coins = 0;
        this.bottles = 0;
        this.availableBottles = 0;
        this.lastHit = 0;
    }
}