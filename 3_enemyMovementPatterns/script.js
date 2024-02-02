//** @type {HTMLCanvasElement} */
const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 600;
const NUMBER_OF_ENEMIES = 10;
const enemiesArray = [];

const enemyImage1 = new Image();
enemyImage1.src = './enemies/enemy1.png'

let gameFrame = 0;

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = './enemies/enemy1.png'

        this.spriteWidth = 293;
        this.spriteHeight = 155;
        this.width = this.spriteWidth / 3;
        this.height = this.spriteHeight / 3;
        this.frame = 0;
        this.x = Math.random() * (canvas.width - this.width),
        this.y = Math.random() * (canvas.height - this.height);
        this.flapSpeed = Math.floor(Math.random()*6 +1);
    }

    update() {
        this.x += Math.random() * 5 - 2.5;
        this.y += Math.random() * 5 - 2.5;
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }

    draw() {
        ctx.drawImage(enemyImage1, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
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