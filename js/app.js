
//app ramdom pick the number of enemies
var enemyTotal = randomNumber(20);

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.left = this.x;
    this.right = this.x + 50;
    this.top = this.y - 50;
    this.bottom = this.y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += 100 * dt;
    //keep enemies in the canvas
    if (this.x >= 500){
        this.x = 0;
    }

    if(checkCollisions(player, this)){
        player.reset();
        //console.log(this.left, this.right,this.top, this.bottom);
    }

    //console.log(this.left, this.right,this.top, this.bottom);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function checkCollisions(player, enemy) {
    return !(player.left >= enemy.right || player.right <= enemy.left ||
        player.top >= enemy.bottom || player.bottom <= enemy.top);
}

Enemy.prototype.checkCollisions = function(){
    checkCollisions(player, this);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function(){
    //if checkCollisions is true which means player come across the enemy
    //player needs to be reset to init position
    this.left = this.x;
    this.right = this.x + 50;
    this.top = this.y - 50;
    this.bottom = this.y;

    //console.log(this.left, this.right,this.top, this.bottom);
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
    switch(key){
        case "left":
        if (this.x > 0) {
            this.x -= 100;
        }
        else {
            this.x = 0;
        }
        break;
        case "right":
        if (this.x > 390) {
            this.x = 400;
        }
        else {
            this.x += 100 ;
        }
        break;
        case "up":

        if (this.y < 73) {
            //in this scenario, player wins
             //get score and upgrade to next level

            // invoke congrats messages

            //reset to init location
            this.x = 200;
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
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [],
    player = new Player(200,400);

//create at least 3 enemies
var creatEnemy = function() {
    if (!enemyTotal) {
       enemyTotal = 1;
       creatEnemy();
    }
   else {
        for (var i = 0; i < enemyTotal; i++) {
            allEnemies.push(new Enemy(0, 60));
            allEnemies.push(new Enemy(100, 140));
            allEnemies.push(new Enemy(300, 220));
        }
    }
}();


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


