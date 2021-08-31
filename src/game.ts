function applyDrag(obj)
{
	let vector: Vec2D;
	
	vector = new Vec2D(_cursorDownPosition.x - _cursorPosition.x, _cursorDownPosition.y - _cursorPosition.y);
	
	// TODO: find out this multiplier
	obj.velocity.x += vector.x / 100;
	obj.velocity.y += vector.y / 100;
}

class Game
{
	system: GravitySystem;
	systemPrediction: GravitySystem;
	lastCursorDown: boolean;
	
	constructor()
	{
		this.system = new GravitySystem();
		this.systemPrediction = new GravitySystem();
		this.lastCursorDown = false;
	}
	
	predictionReset()
	{
		let a, b;
		
		this.systemPrediction.bodies = [];
		this.systemPrediction.stepSize = this.system.stepSize;
		
		for (a of this.system.bodies)
		{
			b = new GravityBody(new Vec2D(a.position.x, a.position.y), new Vec2D(a.velocity.x, a.velocity.y), a.mass);
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
	}
	
	loadLevel()
	{
		this.system.bodies = [];
		this.system.stepSize = 1;
		this.system.addBody(new GameObject("🌑", "body1", "#ccc", new Vec2D(20, 20), new Vec2D(0.0, 0.0), 1e11, 0.1));
		this.system.addBody(new GameObject("🚀", "body2", "#f60", new Vec2D(40, 20), new Vec2D(0.0, 0.5), 1e9, 0.1));
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
//				if (a.pickable)
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
					applyDrag(a);
				}
				
				a.picked = false;
			}
		}
		
		this.lastCursorDown = _cursorDown;
	}
	
	tick()
	{
		this.system.step();
	}
	
	frame()
	{
		this.handleDrag();
		
		// TODO: tick() need to be independent of frame()
		this.tick();
		
		this.predictionReset();
		this.predictionRun();
	}
}