class CoinsBar extends DrawableObject {
    IMAGES = [
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img_pollo_locco/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 10;
        this.y = 60;
        this.width = 200;
        this.height = 60;
        this.setPercentageCoin(0);
    }

    /**
     * Sets the percentage of the coins bar and updates the displayed image accordingly.
     * @param {number} percentage - The new percentage of the coins bar.
     */
    setPercentageCoin(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the image in the IMAGES array based on the current percentage of the coins bar.
     * @returns {number} - The index of the image in the IMAGES array.
     */
    resolveImageIndex() {
        if (this.percentage < 20) {
            return 0; // 5 gibt die Stelle im Array IMAGES an, also das letzte Bild
        } else if (this.percentage < 40) {
            return 1;
        } else if (this.percentage < 60) {
            return 2;
        } else if (this.percentage < 80) {
            return 3;
        } else if (this.percentage < 100) {
            return 4;
        } else {
            return 5;
        }
    }

    //reset() {
    //    this.percentage = 0;
    //    let path = this.IMAGES[this.resolveImageIndex()];
    //    this.img = this.imageCache[path];
    //}
}