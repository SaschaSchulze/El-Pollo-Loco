class Character extends moveableObject {

    height = 220;
    y = 80;
    speed = 10;

    IMAGES_WALKING = [
        'img_pollo_locco/img/2_character_pepe/2_walk/W-21.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-22.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-23.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-24.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-25.png',
        'img_pollo_locco/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img_pollo_locco/img/2_character_pepe/3_jump/J-31.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-32.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-33.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-34.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-35.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-36.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-37.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-38.png',
        'img_pollo_locco/img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-41.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-42.png',
        'img_pollo_locco/img/2_character_pepe/4_hurt/H-43.png',
    ];

    IMAGES_DEAD = [
        'img_pollo_locco/img/2_character_pepe/5_dead/D-51.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-52.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-53.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-54.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-55.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-56.png',
        'img_pollo_locco/img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_IDLE = [
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-1.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-2.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-3.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-4.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-5.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-6.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-7.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-8.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-9.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    IMAGES_LONG_IDLE = [
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img_pollo_locco/img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    world;
    walking_sound = new Audio('audio/walking.mp3');
    jumping_sound = new Audio('audio/jumping.mp3');

    constructor() {
        super().loadImage('img_pollo_locco/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.startWalkingInterval();
        this.startAnimationInterval();
        this.lastMoveTimestamp = Date.now();
    }

    startWalkingInterval() {
        this.walkingInterval = setInterval(() => {
            if (!this.isDead) {
                this.walking_sound.pause();
                if (this.world.keyboard.RIGHT && this.x < this.world.level1.level_end_x) {
                    this.moveRight();
                    this.otherDirection = false;
                    this.walking_sound.play();
                    this.lastMoveTimestamp = Date.now();
                }

                if (this.world.keyboard.LEFT && this.x > 0) {
                    this.moveLeft();
                    this.otherDirection = true;
                    this.walking_sound.play();
                    this.lastMoveTimestamp = Date.now();
                }

                if (this.world.keyboard.UP && !this.isAboveGround()) {
                    this.jump();
                    this.lastMoveTimestamp = Date.now();
                }

                if (this.world.keyboard.SPACE) {
                    this.lastMoveTimestamp = Date.now();
                }

                this.world.camera_x = -this.x + 100;
            }
        }, 1000 / 60);
    }

    startAnimationInterval() {
        this.animationInterval = setInterval(() => {
            let now = Date.now();
            let timeSinceLastMove = now - this.lastMoveTimestamp;

            if (this.checkIsDead()) {
                this.handleCharacterDeath();
                return;
            }

            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
                this.lastMoveTimestamp = Date.now();
            } else if (timeSinceLastMove > 3000) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
            } else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 150);
    }

    checkIsDead() {
        console.log("Checking if dead...");
        if (this.energy <= 0 && this.world.statusBar.percentage === 0 && !this.isGameOver) {
            showGameOverScreen();
            this.isGameOver = true;
            this.handleCharacterDeath();
            return true;
        }
        return false;
    }

    handleCharacterDeath() {
        this.isDead = true;
        this.stopIntervals();
        this.removeCharacter(); 
    }

    stopIntervals() {
        clearInterval(this.walkingInterval);
        clearInterval(this.animationInterval);
    }

    removeCharacter() {
        this.world.character = null;
    }

    jump() {
        this.speedY = 30;
        this.jumping_sound.play();
    }

    isJumpingOnEnemy(enemy) {
        return this.speedY > 0 && this.isColliding(enemy) && this.y < enemy.y && !enemy.isDead;
    }

    isCollidingFromSide(moveableObject) {
        return (
            (this.x + this.width >= moveableObject.x && this.x + this.width <= moveableObject.x + moveableObject.width) ||
            (this.x <= moveableObject.x + moveableObject.width && this.x >= moveableObject.x)
        );
    }

    reset() {
        this.energy = 100;
        this.coins = 0;
        this.bottles = 0;
        this.availableBottles = 0;
        this.lastHit = 0;
        this.isGameOver = false;
        this.x = 0;
        this.y = 80;
    }
}