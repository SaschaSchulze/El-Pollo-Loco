class ThrowableObject extends moveableObject {
    constructor(x, y, world) {
        super().loadImage('img_pollo_locco/img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.world = world; 
        this.throw();
    }

    IMAGES_FLYING_BOTTLES = [
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
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

            setInterval(() => {
                this.x += this.speedX;
                this.y -= this.speedY;
            }, 25);
        }
    }

    animateFlyingBottle() {
        if (this.IMAGES_FLYING_BOTTLES && this.IMAGES_FLYING_BOTTLES.length > 0) {
            this.loadImages(this.IMAGES_FLYING_BOTTLES);
            setInterval(() => {
                this.playAnimation(this.IMAGES_FLYING_BOTTLES);
            }, 100);
        }
    }
}