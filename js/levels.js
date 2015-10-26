/** Enemies array is used to tell the game where to generate enemies on each map.
* Each object inside the array rappresents a row, which convey to the
* generateEnemies function the position and characteristics of the enemies.
* Inside the row array, the 'row' items is the row index from the top, the
* 'speed' item is the speed parameter of the enemies for that row.
*
* The 'obstacle' array is used to instruct the game on where display obstacles.
* It contains an object for each of the rows where the obstacles can
* appear. Each rowArray has two property. The first, row, is used to identify
* the row, the second, 'max' is used to determin how many obstacles must be
* renderer at a specific level, using the formula Math.floor(level / rowArray[1]).
*/
var maps = [{
  // map 1
  background: [
    ['w', 'w', 'w', 'w', 'w'],
    ['s', 's', 's', 's', 's'],
    ['s', 's', 's', 's', 's'],
    ['s', 's', 's', 's', 's'],
    ['g', 'g', 'g', 'g', 'g'],
    ['g', 'g', 'g', 'g', 'g']
  ],
  enemies: [
    {
      row: 1,
      speed: 1.5
    },
    {
      row: 2,
      speed: 1.25
    },
    {
      row: 3,
      speed: 1
    }
  ],
  obstacles: [
    {
      row: 4,
      max: 4
    }
  ],
  items: {
    max: 1,
    rows: [1, 2, 3],
    chance: 10
  }
}, {
  // map 2
  background: [
    ['w', 'w', 'w', 'w', 'w'],
    ['s', 's', 's', 's', 's'],
    ['g', 'g', 'g', 'g', 'g'],
    ['s', 's', 's', 's', 's'],
    ['s', 's', 's', 's', 's'],
    ['g', 'g', 'g', 'g', 'g']
  ],
  enemies: [
    {
      row: 1,
      speed: 2
    },
    {
      row: 3,
      speed: 1.5
    },
    {
      row: 4,
      speed: 1.25
    }
  ],
  obstacles: [
    {
      row: 2,
      max: 3
    }
  ],
  items: {
    max: 1,
    rows: [1, 3, 4],
    chance: 10
  }
}, {
  // map 3
  background: [
    ['w', 'w', 'w', 'w', 'w'],
    ['g', 'g', 'g', 'g', 'g'],
    ['s', 's', 's', 's', 's'],
    ['g', 'g', 'g', 'g', 'g'],
    ['s', 's', 's', 's', 's'],
    ['g', 'g', 'g', 'g', 'g']
  ],
  enemies: [
    {
      row: 2,
      speed: 2.5
    },
    {
      row: 4,
      speed: 2
    },
  ],
  obstacles: [
    {
      row: 1,
      max: 2
    },
    {
      row: 3,
      max: 2.5
    }
  ],
  items: {
    max: 1,
    rows: [2, 4],
    chance: 10
  }
}];
