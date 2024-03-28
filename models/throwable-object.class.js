class ThrowableObject extends moveableObject {
    constructor(x, y, world) {
        super().loadImage('img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.world = world;
        this.throw();
        this.isAnimating = false;
    }

    IMAGES_FLYING_BOTTLES = [
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_SPLASH_BOTTLES = [
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',

    ];

    bottle_hit = new Audio('audio/glassmp3.mp3');

    throw() {
        if (this.world && this.world.character) {
            this.speedX = this.world.character.otherDirection ? -15 : 15;
            this.speedY = 20;
            this.applyGravity();
    
            this.animationInterval = setInterval(() => {
                this.x += this.speedX;
                this.y -= this.speedY;
    
                if (this.y + this.height >= this.world.canvas.height - 30) {
                    this.stopAnimation();
                    this.playSplashAnimation();
                }
            }, 25);
        }
    }

    animateFlyingBottle() {
        if (!this.isAnimating && this.IMAGES_FLYING_BOTTLES && this.IMAGES_FLYING_BOTTLES.length > 0) {
            this.isAnimating = true;
            this.loadImages(this.IMAGES_FLYING_BOTTLES);
            setInterval(() => {
                if (this.isAnimating) {
                    this.playAnimation(this.IMAGES_FLYING_BOTTLES);
                }
            }, 100);

        }
    }

    stopAnimation() {
        this.isAnimating = false;
        clearInterval(this.animationInterval);
        this.speedX = 0;
        this.speedY = -5;
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
    }

    playSplashAnimation() {
        if (!this.isAnimatingSplash) {
            this.isAnimatingSplash = true;
            this.bottle_hit.play();
            this.loadImages(this.IMAGES_SPLASH_BOTTLES);
    
            let currentFrame = 0;
    
            let animationIntervalSplash = setInterval(() => {
                if (currentFrame < this.IMAGES_SPLASH_BOTTLES.length) {
                    this.playAnimation([this.IMAGES_SPLASH_BOTTLES[currentFrame++]]);
                } else {
                    clearInterval(animationIntervalSplash);
                    this.isAnimatingSplash = false;
                }
            }, 100);
        }
    }
}