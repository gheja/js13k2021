let _objectDefinitions = [
	// [ icon, diameterrotationBase, rotationFollowsTrajectory, points, influenceDistance
	[ "🌑",  5, 0,     false, 10 ],     // OBJ_ROCK = 0
	[ "🚀",  5, 0.125, true,  20 ],     // OBJ_ROCKET
	[ "🛰️",  5, 0.125, true,  10 ],     // OBJ_SATELLITE
	[ "x", 30, 0,     false,  0, 40 ], // OBJ_BLACK_HOLE
];

let _levels = [
	[
		[
			[ OBJ_BLACK_HOLE, 60, 25, 0.0, 0.0, 1e10 ],
			[ OBJ_ROCK,       20, 25, 0.0, 0.0, 1e3 ],
		],
		1, 0, 0, 2, 10,
		"Now fling that rock into the black hole.",
	],
	
	[
		[
			[ OBJ_BLACK_HOLE, 10, 25,  0.0,  0.0,  1e10 ],
			[ OBJ_ROCKET,     75, 25, -0.1, -0.03, 1e3 ],
			[ OBJ_SATELLITE,  70, 10,  0.0,  0.0,  1e3 ],
			[ OBJ_SATELLITE,  60, 35,  0.0,  0.0,  1e3 ],
		],
		1, 0, 0, 2, 30,
		"On some levels you don't need to clear all objects to complete.<br/>If you want though, you need to plan the order of clearing them.",
	],
	
	[
		[
			[ OBJ_BLACK_HOLE,   5, 25, 0.0,  0.0,   1e10 ],
			[ OBJ_ROCK,        60, 23, 0.0, -0.005, 1e11 ],
			[ OBJ_ROCKET,      80, 23, 0.0,  0.5,   1e9 ],
		],
		0.5, 0, 0, 2, 20,
		"",
	],
	
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
		"",
	],
];
