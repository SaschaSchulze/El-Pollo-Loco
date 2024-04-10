class ThrowableObject extends moveableObject {

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

    /**
     * Throws the throwable object.
     * It sets the initial speed and applies gravity to the object.
     */
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

    /**
     * Animates the flying bottle.
     * It loads the flying bottle images and plays the animation.
     */
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

    /**
     * Stops the animation of the throwable object.
     * It clears the animation interval and adjusts the object's position.
     */
    stopAnimation() {
        this.isAnimating = false;
        clearInterval(this.animationInterval);
        this.speedX = 0;
        this.speedY = -5;
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
    }

    /**
     * Plays the splash animation of the throwable object.
     * It plays the splash sound, loads the splash images, and animates them.
     */
    playSplashAnimation() {
        if (!this.isAnimatingSplash) {
            this.isAnimatingSplash = true;
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