/**
* PLAYER CLASS
* Class use for the player character.
* It takes no parameter. It sets the sprite to a default, and the initial
* position.
*/
var Player = function() {
  // Default sprite, used in render method
  this.sprite = 'images/char-boy.png';
  // Starting coordinates, to be used for initial positioning and resets
  this.startingX = 202;
  this.startingY = 402;
  // Initial positioning
  this.x = this.startingX;
  this.y = this.startingY;
  // Initial lives
  this.lives = 3;
  // Sprite used in render method to rappresent lives
  this.livesSprite = 'images/heart.png';
  // Initial score
  this.score = 0;
};

/**
*
*/
Player.prototype.update = function(dt) {

  this.checkCollisions();
  this.checkDeath();
  this.checkVictory();
  this.checkItems();
  this.render();
};
Player.prototype.render = function() {
  for (var i = 0; i < this.lives; i++){
    ctx.drawImage(Resources.get(this.livesSprite), i * 50 + 5, 42, 50, 70);
  }
  if (this.lives > 0){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  ctx.textAlign = 'right';
  ctx.font = '30pt Calibri';
  ctx.fillText(this.score, 495, 90);
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
    this.points += (mapIndex + 1)  * level * 5;
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
Player.prototype.checkItems = function() {
  for (var i = 0; i < allItems.length; i++) {
    var item = allItems[i];
    if (
      item.visible &&
      item.x > this.x &&
      item.x < this.x + 101 &&
      item.y > this.y &&
      item.y < this.y + 83
    ) {
      item.onCollision();
      allItems.splice(i, 1);
    }
  }
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
/**
* First I define an inherit function, to be use to create subclasses from Item
*/
inherit = function(subClass,superClass) {
   subClass.prototype = Object.create(superClass.prototype); // delegate to prototype
   subClass.prototype.constructor = subClass; // set constructor on prototype
};

var Item = function(column, row) {
  this.x = (column * 101) + 25;
  this.y = (row * 83) + 37;
  this.sWidth = 50;
  this.sHeight = 83;
  this.sprite = '';
  this.visible = false;
};
Item.prototype.update = function() {
  var chance = Math.random() * 10000;
  if (chance / level <= map.items.chance) {
    this.visible = true;
  }
};
Item.prototype.render = function() {
  if (this.visible){
    ctx.drawImage(
      Resources.get(this.sprite),
      this.x, this.y,
      this.sWidth, this.sHeight
    );
  }
};
/**
* Base onCollision function, must overwritten by subclasses.
*/
Item.prototype.onCollision = function() {};

/*
* ITEM SUBCLASSES: HEART
*/
var Heart = function(column, row){
  Item.call(this, column, row);
  this.sprite = 'images/heart.png';
  this.y += 10;
};
inherit(Heart, Item);
Heart.prototype.onCollision = function() {
  if (player.lives < 3){
    player.lives++;
  } else {
    player.score += 50;
  }
};

/*
* ITEM SUBCLASSES: GEMS
*/
// BASE GEM
var Gem = function(column, row) {
  Item.call(this, column, row);
  this.score = 0;
};
inherit(Gem, Item);
Gem.prototype.onCollision = function() {
  player.score += this.score;
};

// GREEN GEM
var GreenGem = function(column, row) {
  Gem.call(this, column, row);
  this.score = 500;
  this.sprite = 'images/gem-green.png';
};
inherit(GreenGem, Gem);

// BLUE GEM
var BlueGem = function(column, row) {
  Gem.call(this, column, row);
  this.score = 200;
  this.sprite = 'images/gem-blue.png';
};
inherit(BlueGem, Gem);

// ORANGE GEM
var OrangeGem = function(column, row) {
  Gem.call(this, column, row);
  this.score = 100;
  this.sprite = 'images/gem-orange.png';
};
inherit(OrangeGem, Gem);
