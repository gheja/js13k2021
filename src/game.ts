class Game
{
	gameState: number;
	system: GravitySystem;
	systemPrediction: GravitySystem;
	lastCursorDown: boolean;
	paused: boolean;
	autopaused: boolean;
	autopauseEnabled: boolean;
	tooltip: string;
	lastLevelIndex: number;
	currentLevelIndex: number;
	friendDestroyed: boolean;
	
	currentDragObject: GameObject;
	currentDragVector: Vec2D;
	currentDragVectorCost: number;
	correctionBalance: number;
	correctionBalanceMax: number;
	
	lastFrameTime: number;
	socket;
	online: boolean;
	
	constructor()
	{
		this.system = new GravitySystem();
		this.systemPrediction = new GravitySystem();
		this.lastCursorDown = false;
		this.paused = false;
		this.autopaused = false;
		this.autopauseEnabled = true;
		this.currentDragPicked = false;
		this.online = false;
		this.setTooltip("");
		this.lastFrameTime = performance.now();
		
		if (typeof io !== "undefined")
		{
			this.socket = io({ upgrade: false, transports: ["websocket"] });
		}
		else
		{
			this.socket = { emit: function() {}, on: function() {} };
		}
		
		this.socket.on("connect", this.onConnected.bind(this));
		this.socket.on("disconnect", this.onDisconnected.bind(this));
		this.socket.on(MESSAGE_BOARD_DATA, this.onBoardData.bind(this));
	}
	
	onConnected()
	{
		this.online = true;
	}
	
	onDisconnected()
	{
		this.online = false;
	}
	
	onBoardData(data)
	{
		let a, s, t, n;
		
		// 0: u: level_index
		// 1: u: points
		// 2: u: corrections
		// 3: u: force_used
		// 4: u: time
		// 5: u: score
		// 6: u: name
		// 7: socket_id
		// 8: timestamp
		
		n = 0;
		s = "";
		for (a of data)
		{
			if (a[0] == this.currentLevelIndex)
			{
				n++;
				
				t = "#" + n + ": " + a[5] + " pts - " + a[6];
				
				if (this.socket.id == a[7])
				{
					s += "<span>" + t + "</span>";
				}
				else
				{
					s += t;
				}
				
				s += "<br/>";
				
				if (n == 5)
				{
					break;
				}
			}
		}
		
		while (n < 5)
		{
			n++;
			s += "#" + n + " (no score yet)<br/>";
		}
		
		document.getElementById("l1").innerHTML = s;
		
	}
	
	askForBoardData()
	{
		if (this.online)
		{
			document.getElementById("l1").innerHTML = "Refreshing...";
			
			window.setTimeout(this.socket.emit.bind(this.socket, MESSAGE_REQUEST_BOARD), 100);
		}
		else
		{
			document.getElementById("l1").innerHTML = "Leaderboard is not available.";
		}
	}
	
	setTooltip(s)
	{
		let obj;
		
		obj = document.getElementById("s2");
		
		if (s)
		{
			obj.innerHTML = s;
			obj.className = "shown";
		}
		else
		{
			obj.className = "";
		}
	}
	
	setStatus(s)
	{
		let obj;
		
		obj = document.getElementById("s1");
		
		// Only update when needed. Some browsers reformat innerHTML so
		// store the string in the dataset as well.
		if (obj.dataset["s"] != s)
		{
			obj.innerHTML = s;
			obj.dataset["s"] = s;
		}
	}
	
	showTip(s)
	{
		document.getElementById("tip").style.display = "block";
		document.getElementById("tip").classList.remove("ok");
		document.getElementById("tiptext").innerHTML = s;
	}
	
	hideTip()
	{
		document.getElementById("tip").style.display = "none";
	}
	
	hideOverlay()
	{
		document.getElementById("overlay").style.display = "none";
	}
	
	unpause()
	{
		this.paused = false;
		this.autopaused = false;
		document.getElementById("tip").classList.add("ok");
		this.hideOverlay();
	}
	
	ticksToTime(n)
	{
		let s;
		
		n = Math.floor(n / 10);
		
		s = (n % 6) + "0";
		n = Math.floor(n / 6);
		
		s = (n % 24) + ":" + s;
		n = Math.floor(n / 24);
		
		s = (n) + " days, " + s;
		
		return s;
	}
	
	predictionReset()
	{
		let a, b;
		
		this.systemPrediction.bodies = [];
		this.systemPrediction.stepSize = this.system.stepSize;
		
		for (a of this.system.bodies)
		{
			b = new GravityBody(new Vec2D(a.position.x, a.position.y), new Vec2D(a.velocity.x, a.velocity.y), a.mass, a.diameter);
			b.isBlackHole = a.isBlackHole;
			b.influenceDistance = a.influenceDistance;
			
			if (a.picked)
			{
				this.applyDrag(b);
			}
			this.systemPrediction.addBody(b);
		}
	}
	
	predictionRun()
	{
		let i, j, a, k;
		
		for (a of this.system.bodies)
		{
			a.predictedPath = [];
		}
		
		for (i=0; i<600; i++)
		{
			this.systemPrediction.step();
			
			for (k=0; k<this.system.bodies.length; k++)
			{
				this.system.bodies[k].predictedPath.push(new Vec2D(this.systemPrediction.bodies[k].position.x, this.systemPrediction.bodies[k].position.y));
			}
		}
		
		for (k=0; k<this.system.bodies.length; k++)
		{
			this.system.bodies[k].predictedToBeDestroyed = this.systemPrediction.bodies[k].isDestroyed;
		}
	}
	
	loadLevel(levelIndex)
	{
		let a, level, item, obj, data;
		
		this.currentLevelIndex = levelIndex;
		
		level = _levels[levelIndex];
		
		_stats.victoryPoints = 0;
		_stats.victoryPointsMax = 0;
		_stats.victoryPointsGoal = level[5];
		_stats.ticksPassed = 0;
		_stats.correctionCount = 0;
		_stats.correctionTotalCost = 0;
		_stats.finalScore = 0;
		
		this.gameState = GAME_STATE_RUNNING;
		this.system.bodies = [];
		this.system.stepSize = _levels[levelIndex][1];
		this.correctionBalance = 0;
		this.correctionBalanceMax = 200;
		this.friendDestroyed = false;
		_gfx.levelPad.x = level[2];
		_gfx.levelPad.y = level[3];
		_gfx.levelZoom = level[4];
		
		for (item of level[0])
		{
			obj = _objectDefinitions[item[0]];
			
			a = new GameObject(obj[0], "dummy", "#fff", new Vec2D(item[1], item[2]), new Vec2D(item[3], item[4]), item[5], obj[1]);
			
			if (obj[5])
			{
				a.pickable = false;
				a.isBlackHole = true;
				a.influenceDistance = obj[5];
			}
			
			if (item[0] == OBJ_ROCK2)
			{
				a.sentinelEnabled = true;
			}
			
			a.objectType = item[0];
			a.victoryPoints = obj[4];
			a.rotationBase = obj[2];
			a.rotationFollowsTrajectory = obj[3];
			a.friend = obj[6];
			
			_stats.victoryPointsMax += obj[4];
			
			this.system.addBody(a);
		}
		
		document.getElementById("next").style.display = "none";
		
		// update zoom and other parameters
		_gfx.resize();
		
		_backgroundGfx.run();
		
		this.unpause();
		
		if (this.lastLevelIndex != levelIndex)
		{
			if (level[6])
			{
				this.showTip(level[6]);
				this.paused = true;
			}
			else
			{
				this.hideTip();
			}
			
			this.lastLevelIndex = levelIndex;
			this.hideOverlay();
		}
	}
	
	loadNextLevel()
	{
		this.loadLevel(this.currentLevelIndex + 1);
	}
	
	restartLevel()
	{
		this.loadLevel(this.currentLevelIndex);
	}
	
	checkDog()
	{
		if (window.localStorage.getItem("hg:dog", false))
		{
			document.getElementById("dog").style.display = "block";
		}
	}
	
	unlockDog()
	{
		window.localStorage.setItem("hg:dog", 1);
		this.checkDog();
	}
	
	tweetDog()
	{
		window.open(TWEET_PREFIX + "I%20just%20petted%20Space%20Dog,%20he%20is%20definitely%20a%20good%20boy!%0A%0A%20Can%20you%20find%20him?" + TWEET_SUFFIX);
	}
	
	petDog()
	{
		let a;
		
		a = document.getElementById("dog").getClientRects();
		console.log(a);
		if (Math.random() < 0.3)
		{
			document.getElementById("dogtweet").style.display = "block";
			popDiv(a[0].left + Math.random() * 30, a[0].top - 5, arrayPick(["❤️", "😇", "☺️" ]), false, true);
		}
		popDiv(_cursorPosition.x, _cursorPosition.y + 10, "🤚", true, true);
	}
	
	tweetLevel()
	{
		window.open(TWEET_PREFIX + "I%20just%20finished level " + (this.currentLevelIndex + 1) + " scoring 999 points" + (true ? ", it got me %231 on the leaderboard" : "") + "." + TWEET_SUFFIX);
	}
	
	setPlayerName(a)
	{
		this.playerName = a;
		window.localStorage.setItem("hg:n", a);
		document.getElementById("p1").innerHTML = this.playerName;
		this.socket.emit(MESSAGE_NEW_NAME, a);
		this.askForBoardData();
	}
	
	loadPlayerName()
	{
		let a;
		
		a = window.localStorage.getItem("hg:n");
		
		this.setPlayerName(a ? a : "Player" + Math.round(Math.random() * 8999999 + 1000000));
	}
	
	askPlayerName()
	{
		let a;
		
		a = window.prompt("New name:", this.playerName);
		
		// TODO: this input is not validated or cleaned at all
		
		if (a)
		{
			a = a.trim().substring(0, 20).trim();
			
			if (a)
			{
				this.setPlayerName(a);
			}
		}
	}
	
	applyDrag(obj: SystemObject)
	{
		obj.velocity.x += this.currentDragVector.x;
		obj.velocity.y += this.currentDragVector.y;
	}
	
	handleDrag()
	{
		let a;
		
		// just picked an object
		if (!this.lastCursorDown && _cursorDown)
		{
			this.currentDragObject = null;
			
			for (a of this.system.bodies)
			{
				a.picked = false;
			}
			
			for (a of this.system.bodies)
			{
				if (a.pickable)
				{
					if (dist2d(new Vec2D(_x(a.position.x) / _gfx.pixelRatio, _y(a.position.y) / _gfx.pixelRatio), _cursorDownPosition) < 50)
					{
						a.picked = true;
						this.currentDragObject = a;
						break;
					}
				}
			}
			
			if (this.currentDragObject)
			{
				_cursorDownPosition.x = _ix(this.currentDragObject.position.x);
				_cursorDownPosition.y = _iy(this.currentDragObject.position.y);
				
				_music.soundDrag(0);
			}
			
			if (this.autopauseEnabled)
			{
				this.autopaused = true;
			}
		}
		
		if (this.currentDragObject)
		{
			this.currentDragVector = new Vec2D(_ipx(_cursorDownPosition.x - _cursorPosition.x) * DRAG_VECTOR_MULTIPLIER, _ipx(_cursorDownPosition.y - _cursorPosition.y) * DRAG_VECTOR_MULTIPLIER);
		}
		else
		{
			this.currentDragVector = new Vec2D(0, 0);
		}
		
		this.currentDragVectorCost = dist2d(new Vec2D(0, 0), this.currentDragVector) * 1000;
		
		// just released the picked object (if any)
		if (this.lastCursorDown && !_cursorDown)
		{
			if (this.currentDragObject)
			{
				this.applyDrag(this.currentDragObject);
				
				this.currentDragObject.picked = false;
				_stats.correctionCount++;
				_stats.correctionTotalCost += this.currentDragVectorCost;
				this.correctionBalance -= this.currentDragVectorCost;
				
				_music.soundDrag(1);
			}
			
			this.currentDragObject = null;
			this.currentDragVectorCost = 0;
			
			if (this.autopauseEnabled)
			{
				this.autopaused = false;
			}
		}
		
		this.lastCursorDown = _cursorDown;
	}
	
	updateObjectRotation()
	{
		let a, dir;
		
		for (a of this.system.bodies)
		{
			if (!a.rotationFollowsTrajectory)
			{
				continue;
			}
			
			a.rotation = a.rotationBase + getAngle2D(new Vec2D(0, 0), a.velocity);
		}
	}
	
	handleDestroyedObjects()
	{
		let a;
		
		for (a of this.system.bodies)
		{
			if (!a.isDestroyed)
			{
				continue;
			}
			
			_stats.victoryPoints += a.victoryPoints;
			
			console.log(_stats.victoryPoints, _stats.victoryPointsGoal);
			
			// gfx?!
			if (a.victoryPoints > 0)
			{
				popDiv(_x(a.position.x), _y(a.position.y), "+" + a.victoryPoints);
				popDiv(_uix(80), _uiy(5), _stats.victoryPoints, true);
			}
			
			_music.soundDestroyed();
			// TODO: add some effects?
			
			if (a.friend)
			{
				this.friendDestroyed = true;
			}
		}
	}
	
	checkWinLoseConditions()
	{
		let a;
		
		if (_stats.victoryPoints >= _stats.victoryPointsGoal)
		{
			document.getElementById("overlay").style.display = "block";
			document.getElementById("w1").style.display = "block";
			document.getElementById("w2").style.display = "none";
			document.getElementById("next").style.display = "";
			this.paused = true;
			this.gameState = GAME_STATE_WON;
			_music.soundWin();
			
			document.getElementById("d1").style.display = "none";
			
			for (a of this.system.bodies)
			{
				if (a.objectType == OBJ_DOG)
				{
					document.getElementById("d1").style.display = "block";
					this.unlockDog();
				}
			}
			
			_stats.finalScore = _stats.victoryPoints * 100 - Math.floor(_stats.correctionTotalCost) - Math.floor(_stats.ticksPassed / 10);
			
			document.getElementById("d3").innerHTML =
				_stats.victoryPoints + "<br/>" +
				Math.floor(_stats.correctionTotalCost) + "f<br/>" +
				this.ticksToTime(_stats.ticksPassed) + "<br/>";
			
			document.getElementById("d4").innerHTML =
				"+" + (_stats.victoryPoints * 100) + "<br/>" +
				"-" + Math.floor(_stats.correctionTotalCost) + "<br/>" +
				"-" + (Math.floor(_stats.ticksPassed / 10)) + "<br/>" +
				"<i>Final score: " + _stats.finalScore + "</i>";
			
			this.socket.emit(MESSAGE_ENTRY, [ this.currentLevelIndex, _stats.victoryPoints, _stats.correctionCount, Math.floor(_stats.correctionTotalCost), _stats.ticksPassed, _stats.finalScore, this.playerName ]);
			this.askForBoardData();
		}
		else if (this.friendDestroyed)
		{
			document.getElementById("overlay").style.display = "block";
			document.getElementById("w1").style.display = "none";
			document.getElementById("w2").style.display = "block";
			document.getElementById("next").style.display = "none";
			this.paused = true;
			this.gameState = GAME_STATE_LOST;
			// _music.soundLost();
		}
	}
	
	updateStatus()
	{
		let a;
		
		this.setStatus(
			"Level " + (this.currentLevelIndex + 1) + TEXT_DIVIDER +
			_stats.correctionCount + " corrections (" + Math.floor(_stats.correctionTotalCost) + "f) " + TEXT_DIVIDER +
			_stats.victoryPoints + " / " + _stats.victoryPointsGoal + TEXT_DIVIDER +
			this.ticksToTime(_stats.ticksPassed)
		);
		
		a = [];
		
		if (_cursorDown && this.currentDragObject)
		{
			if (this.currentDragObject.victoryPoints > 0)
			{
				a.push(this.currentDragObject.victoryPoints + " points");
			}
			
			a.push("Correction cost: " + Math.floor(this.currentDragVectorCost) + "f");
		}
		
		if (this.gameState == GAME_STATE_WON)
		{
			a.push("Finished");
		}
		
		if (this.paused)
		{
			a.push("Paused");
		}
		else if (this.autopaused)
		{
			a.push("Autopaused");
		}
		
		this.setTooltip(a.join(TEXT_DIVIDER));
	}
	
	tick()
	{
		let a;
		
		_stats.ticksPassed++;
		
		for (a of this.system.bodies)
		{
			a.tick();
		}
		
		this.system.step();
		this.handleDestroyedObjects();
		this.system.cleanup();
		
		this.correctionBalance = Math.min(this.correctionBalance + 3, this.correctionBalanceMax);
		
		if (this.gameState == GAME_STATE_RUNNING)
		{
			this.checkWinLoseConditions();
		}
	}
	
	frame()
	{
		let now;
		
		now = performance.now();
		
		this.handleDrag();
		
		if (!this.paused && !this.autopaused)
		{
			while (this.lastFrameTime < now)
			{
				this.tick();
				this.lastFrameTime += 1000 / TICKS_PER_SECOND;
			}
		}
		else
		{
			this.lastFrameTime = now;
		}
		
		this.updateStatus();
		this.updateObjectRotation();
		this.predictionReset();
		this.predictionRun();
	}
}
