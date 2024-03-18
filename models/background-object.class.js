<<<<<<< HEAD
class BackgroundObject extends moveableObject {
    width = 720;
    height = 480;
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }
=======
class BackgroundObject extends moveableObject {
    width = 720;
    height = 480;
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }
>>>>>>> 9f9170d514bb2a99489dcde6ef692e3cd8bec04b
}