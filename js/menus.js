/**
* Class used to build menus. Implements basic methods, most of which must be
* overwritten by the inheritors.
*/
var Menu = function(maxIndex, verticalMenu){
  this.menuIndex = 0;
  this.maxIndex = maxIndex - 1;
  this.verticalMenu = verticalMenu;
};
/**
* This function handles the creation of the background for the menu.
* It can be called inside the render function.
*/
Menu.prototype.baseRender = function(){
  ctx.clearRect(0, 0, 505, 606);
  mEngine.renderBackground();
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, 50, 505, 537);
};
/**
* This function handles the actual rendering creation of the menu.
* Must by overwritten.
*/
Menu.prototype.render = function() {
  this.baseRender();
};
/**
* This function handles the keyboard inputs given to the menu.
* It uses separated functions for each allowed key, so that inheritors can
* override just the necessary ones.
*/
Menu.prototype.handleInput = function(key) {
  switch (key) {
    case 'space':
      this.onSpace();
      break;
    case 'up':
      if (this.verticalMenu && this.menuIndex > 0) {
        this.menuIndex += -1;
      }
      break;
    case 'down':
      if (this.verticalMenu && this.menuIndex < this.maxIndex) {
        this.menuIndex++;
      }
      break;
    case 'left':
      if (! this.verticalMenu && this.menuIndex > 0) {
        this.menuIndex += -1;
      }
      break;
    case 'right':
      if (! this.verticalMenu && this.menuIndex < this.maxIndex) {
        this.menuIndex++;
      }
      break;
  }
  currentMenu.render();
};
/**
* This function handle the single allowed input key.
* In the class it does nothing.
* Each object must override the needed methods.
*/
Menu.prototype.onSpace = function() {};


var titleMenu =  new Menu(0, true);
titleMenu.render = function() {
    this.baseRender();
    ctx.font = '30pt Calibri';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.fillText('Welcome to', 252, 200);
    ctx.fillText('UDACITY FROGGER', 252, 250);
    ctx.font = '10pt Calibri';
    ctx.fillText('by Alberto Francesco Motta', 252, 280);
    ctx.font = '20pt Calibri';
    ctx.fillStyle = 'yellow';
    ctx.fillText('PRESS SPACE TO CONTINUE', 252, 405);
};
titleMenu.onSpace = function() {
  currentMenu = mainMenu;
  currentMenu.render();
};

var mainMenu = new Menu(3, true);
mainMenu.render = function(){
  this.baseRender();
  ctx.font = '30pt Calibri';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'white';
  ctx.fillText('UDACITY FROGGER', 252, 220);
  ctx.font = '20pt Calibri';
  if (this.menuIndex === 0){
    ctx.fillStyle = 'yellow';
  } else {
    ctx.fillStyle = 'white';
  }
  ctx.fillText('Start game', 252, 300);
  if (this.menuIndex === 1){
    ctx.fillStyle = 'yellow';
  } else {
    ctx.fillStyle = 'white';
  }
  ctx.fillText('Select your character', 252, 340);
  if (this.menuIndex === 2){
    ctx.fillStyle = 'yellow';
  } else {
    ctx.fillStyle = 'white';
  }
  ctx.fillText('Instructions', 252, 380);
};
mainMenu.onSpace = function(){
  switch (this.menuIndex) {
    case 0:
      gameStart();
      break;
    case 1:
      currentMenu = selectCharMenu;
      currentMenu.render();
      break;
    case 2:
      currentMenu = instructionsMenu;
      currentMenu.render();
      break;
  }
};

var selectCharMenu = new Menu(5, false);
selectCharMenu.render = function() {
  this.baseRender();
  ctx.font = '30pt Calibri';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'white';
  ctx.fillText('Choose your character', 252, 200);
  ctx.drawImage(Resources.get('images/selector.png'), (this.menuIndex * 101), 210);
  ctx.drawImage(Resources.get('images/char-boy.png'), 0, 200);
  ctx.drawImage(Resources.get('images/char-cat-girl.png'), 101, 200);
  ctx.drawImage(Resources.get('images/char-horn-girl.png'), 202, 200);
  ctx.drawImage(Resources.get('images/char-pink-girl.png'), 303, 200);
  ctx.drawImage(Resources.get('images/char-princess-girl.png'), 404, 200);
};
selectCharMenu.onSpace = function(){
  switch (this.menuIndex){
    case 0:
      player.sprite = 'images/char-boy.png';
      break;
    case 1:
      player.sprite = 'images/char-cat-girl.png';
      break;
    case 2:
      player.sprite = 'images/char-horn-girl.png';
      break;
    case 3:
      player.sprite = 'images/char-horn-girl.png';
      break;
    case 4:
      player.sprite = 'images/char-princess-girl.png';
      break;
  }
  currentMenu = mainMenu;
};
