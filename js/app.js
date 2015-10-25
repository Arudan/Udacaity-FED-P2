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
  this.mapIndex = 0;
  this.level = 1;
  this.map = maps[mapIndex];
  this.allEnemies = enemyGenerator();
  this.allObstacles = obstacleGenerator();
  this.allItems = [];
  this.player = new Player();
};

var nextLevel = function() {
  level++;
  if (level > 10) {
    level = 1;
    mapIndex++;
    map = maps[mapIndex];
    if (map > 2) {
      console.log('victory');
    }
  }
  allObstacles = obstacleGenerator();
  allEnemies = enemyGenerator();
  player.resetPosition();
};

var enemyGenerator = function() {
  /** First, we build the enemyMatrix, rappresenting every possible position for
   * the enemies in the map. We do so to be sure no enemies gets created on top
   * of another
   */
  var enemiesMatrix = [];
  for (var row = 0; row < map.enemies.length; row++) {
    for (var col = 0; col < 5; col++) {
      var matrixItem = [
        (col + 1), map.enemies[row][0], map.enemies[row][1]
      ];
      enemiesMatrix.push(matrixItem);
    }
  }
  var enemiesList = [];
  for (var i = 0; i < level; i++) {
    speed = (100 * level) / (level);
    var r = Math.floor(Math.random() * enemiesMatrix.length);
    var enemyArray = enemiesMatrix[r];
    enemiesMatrix.splice(r, 1);
    var enemy = new Enemy(
      enemyArray[0], enemyArray[1], (enemyArray[2] * speed)
    );
    enemiesList.push(enemy);
  }
  return enemiesList;
};

var obstacleGenerator = function() {
  var obstacleList = [];
  for (var i = 0; i < map.obstacles.length; i++){
    var oN = Math.floor(level / map.obstacles[i][1]);
    for (var l = 0; l < oN; l++) {
      var rowObs = map.obstacles[i][0];
      var colObs = Math.floor(Math.random() * 5) + 1;
      var obstacle = new Obstacle(colObs, rowObs);
      obstacleList.push(obstacle);
    }
  }
  return obstacleList;
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
