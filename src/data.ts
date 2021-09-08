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
			[ OBJ_BLACK_HOLE, 10, 25,  0.0,  0.0,  1e10 ],
			[ OBJ_ROCKET,     70, 20, -0.1, -0.02, 1e3 ],
			[ OBJ_SATELLITE,  70, 50,  0.0,  0.0,  1e3 ],
			[ OBJ_SATELLITE,  60, 70,  0.0,  0.0,  1e3 ],
		],
		
		1, 20, 0, 30,
	],
	
	[
		[
			[ OBJ_BLACK_HOLE,   5, 25, 0.0,  0.0,   1e10 ],
			[ OBJ_ROCK,        60, 25, 0.0, -0.005, 1e11 ],
			[ OBJ_ROCKET,      80, 25, 0.0,  0.5,   1e9 ],
		],
		0.5, 10, 0, 20,
	],
	
	// first level
	[
		// bodies
		[
			// _objectDefinitions[] index, position.x, position.y, velocity.x, velocity.y, mass
			[ OBJ_BLACK_HOLE, 30, 70, 0.0, 0.0, 1e10 ],
			[ OBJ_ROCK,       20, 20, 0.0, 0.0, 1e11 ],
			[ OBJ_ROCKET,     40, 20, 0.0, 0.5, 1e9 ],
			[ OBJ_SATELLITE,  50, 20, 0.0, 0.5, 1e9 ],
		],
		
		// stepSize, viewPad.x, viewPad.y, victoryPointsGoal
		1, 50, 0, 30,
	],
];
