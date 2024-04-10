class Cloud extends moveableObject {
    y = 50;
    height = 300;
    width = 500;
    zIndex = 0;

    constructor() {
        super().loadImage('img_pollo_locco/img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * (5000 - this.width);
        this.animate();
    }

    /**
     * Initiates animation for the Cloud, causing it to move left.
     */
    animate() {
        this.moveLeft();
    }
}