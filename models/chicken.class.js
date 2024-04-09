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

        this.x = 200 + Math.random() * 2000; // Zahl zwischen 200 und 2200
        this.speed = 0.15 + Math.random() * 0.25; // Math.random generiert eine zufällige Zahl
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
        }, 1000 / 60); // 60x pro Sekunde werden 0.2px abgezogen

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
        let jumpChance = 0.8; // Die Wahrscheinlichkeit für einen Sprung pro Durchlauf
        let minJumpDelay = 1000; // Mindestverzögerung zwischen Sprüngen in Millisekunden
        let maxJumpDelay = 5000; // Maximale Verzögerung zwischen Sprüngen in Millisekunden
    
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

        this.x = 200 + Math.random() * 2000; // Zahl zwischen 200 und 2200
        this.speed = 0.15 + Math.random() * 0.25; // Math.random generiert eine zufällige Zahl
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
        }, 1000 / 60); // 60x pro Sekunde werden 0.2px abgezogen

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
        let jumpChance = 0.4; // Die Wahrscheinlichkeit für einen Sprung pro Durchlauf
        let minJumpDelay = 1000; // Mindestverzögerung zwischen Sprüngen in Millisekunden
        let maxJumpDelay = 6000; // Maximale Verzögerung zwischen Sprüngen in Millisekunden
    
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