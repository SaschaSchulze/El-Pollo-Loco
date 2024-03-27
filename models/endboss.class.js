class Endboss extends moveableObject {

    height = 400;
    width = 300;
    y = 70;
    moveSpeed = 5;
    isDisabled = false;
    lastHit = 0;

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

        super.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_ANGRY);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.isDead = false;
        this.animateWalkingBoss();
    }

    animateWalkingBoss() {
        this.currentAnimation = 'animateWalkingBoss';
        if (!this.isWalkingAnimating) {
            this.isWalkingAnimating = true;
            let walkingIndex = 0;
            let walkingCounter = 0;
            this.walkingInterval = setInterval(() => {
                if (!this.isDead) {
                    if (walkingCounter === 10) {
                        clearInterval(this.walkingInterval);
                        this.isWalkingAnimating = false;
                        this.animateAngry();
                    } else {
                        this.moveLeft();
                        this.loadImage(this.IMAGES_WALKING[walkingIndex]);
                        walkingIndex = (walkingIndex + 1) % this.IMAGES_WALKING.length;
                        if (walkingIndex === 0) {
                            walkingCounter++;
                        }
                    }
                }
            }, 1000 / 8); // Bewegungsintervall: 10x pro Sekunde wird bewegt
        }
    }

    moveLeft() {
        this.x -= this.moveSpeed;
    }

    animateAngry() {
        this.currentAnimation = 'animateAngry';
        let angryIndex = 0;
        let angryCounter = 0;
        let angryInterval = setInterval(() => {
            if (!this.isDead) {
                if (angryCounter === 1) {
                    clearInterval(angryInterval);
                    this.animateAttack();
                } else {
                    this.loadImage(this.IMAGES_ANGRY[angryIndex]);
                    angryIndex = (angryIndex + 1) % this.IMAGES_ANGRY.length;
                    if (angryIndex === 0) {
                        angryCounter++;
                    }
                }
            }
        }, 200);
    }

    animateAttack() {
        this.currentAnimation = 'animateAttack';
        let attackIndex = 0;
        let attackCounter = 0;
        let attackInterval = setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_ATTACK);
                attackIndex = (attackIndex + 1) % this.IMAGES_ATTACK.length;
                if (attackIndex === 0) {
                    attackCounter++;
                    if (attackCounter === 1) {
                        clearInterval(attackInterval);
                        this.animateWalkingBoss();
                    }
                }
            }
        }, 200);
    }

    animateHurt() {
        if (!this.isHurtAnimating) {
            this.isHurtAnimating = true;
            clearInterval(this.walkingInterval);
            clearInterval(this.angryInterval);
            clearInterval(this.attackInterval);

            let hurtIndex = 0;
            let hurtCounter = 0;
            this.hurtInterval = setInterval(() => {
                if (!this.isDead) {
                    this.playAnimation(this.IMAGES_HURT);
                    hurtIndex = (hurtIndex + 1) % this.IMAGES_HURT.length;
                    if (hurtIndex === 0) {
                        hurtCounter++;
                        if (hurtCounter === 3) {
                            clearInterval(this.hurtInterval);
                            this.isHurtAnimating = false;
        
                            switch (this.currentAnimation) {
                                case 'animateWalkingBoss':
                                    this.animateWalkingBoss();
                                    break;
                                case 'animateAngry':
                                    this.animateAngry();
                                    break;
                                case 'animateAttack':
                                    this.animateAttack();
                                    break;
                            }
                        }
                    }
                }
            }, 200);
        }
    }

    bossHit() {
        this.lastHit = Date.now();
        clearInterval(this.walkingInterval);
        clearInterval(this.angryInterval);
        clearInterval(this.attackInterval);
        this.animateHurt();
    }

    isHurtBoss() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    bossDie() {
        if (!this.isDead) {
            this.isDead = true;
            let deadIndex = 0;
            let deadInterval = setInterval(() => {
                if (deadIndex < this.IMAGES_DEAD.length) {
                    this.loadImage(this.IMAGES_DEAD[deadIndex]);
                    deadIndex++;
                } else {
                    clearInterval(deadInterval);
                }
            }, 150);
        }
    }
}