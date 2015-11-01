/** @function gameInit
* Init function, called by the Engine at the end of the Resources caching.
* Sets all variables and renders menu
*/
var gameInit = function() {
  gameReset();
  addMenuListener();
  currentMenu.render();
};

/** @function gameStart
* Start the game engine
*/
var gameStart = function() {
  // cleans the canvas
  ctx.clearRect(0, 0, 505, 606);
  // stop the menu listener and starts the player listener
  removeMenuListener();
  addPlayerListener();
  // starts the Engine
  Throttle.init();
};

/** @function gameStop
* Stops the game engine
*/
var gameStop = function() {
  // Sets correct listener
  removePlayerListener();
  addMenuListener();
  // Stops the engine
  Throttle.stop();
};

/** @function gameReset
* Resets all game variables
*/
var gameReset = function() {
  // Forces stop
  gameStop();
  this.mapIndex = 0;
  this.level = 1;
  //caches map
  this.map = maps[mapIndex];
  // generates enemies, obstacles, items e player
  this.allEnemies = enemyGenerator();
  this.allObstacles = obstacleGenerator();
  this.allItems = itemGenerator();
  this.player = new Player();
  // sets the current menu
  this.currentMenu = titleMenu;
};

/** @function nextLevel
* Called on victory by the player, sets the next level
*/
var nextLevel = function() {
  ctx.clearRect(0, 0, 505, 606);
  level++;
  if (level > 10) {
    level = 1;
    mapIndex++;
    map = maps[mapIndex];
    if (map > maps.length) {
      //TODO: set endgame menu
      console.log('victory');
    }
  }
  // Sets all variables
  allObstacles = obstacleGenerator();
  allEnemies = enemyGenerator();
  allItems = itemGenerator();
  player.resetPosition();
};

/** @function enemyGenerator
* Generates enemies
*/
var enemyGenerator = function() {
  /** First, we build the enemyMatrix, rappresenting every possible position for
   * the enemies in the map. We do so to be sure no enemies gets created on top
   * of another
   */
  var enemiesMatrix = [];
  for (var row = 0; row < map.enemies.length; row++) {
    for (var col = 0; col < 5; col++) {
      var matrixItem = [
        (col + 1), map.enemies[row].row, map.enemies[row].speed
      ];
      enemiesMatrix.push(matrixItem);
    }
  }
  var enemiesList = [];
  for (var i = 0; i < level; i++) {
    speed = (100 * level) / (level);
    // pops a random item from the enemiesMatrix
    var r = Math.floor(Math.random() * enemiesMatrix.length);
    var enemyArray = enemiesMatrix[r];
    enemiesMatrix.splice(r, 1);
    // uses the enemyArray to create an enemy, then push it into enemiesList
    var enemy = new Enemy(
      enemyArray[0], enemyArray[1], (enemyArray[2] * speed)
    );
    enemiesList.push(enemy);
  }
  return enemiesList;
};

/** @function obstacleGenerator
* Generates an array of Obstacles
*/
var obstacleGenerator = function() {
  var obstacleList = [];
  // Cycles through rows
  for (var i = 0; i < map.obstacles.length; i++){
    // sets the number of obstacles for the row
    var obstaclesNumber = Math.floor(level / map.obstacles[i].max);
    for (var l = 0; l < obstaclesNumber; l++) {
      // creates the obstacle
      var rowObs = map.obstacles[i].row;
      var colObs = Math.floor(Math.random() * 4) + 1;
      var obstacle = new Obstacle(colObs, rowObs);
      obstacleList.push(obstacle);
    }
  }
  return obstacleList;
};

/** @function itemGenerator
* Generates items
*/
var itemGenerator = function() {
  var itemList = [];
  for (var i = 0; i < map.items.number; i++) {
    // Creates a random Item
    var colItem = Math.floor(Math.random() * 4) + 1;
    var rowItem = map.items.rows[Math.floor(Math.random() * map.items.rows.length)];
    var itemType = Math.floor(Math.random() * 4) + 1;
    switch (itemType) {
      case 1:
        itemList.push(new Heart(colItem, rowItem));
        break;
      case 2:
        itemList.push(new OrangeGem(colItem, rowItem));
        break;
      case 3:
        itemList.push(new BlueGem(colItem, rowItem));
        break;
      case 4:
        itemList.push(new GreenGem(colItem, rowItem));
        break;
    }
  }
  return itemList;
};

/** @function playerListener
* This listens for key presses and sends the keys to the Player.handleInput().
*/
var playerListener = function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
};

/** @function addPlayerListener
* Enables the playerListener
*/
var addPlayerListener = function() {
  document.addEventListener('keyup', playerListener);
};

/** @function removePlayerListener
* Disables the playerListener
*/
var removePlayerListener = function() {
  document.removeEventListener('keyup', playerListener);
};

/** @function menuListener
* This listens for key presses and sends the keys to the handleInput() method
* of the current menu.
*/
var menuListener = function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    32: 'space'
  };
  currentMenu.handleInput(allowedKeys[e.keyCode]);
};

/** @function addMenuListener
* Enables the menuListener
*/
var addMenuListener = function() {
  document.addEventListener('keyup', menuListener);
};

/** @function removeMenuListener
* Disables the menuListener
*/
var removeMenuListener = function() {
  document.removeEventListener('keyup', menuListener);
};
