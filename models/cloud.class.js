<<<<<<< HEAD
class Cloud extends moveableObject {
    y = 50;
    height = 300;
    width = 500;
    
    
    constructor() {
        super().loadImage('img_pollo_locco/img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500; // Zahl zwischen 200 und 700
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
=======
class Cloud extends moveableObject {
    y = 50;
    height = 300;
    width = 500;
    
    
    constructor() {
        super().loadImage('img_pollo_locco/img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500; // Zahl zwischen 200 und 700
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
>>>>>>> 9f9170d514bb2a99489dcde6ef692e3cd8bec04b
}