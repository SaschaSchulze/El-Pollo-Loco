class Chicken extends moveableObject {
    y = 400;
    height = 65;
    width = 45;
    chicken_hit = new Audio('audio/chicken.mp3');

    IMAGES_WALKING = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 400 + Math.random() * (4500 - 400);
        this.speed = 0.5 + Math.random() * 1;
        this.isDead = false;
        this.animate();
    }

    /**
     * Initiates animations for the Chicken, including movement and jumping.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);

        this.randomJump();
    }

    /**
     * Performs a random jump action for the Chicken.
     */
    randomJump() {
        let jumpChance = 0.8;
        let minJumpDelay = 1000;
        let maxJumpDelay = 5000;
    
        let jump = () => {
            let originalY = this.y;
            let jumpHeight = 130;
            let jumpSpeed = 4;
    
            let jumpInterval = setInterval(() => {
                this.y -= jumpSpeed;
                if (this.y <= originalY - jumpHeight) {
                    clearInterval(jumpInterval);
                    fall();
                }
            }, 1000 / 60);
            
            let fall = () => {
                let fallInterval = setInterval(() => {
                    this.y += jumpSpeed;
                    if (this.y >= originalY) {
                        clearInterval(fallInterval);
                    }
                }, 1000 / 60);
            };
        };
    
        let scheduleNextJump = () => {
            let nextJumpDelay = Math.random() * (maxJumpDelay - minJumpDelay) + minJumpDelay;
            setTimeout(() => {
                if (!this.isDead && Math.random() < jumpChance) {
                    jump();
                }
                scheduleNextJump();
            }, nextJumpDelay);
        };
    
        scheduleNextJump();
    }

    /**
     * Handles actions when the Chicken is hit and dies.
     */
    chickenDie() {
        this.chicken_hit.play();
        this.isDead = true;
        this.loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
    }
}

class ChickenSmall extends moveableObject {
    y = 410;
    height = 50;
    width = 45;
    chicken_hit = new Audio('audio/chicken.mp3');

    IMAGES_WALKING = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 400 + Math.random() * (4500 - 400);
        this.speed = 0.3 + Math.random() * 0.7;
        this.isDead = false;
        this.animate();
    }

    /**
     * Initiates animations for the Small Chicken, including movement and jumping.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);

        this.randomJump();
    }

    /**
     * Performs a random jump action for the Small Chicken.
     */
    randomJump() {
        let jumpChance = 0.4;
        let minJumpDelay = 1000;
        let maxJumpDelay = 6000;
    
        let jump = () => {
            let originalY = this.y;
            let jumpHeight = 80;
            let jumpSpeed = 5;
    
            let jumpInterval = setInterval(() => {
                this.y -= jumpSpeed;
                if (this.y <= originalY - jumpHeight) {
                    clearInterval(jumpInterval);
                    fall();
                }
            }, 1000 / 60);
            
            let fall = () => {
                let fallInterval = setInterval(() => {
                    this.y += jumpSpeed;
                    if (this.y >= originalY) {
                        clearInterval(fallInterval);
                    }
                }, 1000 / 60);
            };
        };
    
        let scheduleNextJump = () => {
            let nextJumpDelay = Math.random() * (maxJumpDelay - minJumpDelay) + minJumpDelay;
            setTimeout(() => {
                if (!this.isDead && Math.random() < jumpChance) {
                    jump();
                }
                scheduleNextJump();
            }, nextJumpDelay);
        };
    
        scheduleNextJump();
    }

    /**
     * Handles actions when the Small Chicken is hit and dies.
     */
    chickenDie() {
        this.chicken_hit.play();
        this.isDead = true;
        this.loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png');
    }
}