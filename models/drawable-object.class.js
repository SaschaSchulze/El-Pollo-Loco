class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 250;
    height = 150;
    width = 100;

    /**
     * Loads an image from the given path.
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image(); // das gleiche wie: this.img = document.getElementById('image') <img id="image">
        this.img.src = path;
    }

    /**
     * Draws the drawable object on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
/*
    drawFrame(ctx) {
        if (this instanceof Character /*|| this instanceof Chicken || this instanceof ChickenSmall  || this instanceof Coins /*|| this instanceof Bottles || this instanceof Endboss) {
        /*    ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top,
                this.width - this.offset.right - this.offset.left,
                this.height - this.offset.bottom);
            ctx.stroke();
        }
    }*/

    /**
     * Loads multiple images into the image cache.
     * @param {string[]} array - Array of image paths.
     */
    loadImages(array) { 
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}