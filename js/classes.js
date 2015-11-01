/**@class Player
* Class used for the player character.
* It takes no parameter. It sets the sprite to a default and the initial
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
* The update function handles the update of the player.
* It has been divided into four methods, checking collisions with enemies, items
* and if the player is alive of victorious.
*/
Player.prototype.update = function(dt) {
  this.checkDeath();
  this.checkVictory();
  this.checkEnemies();
  this.checkItems();
};
/** @function checkDeath
* if player.lives is 0 or less, you have lost.
* the game restarts from the beginning.
*/
Player.prototype.checkDeath = function() {
  if (this.lives <= 0){
    gameInit();
  }
};
/** @function checkVictory
* If the player reaches the water, he has won the level.
* Calls the nextLevel function and increses the player score.
*/
Player.prototype.checkVictory = function() {
  if (this.y < 50) {
    this.score += (mapIndex + 1) * level * 5;
    nextLevel();
  }
};
/** @function checkEnemies
* For each enemy in allEnemies, checks if it collides with the player.
* In case, the player looses a life and goes back to the starting point.
*/
Player.prototype.checkEnemies = function() {
  for (var i = 0; i < allEnemies.length; i++) {
    var en = allEnemies[i];
    // If the player collides with an enemy
    if (
      // First checks on the y axis
      (this.y >= en.y - 30 && this.y <= en.y + 30) &&
      // Then of the x axis
      (this.x > en.x && this.x < (en.x + 70) ||
        this.x > en.x + 70 && this.x < en.x)
    ) {
      // loses 1 life
      this.lives -= 1;
      // goes back to the starting point
      this.resetPosition();
    }
  }
};
/** @function checkItems
* For each item in allItems, this function verifies if the player collides
* with a visible one
*/
Player.prototype.checkItems = function() {
  for (var i = 0; i < allItems.length; i++) {
    var item = allItems[i];
    if (
      // First of all, the Item must be visible
      item.visible &&
      // Then verifies the eventual collision
      item.x > this.x &&
      item.x < this.x + 101 &&
      item.y > this.y &&
      item.y < this.y + 83
    ) {
      // In case of collision, the Item onCollision function gets called.
      item.onCollision();
      // Afterwards, the Item is removed from the allItems array.
      allItems.splice(i, 1);
    }
  }
};
/** @function render
* The render function handles the rendering of the character sprite and also of
* the lives counter and the score counter.
*/
Player.prototype.render = function() {
  // Render lives counter
  for (var i = 0; i < this.lives; i++){
    ctx.drawImage(Resources.get(this.livesSprite), i * 50 + 5, 42, 50, 70);
  }
  // Render score counter
  ctx.textAlign = 'right';
  ctx.font = '30pt Calibri';
  ctx.fillText(this.score, 495, 90);
  // Render player sprite
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/** @function handleInput
* The handleInput is called by the playerListener function in app.js and is used
* as a callback to keystrokes.
* It updates the position of the player, after checking if the move is legal
* through the checkObstacles function. The checkObstacles gets called with the
* delta from the current position which the player would hava after the move and
* returns a boolean to signify if the move is allowed.
* @param {string} key - the pressed key's name
*/
Player.prototype.handleInput = function(key) {
  switch (key) {
    // Move the player up, if possible
    case 'up':
      if (this.checkObstacles(0, -83)) {
        this.y += -83;
      }
      break;
    // Move the player left, if possible
    case 'left':
      if (this.checkObstacles(-101, 0)){
        this.x += -101;
      }
      break;
    // Move the player right, if possible
    case 'right':
      if (this.checkObstacles(101, 0)){
        this.x += 101;
      }
      break;
    // Move the player down, if possible
    case 'down':
      if (this.checkObstacles(0, 83)) {
        this.y += 83;
      }
      break;
  }
};
/** @function checkObstacles
* Check if the movement to be performed is legal. It checks if the player would
* end outside of bounduaries or against an obstacle. It returns a boolean.
* @param x - delta from player.x
* @param y -delta from player.y
*/
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
/** @function resetPosition
* Sets player coordinates to the starting point
*/
Player.prototype.resetPosition = function() {
  this.x = this.startingX;
  this.y = this.startingY;
};

/*
* ENEMY CLASS
*/
/** @class Enemy
* Class function for the enemies, using the pseudoclassical model
* Takes three parameters, column, row and speed;
* @param column: determins the position on the x axis;  It's an integer number
* which gets multiplied by the number of pixel of the column width
* @param row: integer number. It is used to determin the position on the y
* axis, by multipling the number for the ixel height of the row.
* @param speed: coefficient used to determin the enemy speed inside the update
* method
*/
var Enemy = function(column, row, speed) {
  this.sprite = 'images/enemy-bug.png';
  this.x = (column * 101);
  this.y = (row * 83) - 22;
  this.speed = speed;
};
/** @function update
* Update the enemy's position. It determins the x position by multipling dt by
* speed attribute.
* If the enemy reaches the right bounduary, it resets its position to the left.
@param dt, a time delta between ticks
*/
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
  // If it's outside of the canvas, move it to the left.
  if (this.x > 606) {
    this.x = -101;
  }
};
/** @function render
* Draw the enemy sprite on the screen
*/
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** @class Obstacle
* Class used to rappresent Obstacles on screen.
* @param column: determins the position on the x axis;  It's an integer number
* which gets multiplied by the number of pixel of the column width
* @param row: integer number. It is used to determin the position on the y
* axis, by multipling the number for the ixel height of the row.
*/
var Obstacle = function(column, row) {
  this.x = (column * 101);
  this.y = (row * 83) - 22;
  this.sprite = 'images/rock.png';
};
/** @function render
* Renders the Obstacle sprite on the canvas
*/
Obstacle.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
* ITEM SUPERCLASS
*/
/** @function inherit
* An inherit function, used to create subclasses from Item
*/
inherit = function(subClass,superClass) {
   subClass.prototype = Object.create(superClass.prototype); // delegate to prototype
   subClass.prototype.constructor = subClass; // set constructor on prototype
};

/** @class Item
*
*/
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
