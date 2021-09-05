
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
	currentLevelIndex: number;
	
	currentDragVector: Vec2D;
	currentDragVectorCost: number;
	
	constructor()
	{
		this.system = new GravitySystem();
		this.systemPrediction = new GravitySystem();
		this.lastCursorDown = false;
		this.paused = false;
		this.autopaused = false;
		this.autopauseEnabled = true;
		this.setTooltip("");
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
	
	unpause()
	{
		this.paused = false;
		this.autopaused = false;
		document.getElementById("overlay").style.display = "none";
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
		_stats.victoryPointsGoal = level[4];
		_stats.ticksPassed = 0;
		_stats.correctionCount = 0;
		_stats.correctionTotalCost = 0;
		
		this.gameState = GAME_STATE_RUNNING;
		this.system.bodies = [];
		this.system.stepSize = _levels[levelIndex][1];
		_gfx.pad.x = level[2];
		_gfx.pad.y = level[3];
		
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
			
			a.victoryPoints = obj[4];
			a.rotationBase = obj[2];
			a.rotationFollowsTrajectory = obj[3];
			
			this.system.addBody(a);
		}
		
		document.getElementById("next").style.display = "none";
		this.unpause();
	}
	
	loadNextLevel()
	{
		this.loadLevel(this.currentLevelIndex + 1);
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
						break;
					}
				}
			}
			
			if (this.autopauseEnabled)
			{
				this.autopaused = true;
			}
		}
		
		this.currentDragVector = new Vec2D((_cursorDownPosition.x - _cursorPosition.x) * DRAG_VECTOR_MULTIPLIER, (_cursorDownPosition.y - _cursorPosition.y) * DRAG_VECTOR_MULTIPLIER);
		this.currentDragVectorCost = dist2d(new Vec2D(0, 0), this.currentDragVector) * 1000;
		
		// just released the picked object (if any)
		if (this.lastCursorDown && !_cursorDown)
		{
			for (a of this.system.bodies)
			{
				if (a.picked)
				{
					this.applyDrag(a);
					
					_stats.correctionCount++;
					_stats.correctionTotalCost += this.currentDragVectorCost;
				}
				
				a.picked = false;
			}
			
			this.currentDragVectorCost = null;
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
			
			// TODO: add some effects?
		}
	}
	
	checkWinLoseConditions()
	{
		if (_stats.victoryPoints >= _stats.victoryPointsGoal)
		{
			document.getElementById("overlay").style.display = "block";
			document.getElementById("next").style.display = "block";
			this.paused = true;
			this.gameState = GAME_STATE_WON;
		}
	}
	
	updateStatus()
	{
		this.setStatus(
			_stats.correctionCount + " corrections (" + Math.floor(_stats.correctionTotalCost) + "f) " + " &#xb7; " +
			_stats.victoryPoints + " / " + _stats.victoryPointsGoal + " &#xb7; " +
			this.ticksToTime(_stats.ticksPassed)
		);
		
		if (_cursorDown && this.currentDragVectorCost != null)
		{
			this.setTooltip("Correction cost: " + Math.floor(this.currentDragVectorCost) + "f");
		}
		else
		{
			this.setTooltip("");
		}
	}
	
	tick()
	{
		_stats.ticksPassed++;
		this.system.step();
		this.handleDestroyedObjects();
		this.system.cleanup();
		
		if (this.gameState == GAME_STATE_RUNNING)
		{
			this.checkWinLoseConditions();
		}
	}
	
	frame()
	{
		this.handleDrag();
		
		if (!this.paused && !this.autopaused)
		{
			// TODO: tick() need to be independent of frame()
			this.tick();
		}
		
		this.updateStatus();
		this.updateObjectRotation();
		this.predictionReset();
		this.predictionRun();
	}
}
