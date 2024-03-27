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
        //this.isAnimatingSplash = false;
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

    throw() {
        if (this.world && this.world.character) {
            if (this.world.character.otherDirection) {
                this.speedX = -15;
            } else {
                this.speedX = 15;
            }
            
            this.speedY = 20;
            this.applyGravity();

            this.animationInterval = setInterval(() => {
                this.x += this.speedX;
                this.y -= this.speedY;
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
            console.log('start');
            this.isAnimatingSplash = true;
            this.loadImages(this.IMAGES_SPLASH_BOTTLES);
    
            let totalFrames = this.IMAGES_SPLASH_BOTTLES.length;
            let currentFrame = 0;
    
            let animationIntervalSplash = setInterval(() => {
                if (currentFrame < totalFrames) {
                    this.playAnimation([this.IMAGES_SPLASH_BOTTLES[currentFrame]]);
                    currentFrame++;
                } else {
                    clearInterval(animationIntervalSplash);
                    this.isAnimatingSplash = false; 
                }
            }, 100);
        }
    }
}