<<<<<<< HEAD
class moveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if(this instanceof ThrowableObject) { // ThrowableObject should always fall
            return true;
        } else {
            return this.y < 240;
        }
    }

    // character.isColliding(chicken)
    isColliding(moveableObject) {
        return this.x + this.width > moveableObject.x &&
            this.y + this.height > moveableObject.y &&
            this.x < moveableObject.x &&
            this.y < moveableObject.y + moveableObject.height
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime(); // Zeitpunkt ab dem 1.1.1970 in Millisekunden
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Differenz in Millisekunden
        timepassed = timepassed / 1000; // Differenz in Sekunden
        return timepassed < 1; // Zeigt die hurt Animation für die eingegebene Zeit an
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        // Walkanimation
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0,
        // % Zeichen nennt sich Modu und begrenzt die Itteration, in dem Fall nach dem 6. Bild gehts wieder zum 1. Bild
        let i = this.currentImage % images.length; // let i = 7 % 6; => 1, Rest 1
        let path = images[i]; // itteriert im Array IMAGES_WALKING durch und beginnt bei 0, also dem ersten Bild
        this.img = this.imageCache[path]; // .img aus world.class.js
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30; // Sprunghöhe
    }
=======
class moveableObject {
    x = 120;
    y = 250;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;

    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); // das gleiche wie: this.img = document.getElementById('image') <img id="image">
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} array - ['img/image1.png', 'img/img2.png', ...] 
     */
    loadImages(array) { 
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        console.log('moving right');    
    }

    moveLeft() {
        setInterval( () => {
            this.x -= this.speed;
        }, 1000 / 60) // 60x pro Sekunde werden 0.2px abgezogen
    }
>>>>>>> 9f9170d514bb2a99489dcde6ef692e3cd8bec04b
}