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
}