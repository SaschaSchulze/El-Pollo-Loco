class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // löscht das canvas zum Anfang immer wieder

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        
        this.ctx.translate(-this.camera_x, 0);

        // Draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() { // self ist die variable für this bzw. als Platzhalter für this eine Zeile weiter unten
            self.draw(); // this. funktioniert innerhalb solch einer FUnktion nicht, aus diesem Grund muss eine Variable erstellt werden an dieser Stelle, die hier self heißt
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(moveableObject) {
        if(moveableObject.otherDirection) {
            this.ctx.save();
            this.ctx.translate(moveableObject.width, 0);
            this.ctx.scale(-1, 1); // -1 verschiebt das Bild um -1 beim drehen. 1 verschiebt das Bild wieder 1 um rechts, damit es auf der selben Stelle ist wie vor dem drehen
            moveableObject.x = moveableObject.x * -1;
        }
        this.ctx.drawImage(moveableObject.img, moveableObject.x, moveableObject.y, moveableObject.width, moveableObject.height);
        if(moveableObject.otherDirection) {
            moveableObject.x = moveableObject.x * -1;
            this.ctx.restore();
        }
    }
}