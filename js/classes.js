/*
* PLAYER CLASS
*/
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.startingX = 202;
  this.startingY = 402;
  this.x = this.startingX;
  this.y = this.startingY;
  this.lives = 3;
  this.livesSprite = 'images/heart.png';
  this.points = 0;
};
Player.prototype.update = function(dt) {
  if (this.lives > 0) {
    this.render();
    this.checkCollisions();
    this.checkDeath();
    this.checkVictory();
  }
};
Player.prototype.render = function() {
  for (var i = 0; i < this.lives; i++){
    ctx.drawImage(Resources.get(this.livesSprite), i * 50 + 5, 42, 50, 70);
  }
  if (this.lives > 0){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};
Player.prototype.handleInput = function(key) {
  if (this.lives > 0) {
    switch (key) {
      case 'up':
          if (this.checkObstacles(0, -83)) {
            this.y += -83;
        }
        break;
      case 'left':
        if (this.checkObstacles(-101, 0)){
          this.x += -101;
        }
        break;
      case 'right':
        if (this.checkObstacles(101, 0)){
          this.x += 101;
        }
        break;
      case 'down':
        if (this.checkObstacles(0, 83)) {
          this.y += 83;
        }
        break;
    }
  }
};
Player.prototype.checkCollisions = function() {
  for (var i = 0; i < allEnemies.length; i++) {
    var en = allEnemies[i];
    if (
      (en.x < this.x && this.x < (en.x + 80) ||
        en.x < this.x + 80 && this.x < en.x) &&
      (en.y - 30 <= this.y && this.y <= en.y + 30)
    ) {
      this.lives -= 1;
      this.resetPosition();
    }
  }
};
Player.prototype.checkDeath = function() {
  if (this.lives <= 0){
    gameInit();
  }
};
Player.prototype.checkVictory = function() {
  if (this.y < 50) {
    nextLevel();
  }
};
Player.prototype.checkObstacles = function(x, y) {
  var fX = this.x + x;
  var fY = this.y + y;
  var result = true;

  /** Checks bounduaries first */
  if (fY < -100) {
    result = false;
  } else if (fX < 0) {
    result = false;
  } else if (fX > 404) {
    result = false;
  } else if (fY > 402) {
    result = false;
  }

  /** Then checks for obstacles */
  for (var i = 0; i < allObstacles.length; i++) {
    var obs = allObstacles[i];
    if (fX === obs.x)
      if (fY < obs.y + 50 && fY > obs.y - 50){
      result = false;
      break;
    }
  }
  return result;
};
Player.prototype.resetPosition = function() {
  this.x = this.startingX;
  this.y = this.startingY;
};

/*
* ENEMY CLASS
*/
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
  this.y = (row * 83) - 22;
  this.speed = speed;
};
Enemy.prototype.update = function(dt) {
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  this.x += this.speed * dt;
  if (this.x > 606) {
    this.x = -101;
  }
  this.render();
};
Enemy.prototype.render = function() {
  // Draw the enemy on the screen, required method for game
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
* OBSTACLE CLASS
*/
var Obstacle = function(column, row) {
  this.x = (column * 101);
  this.y = (row * 83) - 22;
  this.sprite = 'images/rock.png';
};
Obstacle.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
* ITEM SUPERCLASS
*/
var Item = function(column, row) {
  this.x = (column * 101);
  this.y = (row * 83) - 22;
  this.sprite = '';
};
Item.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Item.prototype.onCollision = function() {
  /** Base onCollision function, overwritten by subclasses.
  * Left here as a reminder.
  */
};
/**
* Here I define an inherit function, to be use to create subclasses from item
*/
inherit = function(subClass,superClass) {
   subClass.prototype = Object.create(superClass.prototype); // delegate to prototype
   subClass.prototype.constructor = subClass; // set constructor on prototype
};
/*
* ITEM SUBCLASSES: HEART
*/
var Heart = function(column, row){
  Item.call(this, column, row);
  this.sprite = 'images/heart.png';
};
inherit(Heart, Item);
Heart.prototype.onCollision = function() {
  player.lives++;
};

/*
* ITEM SUBCLASSES: GEMS
*/
// BASE GEM
var Gem = function(column, row) {
  Item.call(this, column, row);
  this.points = 0;
};
inherit(Gem, Item);
Gem.prototype.onCollision = function() {
  player.points += this.points;
};

// GREEN GEM
var GreenGem = function(column, row) {
  Gem.call(this, column, row);
  this.points = 1000;
  this.sprite = 'images/gem-green.png';
};
inherit(GreenGem, Gem);

// BLUE GEM
var BlueGem = function(column, row) {
  Gem.call(this, column, row);
  this.points = 1000;
  this.sprite = 'images/gem-blue.png';
};
inherit(BlueGem, Gem);

// ORANGE GEM
var OrangeGem = function(column, row) {
  Gem.call(this, column, row);
  this.points = 1000;
  this.sprite = 'images/gem-orange.png';
};
inherit(OrangeGem, Gem);
