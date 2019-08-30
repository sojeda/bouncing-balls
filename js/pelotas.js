// setup canvas

const para = document.querySelector('p');
let count = 0;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

const random = (min,max) =>  {
    const num = Math.floor(Math.random()*(max-min)) + min;
    return num;
};

class Shape {
    constructor(x, y, velX, velY, exists) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.exists = exists;
    }

    draw() {}
}


class Ball extends Shape {
    constructor(x, y, velX, velY, color, size, exists) {
        super(x, y, velX, velY, exists);

        this.color = color;
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }

        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }

        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {
            if (!(this === balls[j])) {
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + balls[j].size && balls[j].exists) {
                    balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
                }
            }
        }
    }
}

class EvilCircle extends Shape {
    constructor(x, y, exists, controls) {
        super(x, y, exists);

        this.velX = 20;
        this.velY = 20;
        this.color = "white";
        this.size = 10;
        this.controls = controls
    }

    draw() {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }

    checkBounds() {
        if ((this.x + this.size) >= width) {
            this.x -= this.size;
        }

        if ((this.x - this.size) <= 0) {
            this.x += this.size;
        }

        if ((this.y + this.size) >= height) {
            this.y -= this.size;
        }

        if ((this.y - this.size) <= 0) {
            this.y += this.size;
        }
    }

    setControls() {
      const _this = this;
      console.log(_this)
      window.addEventListener('keydown', function(e) {
         console.log(e.keyCode)
         switch(e.keyCode) {
            case _this.controls[3]:
               _this.x -= _this.velX;
               break;
            case _this.controls[1]:
               _this.x += _this.velX;
               break;
            case _this.controls[0]:
               _this.y -= _this.velY;
               break;
            case _this.controls[2]:
               _this.y += _this.velY;
               break;
         }
      })
    }

    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {
            if (balls[j].exists) {
                const dx = this.x - balls[j].x;
                const dy = this.y - balls[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + balls[j].size) {
                    balls[j].exists = false;
                    count--;
                    para.textContent = 'Ball count: ' + count;
                }
            }
        }
    }
}

// define array to store balls and populate it

const balls = [];

while (balls.length < 25) {
    const size = random(10, 20);
    const ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        size,
        true
    );
    balls.push(ball);
    count++;
    para.textContent = 'Ball count: ' + count;
}

const evilBall = new EvilCircle(
    random(0, width),
    random(0, height),
    true,
    [87, 68, 83, 65]
);
const evilBall2 = new EvilCircle(
    random(0, width),
    random(0, height),
    true,
    [38, 39, 40, 37]
);
evilBall.setControls();
evilBall2.setControls();


const loop = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        if (balls[i].exists) {
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect();
        }
    }

    evilBall.draw();
    evilBall.checkBounds();
    evilBall.collisionDetect();

    evilBall2.draw();
    evilBall2.checkBounds();
    evilBall2.collisionDetect();

    requestAnimationFrame(loop);
}

loop();