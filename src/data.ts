let _objectDefinitions = [
	// [ icon, diameterrotationBase, rotationFollowsTrajectory, points, influenceDistance
	[ "🌑",  5, 0,     false, 10 ],     // OBJ_ROCK = 0
	[ "🚀",  5, 0.125, true,  20 ],     // OBJ_ROCKET
	[ "🛰️",  5, 0.125, true,  10 ],     // OBJ_SATELLITE
	[ "x",  30, 0,     false,  0, 40 ], // OBJ_BLACK_HOLE
	[ "d",   5, 0.5,   true,   0 ],     // OBJ_DOG
	[ "🌍",  5, 0,     false, 10 ],     // OBJ_ROCK2
	[ "🎃",  5, 0,     true,   0 ],     // OBJ_PUMPKIN
	[ "🛸",  5, 0,     false,  0 ],     // OBJ_SAUCER
	[ "👽",  5, 0,     false,  0 ],     // OBJ_ALIEN
	[ "⭐",  5, 0.25,  true,  10 ],     // OBJ_STAR
	[ "🌟",  5, 0.25,  true,  15 ],     // OBJ_STAR2
	[ "✨",  5, 0,     true,  20 ],     // OBJ_STAR3
	[ "🪐",  5, 0,     true,  25 ],     // OBJ_ROCK3
	[ "🗿",  5, 0,     true,  0 ],      // OBJ_MOAI
	[ "🚗",  5, 0.5,   true,  50 ],     // OBJ_CAR
];

let _levels = [
	// tutorial 1
	[
		[
			[ OBJ_BLACK_HOLE, 60, 25, 0.0, 0.0, 1e10 ],
			[ OBJ_ROCK,       20, 25, 0.0, 0.0, 1e3 ],
		],
		1, 0, 0, 2, 10,
		"Let's start with that rock, try to fling it into the black hole.",
	],
	
	// tutorial 2
	[
		[
			[ OBJ_BLACK_HOLE, 50, 25, 0.0, 0.0, 1e10 ],
			[ OBJ_ROCK,       10, 35, 0.0, 0.0, 1e3 ],
			[ OBJ_ROCK,       90, 40, 0.0, 0.0, 1e3 ],
		],
		1, 0, 0, 2, 20,
		"The yellow bar shows the force you can use, the purple one shows the progress of the black hole.",
	],
	
	// tutorial 3
	[
		[
			[ OBJ_BLACK_HOLE, 10, 25,  0.0,  0.0,  1e10 ],
			[ OBJ_ROCKET,     75, 25, -0.1, -0.03, 1e3 ],
			[ OBJ_SATELLITE,  70, 10,  0.0,  0.0,  1e3 ],
			[ OBJ_SATELLITE,  60, 35,  0.0,  0.0,  1e3 ],
		],
		1, 0, 0, 2, 30,
		"On some levels you don't need to clear all objects to complete (notice the brighter part of the bar above).<br/><br/>If you want perfect score though, you need to plan the order of clearing them.",
	],
	
	// tutorial 4
	[
		[
			[ OBJ_BLACK_HOLE,   5, 25, 0.0,  0.0,   1e10 ],
			[ OBJ_ROCK,        60, 23, 0.0, -0.005, 1e11 ],
			[ OBJ_ROCKET,      80, 23, 0.0,  0.5,   1e9 ],
		],
		0.5, 0, 0, 2, 20,
		"Object can also orbit around one another if the conditions are right.",
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
		
		// tutorial text
		"",
	],
];
