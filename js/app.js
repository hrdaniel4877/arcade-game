'use strict'

// canvasBoundary size
const canvasBoundary = {
    w: 500,
    h: 500
};

// enemy-player vertical alignment correction factor
const c = 10;

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
    if (this.x > canvasBoundary.w) {
        this.x = -100;
        this.s = 100 + Math.floor(Math.random() * 300);
    };

    /* Winning alert
    if (player.y < 1) {
        alert('Congratulations, you won the Game! \nPress ENTER to start again!'); 
        player.resetPlayer();
    };
    */

    //detect collision 
    if (this.x > player.x && this.x < player.x + player.w) {
        if (this.y > player.y - c && this.y < player.y + player.h - c) {
            player.resetPlayer();
        };
    };
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
        this.sprite = 'images/char-boy.png';
        this.x = x;
        this.x0 = x;
        this.y = y;
        this.y0 = y;
        this.w = 100;
        this.h = 100;
    }

    //render the player
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // update the player's position using the game's engine
    update() {}

    // bring the player to the start position
    resetPlayer() {
        this.x = 200;
        this.y = 350;
    }

    // move the player using the keyboard's arrow keys
    handleInput (key) {
        switch (key) {
            case 'left': 
                if(this.x > 0) {
                    this.x += - this.w;
                }; 
                break;
            case 'right': 
                if(this.x < canvasBoundary.w - this.w) {
                    this.x += + this.w;
                }; 
                break;
            case 'up':                 
                if (this.y > 0) {
                    this.y += - this.h;
                };
                break;
            case 'down': 
                if(this.y < 350) {
                    this.y += + this.h;
                };
                break;
        };
        
        // if the player crossed already, reset the game
        if (this.y < 40+c) {
            setTimeout(function(){
                alert('Congratulations, you won the Game! \nPress ENTER to start again!');
                player.resetPlayer();    
            }, 300);
        };        
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy1 = new Enemy(-140, 50);
const enemy2 = new Enemy(-190, 150); 
const enemy3 = new Enemy(-230, 250);
const allEnemies = [enemy1, enemy2, enemy3];

const player = new Player(200, 350);

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
