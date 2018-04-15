// canvas size
const canvas = {
    w: 500,
    h: 500
};

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // The Enemy's position and speed
    // position is passed at invocation; speed is generated
    this.x = x;
    this.y = y;
    this.s = 100 + Math.floor(Math.random() * 300);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.s * dt;

    // reset the enemy's position and speed if it reached the end of the track
    if (this.x > canvas.w) {
        this.x = -100;
        this.s = 100 + Math.floor(Math.random() * 300);
    };

    // TODO detect collision
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y) {
        this.sprite = 'images/char-boy.png'
        this.x = x;
        this.x0 = x;
        this.y = y;
        this.y0 = y;
        this.w = 100;
        this.h = 80;
    }

    //render the player
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // update the player's position using the game's engine
    update() {}

    // bring the player to the start position
    homingPlayer() {}

    // move the player using the keyboard's arrow keys
    handleInput (key) {
        switch (key) {
            case 'left': 
                if(this.x > 0) {
                    this.x += - this.w;
                }; 
                break;
            case 'right': 
                if(this.x < canvas.w - this.w) {
                    this.x += + this.w;
                }; 
                break;
            case 'up': 
                if(this.y > 0) {
                    this.y += - this.h;
                };
                break;
            case 'down': 
                if(this.y < 390) {
                    this.y += + this.h;
                };
                break;
        };
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy1 = new Enemy(-140, 60);
const enemy2 = new Enemy(-190, 145); 
const enemy3 = new Enemy(-230, 230);
const allEnemies = [enemy1, enemy2, enemy3];

const player = new Player(200, 390);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
