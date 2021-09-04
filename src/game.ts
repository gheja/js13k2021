function applyDrag(obj, log)
{
	let vector: Vec2D;
	
	vector = new Vec2D(_cursorDownPosition.x - _cursorPosition.x, _cursorDownPosition.y - _cursorPosition.y);
	
	// TODO: find out this multiplier
	obj.velocity.x += vector.x / 5000;
	obj.velocity.y += vector.y / 5000;
	
	if (log)
	{
		_stats.correctionCount++;
		_stats.correctionTotalSpeed += dist2d(new Vec2D(0, 0), vector) / 5000;
	}
}

class Game
{
	system: GravitySystem;
	systemPrediction: GravitySystem;
	lastCursorDown: boolean;
	paused: boolean;
	tooltip: string;
	
	constructor()
	{
		this.system = new GravitySystem();
		this.systemPrediction = new GravitySystem();
		this.lastCursorDown = false;
		this.paused = false;
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
				applyDrag(b);
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
		
		level = _levels[levelIndex];
		
		_stats.victoryPoints = 0;
		_stats.victoryPointsGoal = level[4];
		_stats.ticksPassed = 0;
		_stats.correctionCount = 0;
		_stats.correctionTotalSpeed = 0;
		
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
		}
		
		// just released the picked object (if any)
		if (this.lastCursorDown && !_cursorDown)
		{
			for (a of this.system.bodies)
			{
				if (a.picked)
				{
					applyDrag(a, true);
				}
				
				a.picked = false;
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
			this.paused = true;
			console.log("congrats!");
		}
	}
	
	updateStatus()
	{
		this.setStatus(
			_stats.correctionCount + " corrections (" + Math.floor(_stats.correctionTotalSpeed * 1000) + "f) " + " &#xb7; " +
			_stats.victoryPoints + " / " + _stats.victoryPointsGoal + " &#xb7; " +
			this.ticksToTime(_stats.ticksPassed)
		);
	}
	
	tick()
	{
		_stats.ticksPassed++;
		this.system.step();
		this.handleDestroyedObjects();
		this.system.cleanup();
		this.checkWinLoseConditions();
	}
	
	frame()
	{
		this.handleDrag();
		
		if (!this.paused)
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