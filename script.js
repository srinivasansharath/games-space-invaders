const width = 600;
const height= 500;
const shipSize = 10;
const shipSpeed = 4;
const bulletSpeed = 10;
const alienCount = 5;
const alienSize = 30;

var ship;
var bullet;

function setup() {
    createCanvas(width, height);
    ship = new Ship();
    bullet = new Bullet();
    alien = new Alien();
}

function draw() {
    background(50);
    ship.show();
    bullet.show();
    alien.show();
}

function keyPressed() {
    switch(keyCode){
        case LEFT_ARROW:
            ship.move(-1);
            break;
        case RIGHT_ARROW:
            ship.move(1);
            break; 
        case 32: //SpaceBar
            bullet.shoot();
            break;
    }
}

function keyReleased() {
    switch(keyCode){
        case LEFT_ARROW:
        case RIGHT_ARROW:
            ship.move(0);
            break;
    }
}

function Ship() {
    this.x = width/2;
    this.y = height-40;
    this.direction = 0;

    this.show = function() {
        fill(255);
        this.x += this.direction;
        this.x = constrain(this.x, 0, width);
        triangle(this.x, this.y-shipSize-5, this.x-shipSize, this.y+shipSize, this.x+shipSize, this.y+shipSize);
    }

    this.move = function(dir) {
        this.direction = dir * shipSpeed;
    }
}

function Bullet() {
    this.x = ship.x;
    this.y = ship.y;
    this.speed = bulletSpeed;
    this.move = 0;

    this.show = function() {
        fill('red');
        if (this.y <= 0) {
            this.reset();
        } else if (this.move == 1) {
            this.y -= bulletSpeed;
        } else {
            this.x = ship.x;
            this.y = ship.y;
        }
        rectMode(CENTER);
        rect(this.x, this.y, 5, 5);
    }

    this.shoot = function() {
        this.move = 1;
    }

    this.reset = function() {
        this.move = 0;
        this.x = ship.x;
        this.y = ship.y;
    }
}

function Alien() {
    this.count = alienCount;
    this.firstRow = 20;
    this.size = alienSize;
    this.isAlive = [];

    for(var i=0; i < this.count; i++)
        this.isAlive[i] = 1;

    this.show = function() {
        fill(255);
        for(var i=0; i<=this.count; i++)
            rect((width*i/6)-this.size, this.firstRow, this.size, this.size);
    }
}