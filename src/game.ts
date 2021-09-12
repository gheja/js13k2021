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
	
	currentDragObject: GameObject;
	currentDragVector: Vec2D;
	currentDragVectorCost: number;
	correctionBalance: number;
	correctionBalanceMax: number;
	
	lastFrameTime: number;
	
	constructor()
	{
		this.system = new GravitySystem();
		this.systemPrediction = new GravitySystem();
		this.lastCursorDown = false;
		this.paused = false;
		this.autopaused = false;
		this.autopauseEnabled = true;
		this.currentDragPicked = false;
		this.setTooltip("");
		this.lastFrameTime = performance.now();
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
		
		this.gameState = GAME_STATE_RUNNING;
		this.system.bodies = [];
		this.system.stepSize = _levels[levelIndex][1];
		this.correctionBalance = 0;
		this.correctionBalanceMax = 200;
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
	
	petDog()
	{
		let a;
		
		a = document.getElementById("dog").getClientRects();
		console.log(a);
		if (Math.random() < 0.3)
		{
			popDiv(a[0].left + Math.random() * 30, a[0].top - 5, arrayPick(["❤️", "😇", "☺️" ]), false, true);
		}
		popDiv(_cursorPosition.x, _cursorPosition.y + 10, "🤚", true, true);
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
			popDiv(_x(a.position.x), _y(a.position.y), "+" + a.victoryPoints);
			popDiv(_uix(80), _uiy(5), _stats.victoryPoints, true);
			
			_music.soundDestroyed();
			// TODO: add some effects?
		}
	}
	
	checkWinLoseConditions()
	{
		if (_stats.victoryPoints >= _stats.victoryPointsGoal)
		{
			document.getElementById("overlay").style.display = "block";
			document.getElementById("next").style.display = "";
			this.paused = true;
			this.gameState = GAME_STATE_WON;
			_music.soundWin();
		}
	}
	
	updateStatus()
	{
		let a;
		
		this.setStatus(
			_stats.correctionCount + " corrections (" + Math.floor(_stats.correctionTotalCost) + "f) " + TEXT_DIVIDER +
			_stats.victoryPoints + " / " + _stats.victoryPointsGoal + TEXT_DIVIDER +
			this.ticksToTime(_stats.ticksPassed)
		);
		
		a = [];
		
		if (_cursorDown && this.currentDragObject)
		{
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
		
		if (this.autopaused)
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
