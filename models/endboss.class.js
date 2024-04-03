class Endboss extends moveableObject {

    height = 400;
    width = 300;
    y = 70;
    moveSpeed = 5;
    isDisabled = false;
    lastHit = 0;
    boss_hit = new Audio('audio/boss_hit.mp3');

    IMAGES_WALKING = [
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G1.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G2.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G3.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ANGRY = [
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G5.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G6.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G7.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G8.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G9.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G10.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G11.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G13.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G14.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G15.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G16.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G17.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G18.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G19.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G24.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G25.png',
        'img_pollo_locco/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super();
        this.currentAnimation = '';
        this.isWalkingAnimating = false;
        this.isAngryAnimating = false;
        this.isAttackAnimating = false;
        this.isHurtAnimating = false;
        this.bossBar = new BossBar();

        super.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_ANGRY);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.isDead = false;
        this.animate('animateWalkingBoss');
    }

    moveLeft() {
        this.x -= this.moveSpeed;
    }

    animate(animationType) {
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.animationType = animationType;
            let animationIndex = 0;
            let animationCounter = 0;

            switch (this.animationType) {
                case 'animateWalkingBoss':
                    this.animateWalkingBoss(animationIndex, animationCounter);
                    break;

                case 'animateAngry':
                    this.animateAngry(animationIndex, animationCounter);
                    break;

                case 'animateAttack':
                    this.animateAttack(animationIndex, animationCounter);
                    break;

                default:
                    break;
            }
        }
    }

    animateWalkingBoss(animationIndex, animationCounter) {
        this.animationInterval = setInterval(() => {
            if (this.isDead) {
                clearInterval(this.animationInterval);
                return;
            }
    
            if (animationCounter === 10) {
                clearInterval(this.animationInterval);
                this.isAnimating = false;
                this.currentAnimation = 'animateAngry';
                this.animate('animateAngry');
            } else {
                this.moveLeft();
                this.loadImage(this.IMAGES_WALKING[animationIndex]);
                animationIndex = (animationIndex + 1) % this.IMAGES_WALKING.length;
                if (animationIndex === 0) {
                    animationCounter++;
                }
            }
        }, 200);
    }
    
    animateAngry(animationIndex, animationCounter) {
        this.animationInterval = setInterval(() => {
            if (this.isDead) {
                clearInterval(this.animationInterval);
                return;
            }
    
            if (animationCounter === 1) {
                clearInterval(this.animationInterval);
                this.isAnimating = false;
                this.currentAnimation = 'animateAttack';
                this.animate('animateAttack');
            } else {
                this.loadImage(this.IMAGES_ANGRY[animationIndex]);
                animationIndex = (animationIndex + 1) % this.IMAGES_ANGRY.length;
                if (animationIndex === 0) {
                    animationCounter++;
                }
            }
        }, 200);
    }
    
    animateAttack(animationIndex, animationCounter) {
        this.animationInterval = setInterval(() => {
            if (this.isDead) {
                clearInterval(this.animationInterval);
                return;
            }
    
            this.playAnimation(this.IMAGES_ATTACK);
            animationIndex = (animationIndex + 1) % this.IMAGES_ATTACK.length;
            if (animationIndex === 0) {
                animationCounter++;
                if (animationCounter === 1) {
                    clearInterval(this.animationInterval);
                    this.isAnimating = false;
                    this.currentAnimation = 'animateWalkingBoss';
                    this.animate('animateWalkingBoss');
                }
            }
        }, 200);
    }

    animateHurt() {
        if (this.isHurtAnimating) return;
        this.isHurtAnimating = true;
        let hurtCounter = 0;
        this.hurtInterval = setInterval(() => {
            if (this.isDead || hurtCounter === 3) {
                clearInterval(this.hurtInterval);
                this.isHurtAnimating = false;
                this.isAnimating = false;
                this.animate(this.animationType);
                return;
            }
            this.playAnimation(this.IMAGES_HURT);
            hurtCounter++;
        }, 200);
    }

    bossHit() {
        this.lastHit = Date.now();        
        clearInterval(this.animationInterval);

        this.animateHurt();
    }

    isHurtBoss() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1500;
        return timepassed < 1.5;
    }

    bossDie() {
        if (this.isDead) return;
        this.isDead = true;
        this.boss_hit.play();
        let deadIndex = 0;
        let maxIterations = 2;
        let deadInterval = setInterval(() => {
            if (deadIndex < maxIterations * this.IMAGES_DEAD.length) {
                this.loadImage(this.IMAGES_DEAD[deadIndex++ % this.IMAGES_DEAD.length]);
            } else {
                clearInterval(deadInterval);
            }
        }, 100);
    }
}