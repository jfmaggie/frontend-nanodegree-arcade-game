//game level
var enemyTotal,gameLevel;
gameLevel = 1;
enemyTotal = 3;

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.random();//Math.random() * 200;
    this.x = x;
    this.y = y;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt * 1000;

    //keep enemies in the canvas
    if (this.x >= 500){
        this.x = 0;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function(){

}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

Player.prototype.handleInput = function(key){
    switch(key){
        case "left":
        if (this.x > 0) {
            this.x -= 100;
        }
        else {
            this.x = 400;
        }
        break;
        case "right":
        if (this.x > 390) {
            this.x = 0;
        }
        else {
            this.x += 100 ;
        }
        break;
        case "up":
        if (this.y <= -10) {
            this.y = 400;
        }
        else this.y -= 82;
        break;
        case "down":
        if (this.y == 400) {
            this.y = 400;
        }
        else this.y += 82;
        break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [],
    player = new Player();
for (var i = 0; i < enemyTotal; i++) {
    allEnemies.push(new Enemy(0, (65 + i * 80)));
}


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
