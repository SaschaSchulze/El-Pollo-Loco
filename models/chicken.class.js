class Chicken extends moveableObject {
    y = 400;
    height = 65;
    width = 45;
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
    }

    chickenDie() {
        this.isDead = true;
        this.loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
    }
}

class ChickenSmall extends moveableObject {
    y = 410;
    height = 50;
    width = 45;
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
    }

    chickenDie() {
        this.isDead = true;
        this.loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_small/2_dead/dead.png');
    }
}