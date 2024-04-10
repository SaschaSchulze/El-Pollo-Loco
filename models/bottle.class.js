class Bottles extends moveableObject {
    height= 90;
    width= 90;
    generatedPositions = [];

    offset= {x: 10 , y: 10, width: -25, height: -20};

    IMAGES_BOTTLES = [
        'img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img_pollo_locco/img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    IMAGES_FLYING_BOTTLES = [
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img_pollo_locco/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    constructor() {
        super();
        this.loadImage('img_pollo_locco/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLES);
        this.speed = 0.10 + Math.random() *0.30;
        this.generateRandomPosition();
        this.animateBottles();
    }

    /**
    * Generates a random position for the object while ensuring it is at least a minimum distance away from other positions.
    */
    generateRandomPosition() {
        let isPositionValid = false;
        let minDistance = 100;

        while (!isPositionValid) {
            this.x = 400 + Math.random() * 4000;
            this.y = 380 + Math.random();

            isPositionValid = this.generatedPositions.every(position => {
                let distanceX = Math.abs(this.x - position.x);
                let distanceY = Math.abs(this.y - position.y);
                let distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                return distance >= minDistance;
            });
        }
        this.generatedPositions.push({x: this.x, y: this.y});
    }

    /**
    * Initiates the animation for the object.
    */
    animateBottles() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLES);
        }, 800);
    }

    /**
    * Marks the object as collected.
    */
    collect() {
        this.collected = true;
    }
}