//** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 600;
const NUMBER_OF_ENEMIES = 10;
const enemiesArray = [];

let gameFrame = 0;

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = './../enemies/enemy3.png'
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth / 3;
        this.height = this.spriteHeight / 3;
        this.frame = 0;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = Math.random() * 3;
        this.angleSpeed = Math.random() * 0.2;
        this.amplitude = Math.random() * 3;
    }

    update() {
        this.x -= this.amplitude * Math.sin(this.angle * Math.PI/180) + canvas.width/2 - this.width;
        
        //this.y += this.amplitude * Math.sin(this.angle)

        this.angle += this.angleSpeed;
        
        if (this.x + this.width < 0) this.x = canvas.width;
        
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }

    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

for (let i = 0; i < NUMBER_OF_ENEMIES; i++) {
    enemiesArray.push(new Enemy());
}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach(enemy => {
        enemy.draw();
        enemy.update();
    })
    gameFrame++;
    requestAnimationFrame(animate)
}
animate();