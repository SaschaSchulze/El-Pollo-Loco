class Coins extends moveableObject {
    height= 150;
    width= 150;

    offset = {
        top: 50,
        bottom: 100,
        left: 50,
        right: 50,
      };

    IMAGES_COINS = [
        'img_pollo_locco/img/8_coin/coin_1.png',
        'img_pollo_locco/img/8_coin/coin_2.png',
    ];

    constructor() {
        super().loadImage('img_pollo_locco/img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.speed = 0.10 + Math.random() *0.30;
        this.generateRandomPosition();
        this.animateCoins();
    }

    /**
     * Generates a random position for the Coins object.
     */
    generateRandomPosition() {
        this.x = 200 + Math.random() * 2100;
        this.y = 100 + Math.random() * 100;
    }

    /**
     * Initiates animation for the Coins object.
     */
    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 1000/3);
    }

    /**
     * Marks the Coins object as collected.
     */
    collect() {
        this.collected = true;
    }
}