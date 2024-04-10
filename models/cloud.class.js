class Cloud extends moveableObject {
    y = 50;
    height = 300;
    width = 500;

    constructor() {
        super().loadImage('img_pollo_locco/img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.animate();
    }

    /**
     * Initiates animation for the Cloud, causing it to move left.
     */
    animate() {
        this.moveLeft();
    }
}