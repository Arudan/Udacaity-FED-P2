var maps = [{
  // map 1
  'background': [
    ['w', 'w', 'w', 'w', 'w'],
    ['s', 's', 's', 's', 's'],
    ['s', 's', 's', 's', 's'],
    ['s', 's', 's', 's', 's'],
    ['g', 'g', 'g', 'g', 'g'],
    ['g', 'g', 'g', 'g', 'g']
  ],
  'enemies': [
    [1, 1.5],
    [2, 1.25],
    [3, 1]
  ],
  'obstacles': [
    [4, 4]
  ],
  'items': [1, 2, 3]
}, {
  // map 2
  'background': [
    ['w', 'w', 'w', 'w', 'w'],
    ['s', 's', 's', 's', 's'],
    ['g', 'g', 'g', 'g', 'g'],
    ['s', 's', 's', 's', 's'],
    ['s', 's', 's', 's', 's'],
    ['g', 'g', 'g', 'g', 'g']
  ],
  'enemies': [
    [1, 2],
    [3, 1.5],
    [4, 1.25]
  ],
  'obstacles': [
    [2, 3]
  ],
  'items': [1, 3, 4]
}, {
  // map 3
  'background': [
    ['w', 'w', 'w', 'w', 'w'],
    ['g', 'g', 'g', 'g', 'g'],
    ['s', 's', 's', 's', 's'],
    ['g', 'g', 'g', 'g', 'g'],
    ['s', 's', 's', 's', 's'],
    ['g', 'g', 'g', 'g', 'g']
  ],
  'enemies': [
    [2, 2.5],
    [4, 2]
  ],
  'obstacles': [
    [1, 2],
    [3, 2.5]
  ],
  'items': [2, 4]
}];

/** This array is used to tell the game where to generate enemies on each map.
* Each array inside the main array rappresents a level, so we shall call them
* level-arrays. Inside each level-array are the row-arrays, which convey to the
* generateEnemies function the position and characteristics of the enemies form
* that map.
* Inside the row array, the first number is the row index from the top, the
* second number is the speed parameter of the enemies for that row.
*/
var enemiesMaps = [
  // map 1
  [
    [1, 1.5], [2, 1.25], [3, 1]
  ],
  // map 2
  [
    [1, 2], [3, 1.5], [4, 1.25]
  ],
  // map 3
  [
    [2, 2.5], [4, 2]
  ]
];

/**
* Array of array used to instruct the game on where display obstacles.
* The main array contains an array for every map.
* Each mapArray contains an array for each of the rows where the obstacles can
* appear. Each rowArray has two numbers. The first is used to identify the row,
* the second is used to determin how many obstacles must be renderer at a
* specific level, using the formula Math.floor(level / rowArray[1]).
*/
var obstaclesMaps = [
  [
    // map 1
    [4, 4]
  ],
  [
    // map 2
    [2, 3]
  ],
  [
    // map 3
    [1, 2], [3, 2.5]
  ]
];
