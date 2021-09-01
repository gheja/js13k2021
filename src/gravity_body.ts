class GravityBody
{
	position: Vec2D;
	velocity: Vec2D;
	mass: number;
	diameter: number;
	isDestroyed: boolean;
	isBlackHole: boolean;
	
	tempVelocity: Vec2D;
	predictedPath: Array<Vec2D>;
	predictedToBeDestroyed: boolean;
	
	// not too scientific
	influenceDistance: number;
	
	constructor(position:Vec2D, velocity: Vec2D, mass: number, diameter: number)
	{
		this.position = new Vec2D();
		this.velocity = new Vec2D();
		this.tempVelocity = new Vec2D();
		
		this.position.copyFrom(position);
		this.velocity.copyFrom(velocity);
		this.mass = mass;
		this.diameter = diameter;
		this.isDestroyed = false;
		this.isBlackHole = false;
		this.predictedToBeDestroyed = false;
		this.influenceDistance = 0; // 0 = not using it
	}
	
	stepStart()
	{
		this.tempVelocity.copyFrom(this.velocity);
	}
	
	stepEnd(stepSize: number)
	{
		this.velocity.copyFrom(this.tempVelocity);
		this.position.x += this.velocity.x * stepSize;
		this.position.y += this.velocity.y * stepSize;
	}
}
