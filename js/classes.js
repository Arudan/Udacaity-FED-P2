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
};
Player.prototype.update = function(dt) {
  if (this.lives > 0) {
    this.render();
    this.checkCollisions();
    this.checkVictory();
  }
};
Player.prototype.render = function() {
  if (this.lives > 0){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};
Player.prototype.handleInput = function(key) {
  if (this.lives > 0) {
    if (key === 'up') {
      if (this.y > 0){
        this.y += -83;
      }
    } else if (key === 'left') {
      if (this.x >= 101) {
        this.x += -101;
      }
    } else if (key === 'right') {
      if (this.x < 404) {
        this.x += 101;
      }
    } else if (key === 'down') {
      if (this.y < 400) {
        this.y += 83;
      }
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
Player.prototype.checkVictory = function() {
  if (this.lives > 0){
    if (this.y < 50) {
      nextLevel();
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
