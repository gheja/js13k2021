class Game
{
	system: GravitySystem;
	systemPrediction: GravitySystem;
	
	constructor()
	{
		this.system = new GravitySystem();
		this.systemPrediction = new GravitySystem();
	}
	
	predictionReset()
	{
		let a;
		
		this.systemPrediction.bodies = [];
		this.systemPrediction.stepSize = this.system.stepSize;
		
		for (a of this.system.bodies)
		{
			this.systemPrediction.addBody(new GravityBody(new Vec2D(a.position.x, a.position.y), new Vec2D(a.velocity.x, a.velocity.y), a.mass));
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
	
	tick()
	{
		this.system.step();
	}
	
	frame()
	{
		// TODO: tick() need to be independent of frame()
		this.tick();
		
		this.predictionReset();
		this.predictionRun();
	}
}