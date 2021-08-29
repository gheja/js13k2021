class GravitySystem
{
	bodies: Array<GravityBody>;
	stepSize: number;
	
	constructor()
	{
		this.bodies = [];
		this.stepSize = 0.1;
	}
	
	addBody(body)
	{
		this.bodies.push(body);
	}
	
	step()
	{
		let a: GravityBody;
		let b: GravityBody;
		let d: Vec2D;
		let r2: number;
		let f: number;
		let acceleration: number;
		
		d = new Vec2D();
		
		for (a of this.bodies)
		{
			a.stepStart();
		}
		
		for (a of this.bodies)
		{
			for (b of this.bodies)
			{
				if (a == b)
				{
					continue;
				}
				
				d.x = b.position.x - a.position.x;
				d.y = b.position.y - a.position.y;
				d.normalize();
				
				r2 = dist2d(a.position, b.position) ** 2;
				
				f = gravConst * ((a.mass * b.mass) / r2); // kg * m / s^2
				
				acceleration = f / a.mass; // m / s^2
				
				a.tempVelocity.x += acceleration * d.x * this.stepSize;
				a.tempVelocity.y += acceleration * d.y * this.stepSize;
			}
		}
		
		for (a of this.bodies)
		{
			a.stepEnd(this.stepSize);
		}
	}
}
