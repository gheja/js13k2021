let _objectDefinitions = [
	// [ icon, diameterrotationBase, rotationFollowsTrajectory, points, influenceDistance, friend
	[ "🌑",  5, 0,     false, 10 ],           // OBJ_ROCK = 0
	[ "🚀",  5, 0.125, true,  20 ],           // OBJ_ROCKET
	[ "🛰️",  5, 0.125, true,  10 ],           // OBJ_SATELLITE
	[ "x",  30, 0,     false,  0, 40 ],       // OBJ_BLACK_HOLE
	[ "d",   5, 0.5,   true,   0, 0, true ],  // OBJ_DOG
	[ "🌍",  5, 0,     false, 10 ],           // OBJ_ROCK2
	[ "🎃",  5, 0,     true,   0, 0, true ],  // OBJ_PUMPKIN
	[ "🛸",  5, 0,     false,  0, 0, true ],  // OBJ_SAUCER
	[ "👽",  5, 0,     false,  0, 0, true ],  // OBJ_ALIEN
	[ "⭐",  5, 0.25,  true,  10 ],           // OBJ_STAR
	[ "🌟",  5, 0.25,  true,  15 ],           // OBJ_STAR2
	[ "✨",  5, 0,     true,  20 ],           // OBJ_STAR3
	[ "🪐",  5, 0,     true,  25 ],            // OBJ_ROCK3
	[ "🗿",  5, 0,     true,  0, 0, true ],   // OBJ_MOAI
	[ "🚗",  5, 0.5,   true,  50 ],           // OBJ_CAR
	[ "🌀",  5, 0,     true,  50 ],           // OBJ_DESTROYER
];

let _levels = [
	// #0
	// tutorial 1
	[
		[
			[ OBJ_BLACK_HOLE, 60, 25, 0.0, 0.0, 1e10 ],
			[ OBJ_ROCK,       20, 15, 0.0, 0.0, 1e3 ],
		],
		2, 0, 0, 2, 10,
		"Let's start with that rock, try to fling it into the black hole.",
	],
	
	// #1
	// tutorial 2
	[
		[
			[ OBJ_BLACK_HOLE, 50, 25, 0.0, 0.0, 1e10 ],
			[ OBJ_ROCK,       10, 35, 0.0, 0.0, 1e3 ],
			[ OBJ_ROCK,       90, 20, 0.0, 0.0, 1e3 ],
		],
		1, 0, 0, 2, 20,
		"The yellow bar shows the force you can use, the purple one shows the progress of the black hole.",
	],
	
	// #2
	// tutorial 3
	[
		[
			[ OBJ_BLACK_HOLE, 10, 25,  0.0,  0.0,  1e10 ],
			[ OBJ_ROCKET,     75, 25, -0.1, -0.03, 1e3 ],
			[ OBJ_STAR,       70, 10,  0.0,  0.0,  1e3 ],
			[ OBJ_SATELLITE,  60, 35,  0.0,  0.0,  1e3 ],
		],
		1, 0, 0, 2, 30,
		"On some levels you don't need to clear all objects to complete (notice the brighter part of the bar above).<br/><br/>If you want perfect score though, you need to plan the order of clearing them.",
	],
	
	// #3
	// tutorial 4
	[
		[
			[ OBJ_BLACK_HOLE,   5, 25, 0.0,  0.0,   1e10 ],
			[ OBJ_ROCK,        60, 23, 0.0, -0.005, 1e11 ],
			[ OBJ_ROCKET,      80, 23, 0.0,  0.5,   1e9 ],
		],
		0.5, 0, 0, 2, 20,
		"Objects can also orbit around one another if the conditions are right.",
	],
	
	// #4
	[
		[
			[ OBJ_BLACK_HOLE,  80, 25, 0.0,  0.0,   1e10 ],
			[ OBJ_ROCK,        20, 23, 0.0, -0.005, 1e11 ],
			[ OBJ_SATELLITE,   40, 23, 0.0,  0.5,   1e9 ],
			[ OBJ_ROCKET,      80, 40, -0.08, 0,   1e9 ],
		],
		0.5, 0, 0, 2, 40,
	],
	
	// #5
	// tutorial 5
	[
		[
			[ OBJ_BLACK_HOLE,  20, 20, 0.0,  0.0,   1e10 ],
			[ OBJ_ROCK,        90, 23, 0.0, 0, 1e7 ],
			[ OBJ_SATELLITE,   90, 29, -0.011,  0,   1e2 ],
			[ OBJ_SATELLITE,   90, 9.49, 0.0048,  0,   1e2 ],
			[ OBJ_ROCKET,      80, 35, -0.08, 0.03,   1e3 ],
			[ OBJ_ALIEN,      20, 75, -0.02, -0.04,   1e3 ],
		],
		1, 0, 0, 1.76, 50,
		"There are some friendly things that you should not let fall into the black hole.<br/><br/>Their tracks are marked in red."
	],
	
	// #6
	// first level
	[
		// bodies
		[
			// _objectDefinitions[] index, position.x, position.y, velocity.x, velocity.y, mass
			[ OBJ_BLACK_HOLE, 70, 30, 0.0, 0.0, 1e10 ],
			[ OBJ_ROCK,       20, 20, 0.0, 0.0, 1e11 ],
			[ OBJ_ROCKET,     20, 40, 0.5, 0.0, 1e9 ],
			[ OBJ_SATELLITE,  20, 50, 0.5, 0.0, 1e9 ],
		],
		
		// stepSize, viewPad.x, viewPad.y, zoom, victoryPointsGoal
		1, 0, 5, 1.5, 30,
		
		// tutorial text
		"",
	],
	
	// #7
	[
		[
			[ OBJ_BLACK_HOLE,  5,  25,  0.0,   0.0,   1e10 ],
			[ OBJ_ROCK2,       60, 20,  0.0,  -0.005, 1e9 ],
			[ OBJ_SATELLITE,   70, 20,  0.0,   0.065, 1e3 ],
			[ OBJ_ROCKET,      60, 60,  0.02, -0.05,  1e2 ],
		],
		0.5, 0, 0, 2, 30,
		"Be careful with planets having radars, they are constantly checking for their satellites.",
	],
	
	// #8
	// the one with Space Dog
	[
		[
			[ OBJ_BLACK_HOLE,  90, 50 , 0,      0,     1e10 ],
			[ OBJ_BLACK_HOLE,  30, 30 , 0,      0,     1e10 ],
			[ OBJ_STAR2,       76,  9, -0.095, -0.018, 1e3 ],
			[ OBJ_ROCK,       120, 15,  0,      0,     1e3 ],
			[ OBJ_DOG,        110, 90,  0,     -0.18,  1e3 ],
		],
		1, 0, 5, 1.25, 25,
		"",
	],
	
	// #9
	[
		[
			[ OBJ_BLACK_HOLE, 70, 30,  0,     0, 1e10 ],
			[ OBJ_ROCK,       30, 20,  0,     0, 1e8 ],
			[ OBJ_ROCKET,     70, 10,  0.16,  0, 1e3 ],
			[ OBJ_ROCKET,     70, 54, -0.075, 0, 1e3 ],
			[ OBJ_STAR,       20,  0,  0.11,  0, 1e3 ],
		],
		1, 0, 5, 1.5, 60,
		"",
	],
];
