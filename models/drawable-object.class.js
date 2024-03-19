class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 250;
    height = 150;
    width = 100;

    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); // das gleiche wie: this.img = document.getElementById('image') <img id="image">
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof Coins || this instanceof Bottles || this instanceof Endboss) { // Überprüfen, ob wir ein Character oder ein Chicken sind, sonst wird Funktion nicht ausgeführt
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
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
}