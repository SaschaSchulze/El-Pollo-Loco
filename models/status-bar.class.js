class StatusBar extends DrawableObject {

    percentage = 100;

    IMAGES = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png', // 0
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png', // 1
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png', // 2
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png', // 3
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png', // 4
        'img_pollo_locco/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png', // 5
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 10;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage of the status bar and updates the displayed image accordingly.
     * @param {number} percentage - The new percentage of the status bar.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image in the IMAGES array based on the current percentage of the status bar.
     * @returns {number} - The index of the image in the IMAGES array.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}