var gameReset = function(){
  this.level = 1;
  this.allEnemies = enemyGenerator();
  this.player = new Player();
};

var nextLevel = function() {
  this.level++;
  this.allEnemies = enemyGenerator();
  this.player.resetPosition();
};

var enemyGenerator = function() {
  var enemyList = [];
  var n = level * 2;
  for (var i = 0; i < n; i++) {
    row = Math.floor(Math.random() * 3) + 1;
    column = Math.floor(Math.random() * 5) - 1;
    speed = Math.floor(Math.random() * 30 * level) + 20 * level;
    var enemy = new Enemy(column, row, speed);
    enemyList.push(enemy);
  }
  return enemyList;
};
// var level is used to increse the game difficulty at every victory.
// Gets incremented at every level


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

//Initialize game
gameReset();
