var maps = [
  // level 1
  [
    ['w', 'w', 'w', 'w', 'w'],
    ['s', 's', 's', 's', 's'],
    ['s', 's', 's', 's', 's'],
    ['s', 's', 's', 's', 's'],
    ['g', 'g', 'g', 'g', 'g'],
    ['g', 'g', 'g', 'g', 'g']
  ],
  // level 2
  [
    ['w', 'w', 'w', 'w', 'w'],
    ['s', 's', 's', 's', 's'],
    ['g', 'g', 'g', 'g', 'g'],
    ['s', 's', 's', 's', 's'],
    ['s', 's', 's', 's', 's'],
    ['g', 'g', 'g', 'g', 'g']
  ],
  // level 3
  [
    ['w', 'w', 'w', 'w', 'w'],
    ['g', 'g', 'g', 'g', 'g'],
    ['s', 's', 's', 's', 's'],
    ['g', 'g', 'g', 'g', 'g'],
    ['s', 's', 's', 's', 's'],
    ['g', 'g', 'g', 'g', 'g']
  ]
];

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
