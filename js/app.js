// Enemies our player must avoid
var Enemy = function(column, row, speed) {
    /*
    * Class function for the enemies, using the pseudoclassical model
    * Takes three parameters, y, x and speed;
    * y is an integer number between 1 and 3. It is used to determin the
    * position on the y axis, as enemies can only be in row 1 to 3.
    * x determins the position on the x axis; It's an integer number which gets
    * multiplied by the number of pixel of the sprite width
    */
    this.sprite = 'images/enemy-bug.png';
    this.x = (column * 101);
    this.y = (row * 70);
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.x += (speed * dt);
  if (this.x > 606) {
    this.x = -101;
  }
  this.render();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 3 * 101;
    this.y = 5 * 83;
};
Player.prototype.update = function (dt) {
  this.render();
};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function (key) {
  if (key === 'up') {
    this.y += 83;
  } else if (key === 'left') {
    this.x += -101;
  } else if (key === 'right') {
    this.x += 101;
  } else if (key === 'down') {
    this.y -= 83;
  }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemyGenerator = function (n) {
  var enemyList = [];
  for (var i = 0; i <= n; i++) {
    row = Math.floor(Math.random() * 3) + 1;
    column = Math.floor(Math.random() * 5) - 1;
    speed = Math.floor(Math.random() * 30) + 20;
    var enemy = new Enemy(column, row, speed);
    enemyList.push(enemy);
  }
  return enemyList;
};

var allEnemies = enemyGenerator(3);
var player = new Player();

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
