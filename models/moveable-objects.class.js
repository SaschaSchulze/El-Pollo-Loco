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
    isGameOver = false;

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
        let coinsX = coins.x + coins.offset.left;
        let coinsY = coins.y + coins.offset.top;
        let coinsWidth = coins.width - coins.offset.left - coins.offset.right;
        let coinsHeight = coins.height - coins.offset.top - coins.offset.bottom;
    
        let sideCollision = this.x + this.width > coinsX &&
            this.x < coinsX + coinsWidth &&
            this.y + this.height > coinsY &&
            this.y < coinsY + coinsHeight;
    
        let bottomCollision = this.y + this.height >= coinsY &&
            this.y + this.height <= coinsY + coinsHeight &&
            this.x + this.width / 2 >= coinsX &&
            this.x + this.width / 2 <= coinsX + coinsWidth;
    
        return sideCollision || bottomCollision;
    }

    isCollectBottles(bottles) {
        return this.x + this.width > bottles.x &&
            this.y + this.height > bottles.y &&
            this.x < bottles.x &&
            this.y < bottles.y + bottles.height
    }

    hit() {
        if (this.hitTimeout) return;
        this.energy -= 3;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.hitTimeout = setTimeout(() => {
                this.hitTimeout = null;
            }, 300);
        }
        this.lastHit = new Date().getTime();
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

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        if (this.isDead) return;
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30; // Sprunghöhe
    }

    resetEnergy() {
        this.energy = 100;
    }
}