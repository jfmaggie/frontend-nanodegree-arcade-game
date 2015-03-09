
//app ramdom pick the number of enemies
var enemyTotal = randomNumber(10);

// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    this.x = -50;
    this.yPosition = [60, 140, 220];
    this.y = this.yPosition[Math.floor(Math.random() * this.yPosition.length)];
    this.speed = Math.random() * 100 + 100;
};

// Update the enemy's position
Enemy.prototype.update = function(dt) {

    this.x += this.speed * dt;

    //keep enemies in the canvas
    if (this.x >= 500){
        this.x = -50;
        this.y = this.yPosition[Math.floor(Math.random() * this.yPosition.length)];
    }

    // the bound of enemy
    this.left = this.x;
    this.right = this.x + 50;
    this.top = this.y;
    this.bottom = this.y + 50;

    if(checkCollisions(player, this)){
        player.reset();
    }

    //console.log(this.left, this.right,this.top, this.bottom);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function checkCollisions(player, enemy) {
    return !(player.left >= enemy.right ||
            player.right <= enemy.left ||
            player.top >= enemy.bottom ||
            player.bottom <= enemy.top);
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
    this.top = this.y;
    this.bottom = this.y + 50;

    //console.log(this.left, this.right,this.top, this.bottom);
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
    //move player inside the canvas
    if (key == "left" && this.x > 0) {
        this.x -= 100;
    }else if (key == "left" && this.x == 0) {
        this.x = 0;
    }else if (key == "right" && this.x < 400) {
        this.x += 100;
    }else if (key == "right" && this.x == 400) {
        this.x = 400;
    }else if (key == "up" && this.y >=73) {
        this.y -= 82;
    }else if (key == "down" && this.y < 400) {
        this.y += 82;
    }else if (key == "down" && this.y == 400) {
        this.y = 400;
    }else {
        player.reset();
        //score(score);
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
            allEnemies.push(new Enemy());
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


