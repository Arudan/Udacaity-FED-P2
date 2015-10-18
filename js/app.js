var gameInit = function(){
  gameReset();
  mEngine.renderBackground();
  player.render();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 50, 505, 537);

  gameStart();
};

var gameStart = function(){
  ctx.clearRect(0, 0, 505, 606);
  addPlayerListener();
  mEngine.init();
};

var gameStop = function(){
  removePlayerListener();
  mEngine.stop();
};

var gameReset = function(){
  mEngine.stop();
  this.map = 0;
  this.level = 1;
  this.allEnemies = enemyGenerator();
  this.player = new Player();
};

var nextLevel = function() {
  level++;
  if (level > 5) {
    level = 1;
    map++;
    if (map > 3){
      console.log('victory');
    }
  }
  allEnemies = enemyGenerator();
  player.resetPosition();
};

var enemyGenerator = function() {
  var enemyList = [];
  var enemyMatrix = [];
  for (var i = 0; i < level; i++) {
    row = Math.floor(Math.random() * 3) + 1;
    column = Math.floor(Math.random() * 5) - 1;
    speed = (100 * level) / (level);
    var enemy = new Enemy(column, row, speed);
    enemyList.push(enemy);
  }
  return enemyList;
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
