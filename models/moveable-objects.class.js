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
}