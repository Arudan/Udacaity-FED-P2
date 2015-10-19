var gameInit = function() {
  gameReset();
  mEngine.renderBackground();
  player.render();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 50, 505, 537);

  gameStart();
};

var gameStart = function() {
  ctx.clearRect(0, 0, 505, 606);
  addPlayerListener();
  mEngine.init();
};

var gameStop = function() {
  removePlayerListener();
  mEngine.stop();
};

var gameReset = function() {
  mEngine.stop();
  this.map = 0;
  this.level = 1;
  this.allEnemies = enemyGenerator();
  this.player = new Player();
};

var nextLevel = function() {
  level++;
  if (level > 10) {
    level = 1;
    map++;
    if (map > 2) {
      console.log('victory');
    }
  }
  allEnemies = enemyGenerator();
  player.resetPosition();
};

var enemyGenerator = function() {
  /** First, we build the enemyMatrix, rappresenting every possible position for
   * the enemies in the map. We do so to be sure no enemies gets created on top
   * of another
   */
  var enemiesMap = enemiesMaps[map];
  var enemiesMatrix = [];
  for (var row = 0; row < enemiesMap.length; row++) {
    for (var col = 0; col < 5; col++) {
      var matrixItem = [
        (col + 1), enemiesMap[row][0], enemiesMap[row][1]
      ];
      enemiesMatrix.push(matrixItem);
      console.log(matrixItem);
    }
  }
  var enemiesList = [];
  for (var i = 0; i < level; i++) {
    speed = (100 * level) / (level);
    var r = Math.floor(Math.random() * enemiesMatrix.length);
    var enemyArray = enemiesMatrix[r];
    enemiesMatrix.splice(r, 1);
    console.log(r, enemyArray);
    var enemy = new Enemy(
      enemyArray[0], enemyArray[1], (enemyArray[2] * speed)
    );
    enemiesList.push(enemy);
  }
  return enemiesList;
};

var playerListener = function(e) {
  // This listens for key presses and sends the keys to your
  // Player.handleInput() method. You don't need to modify this.
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
};

var addPlayerListener = function() {
  /* This listens for key presses and sends the keys to
   * Player.handleInput() method.
   */
  document.addEventListener('keyup', playerListener);
};

var removePlayerListener = function() {
  document.removeEventListener('keyup', playerListener);
};

var menuListener = function(e) {
  // This listens for key presses and sends the keys to your
  // Player.handleInput() method. You don't need to modify this.
  var allowedKeys = {
    38: 'up',
    40: 'down'
  };
  // player.handleInput(allowedKeys[e.keyCode]);
};

var addMenuListener = function() {
  document.addEventListener('keyup', menuListener);
};

var removeMenuListener = function() {
  document.removeEventListener('keyup', menuListener);
};
