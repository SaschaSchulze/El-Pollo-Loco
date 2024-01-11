class Chicken extends moveableObject {
    y = 400;
    height = 60;
    width = 45;
    IMAGES_WALKING = [
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('img_pollo_locco/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 200 + Math.random() * 500; // Zahl zwischen 200 und 700
        this.speed = 0.15 + Math.random() * 0.25; // Math.random generiert eine zufällige Zahl
        this.animate();
    }

    animate() {
        this.moveLeft();

        setInterval(() => {
            // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0,
            // % Zeichen nennt sich Modu und begrenzt die Itteration, in dem Fall nach dem 6. Bild gehts wieder zum 1. Bild
            let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 7 % 6; => 1, Rest 1
            let path = this.IMAGES_WALKING[i]; // itteriert im Array IMAGES_WALKING durch und beginnt bei 0, also dem ersten Bild
            this.img = this.imageCache[path]; // .img aus world.class.js
            this.currentImage++;
        }, 1000)
        
    }
}