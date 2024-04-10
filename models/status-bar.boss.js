class BossBar extends DrawableObject {
    
    IMAGES = [
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img_pollo_locco/img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 500;
        this.y = 15;
        this.width = 200;
        this.height = 60;
        this.setPercentageBoss(100);
    }
    
    /**
     * Sets the percentage of the boss's health and updates the displayed image accordingly.
     * @param {number} percentage - The new percentage of the boss's health.
     */
    setPercentageBoss(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image in the IMAGES array based on the current percentage of the boss's health.
     * @returns {number} - The index of the image in the IMAGES array.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 79) {
            return 4;
        } else if (this.percentage > 59) {
            return 3;
        } else if (this.percentage > 39) {
            return 2;
        } else if (this.percentage > 19) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Resets the boss's health percentage to 100.
     */
    reset() {
        this.percentage = 100;
      }
}