class Coins extends moveableObject {
    height= 150;
    width= 150;

    offset= {x: 10 , y: 10, width: -25, height: -20};

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

    generateRandomPosition() {
        this.x = 200 + Math.random() * 2100;
        this.y = 100 + Math.random() * 100;
    }

    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 1000/3);
    }

    collect() {
        this.collected = true;
    }
}