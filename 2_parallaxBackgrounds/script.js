const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 600;

//variable needed to control scrolling speed;
let gameSpeed = 5;

const backgroundImage1 = new Image();
backgroundImage1.src = './backgroundLayers/layer-1.png';

const backgroundImage2 = new Image();
backgroundImage2.src = './backgroundLayers/layer-2.png';

const backgroundImage3 = new Image();
backgroundImage3.src = './backgroundLayers/layer-3.png';

const backgroundImage4 = new Image();
backgroundImage4.src = './backgroundLayers/layer-4.png';

const backgroundImage5 = new Image();
backgroundImage5.src = './backgroundLayers/layer-5.png';

window.addEventListener('load', function () {
    const slider = document.querySelector('#slider')
    slider.value = gameSpeed;

    const showGameSpeed = document.querySelector('#showGameSpeed');
    showGameSpeed.textContent = gameSpeed;

    slider.addEventListener('change', function (e) {
        gameSpeed = e.target.value;
        showGameSpeed.textContent = gameSpeed;
    })


    class Layer {
        constructor(image, speedModifier) {
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 600;
            this.image = image;
            this.speedModifier = speedModifier;
            //variable used this way so if the speed of the layer changes if the gameSpeed is changed dinamically
            this.speed = gameSpeed * this.speedModifier;
        }
        update() {
            this.speed = gameSpeed * this.speedModifier;
            if (this.x <= -this.width) {
                this.x = 0;
            }

            this.x = Math.floor(this.x - this.speed);

        }
        draw() {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
        }

    }

    const layer1 = new Layer(backgroundImage1, 0.1);
    const layer2 = new Layer(backgroundImage2, 0.25);
    const layer3 = new Layer(backgroundImage3, 0.5);
    const layer4 = new Layer(backgroundImage4, 0.75);
    const layer5 = new Layer(backgroundImage5, 1.5);

    const backgroundsArray = [layer1, layer2, layer3, layer4, layer5];

    function animate() {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        backgroundsArray.forEach(object => {
            object.update();
            object.draw()
        })
        requestAnimationFrame(animate);
    }

    animate();
})

