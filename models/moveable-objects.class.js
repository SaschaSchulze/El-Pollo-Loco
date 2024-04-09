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

    /**
     * Applies gravity to the object, causing it to fall if above ground or moving upwards.
     */
    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
    * Checks if the object is above the ground level.
    * @returns {boolean} - True if the object is above the ground; otherwise, false.
    */
    isAboveGround() {
        if(this instanceof ThrowableObject) { // ThrowableObject should always fall
            return true;
        } else {
            return this.y < 240;
        }
    }

    /**
     * Checks if the object is colliding with another moveable object.
     * @param {moveableObject} moveableObject - The moveable object to check collision with.
     * @returns {boolean} - True if a collision is detected; otherwise, false.
     */
    isColliding(moveableObject) {
        return this.x + this.width > moveableObject.x &&
            this.y + this.height > moveableObject.y &&
            this.x < moveableObject.x &&
            this.y < moveableObject.y + moveableObject.height
    }

    /**
     * Checks if the object is collecting coins.
     * @param {Coins} coins - The coins object to check collection with.
     * @returns {boolean} - True if the object collects coins; otherwise, false.
     */
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

    /**
     * Checks if the object is collecting bottles.
     * @param {Bottles} bottles - The bottles object to check collection with.
     * @returns {boolean} - True if the object collects bottles; otherwise, false.
     */
    isCollectBottles(bottles) {
        return this.x + this.width > bottles.x &&
            this.y + this.height > bottles.y &&
            this.x < bottles.x &&
            this.y < bottles.y + bottles.height
    }

    /**
     * Registers a hit on the object, decreasing its energy level.
     */
    hit() {
        if (this.hitTimeout) return;
        this.energy -= 15;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.hitTimeout = setTimeout(() => {
                this.hitTimeout = null;
            }, 200);
        }
        this.lastHit = new Date().getTime();
    }

    /**
     * Handles the object's reaction to collecting a coin.
     */
    hitCoin() {
        this.coins += 20;
        if (this.coins > 100) {
            this.coins = 100;
        }
    }

    /**
     * Collects bottles, incrementing the count of available bottles.
     */
    collectBottles() {
        this.availableBottles += 1;
    }

    /**
     * Handles the object's reaction to collecting a bottle.
     */
    hitBottle() {
        this.bottles += 20;
        if (this.bottles > 100) {
            this.bottles = 100;
        }
    }

    /**
     * Checks if the object is currently in a hurt state.
     * @returns {boolean} - True if the object is hurt; otherwise, false.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Plays the animation for the object using the provided images.
     * @param {string[]} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        if (this.isDead) return;
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Initiates a jump action for the object.
     */
    jump() {
        this.speedY = 30; // Sprunghöhe
    }

    /**
     * Resets the energy level of the object to its maximum value.
     */
    resetEnergy() {
        this.energy = 100;
    }
}