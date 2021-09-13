class GameObject extends GravityBody
{
	name: string;
	icon: string;
	color: string;
	pickable: boolean;
	picked: boolean;
	rotation: number;
	rotationBase: number;
	rotationDelta: number;
	rotationFollowsTrajectory: boolean;
	
	sentinelEnabled: boolean;
	sentinelAngle: number;
	sentinelTimeout: number;
	sentinelLastSeen: number;
	
	constructor(icon: string, name: string, color: string, position: Vec2D, velocity: Vec2D, mass: number, diameter: number)
	{
		super(position, velocity, mass, diameter);
		this.name = name;
		this.icon = icon;
		this.color = color;
		this.pickable = true;
		this.picked = false;
		this.rotation = 0;
		this.rotationBase = 0;
		this.rotationDelta = 0;
		this.rotationFollowsTrajectory = false;
		
		this.sentinelEnabled = false;
		this.sentinelAngle = 0;
		this.sentinelDistance = 22;
		this.sentinelTicksLeft = 400;
		this.sentinelTicksTimeout = 400;
		this.sentinelTicksWarning = 140;
	}
	
	tick()
	{
		let a, b;
		
		if (this.sentinelEnabled)
		{
			if (this.sentinelLastSeen == null)
			{
				this.sentinelLastSeen = performance.now();
			}
			
			this.sentinelTicksLeft--;
			
			this.sentinelAngle = (this.sentinelAngle + 0.006) % 1;
			
			for (a of _game.system.bodies)
			{
				if (a == this)
				{
					continue;
				}
				
				if (a.objectType != OBJ_SATELLITE)
				{
					continue;
				}
				
				if (Math.abs(getAngle2D(this.position, a.position) - this.sentinelAngle) < 0.1 && dist2d(this.position, a.position) <= this.sentinelDistance)
				{
					this.sentinelTicksLeft = this.sentinelTicksTimeout;
				}
			}
			
			if (this.sentinelTicksLeft == this.sentinelTicksWarning)
			{
				popDiv(_jx(this.position.x), _jy(this.position.y), "😮", false, true);
			}
			else if (this.sentinelTicksLeft == 0)
			{
				popDiv(_jx(this.position.x), _jy(this.position.y), "😡", false, true);
				this.sentinelEnabled = false;
				console.log("panic!");
				this.panic();
			}
		}
	}
	
	panic()
	{
		let a, obj, v, n, b;
		
		for (a of _game.system.bodies)
		{
			if (a.isBlackHole)
			{
				b = a;
				break;
			}
		}
		
		obj = _objectDefinitions[OBJ_DESTROYER];
		
		v = new Vec2D((b.position.x + (Math.random() - 0.5) * 10) - this.position.x, (b.position.y + (Math.random() - 0.5) * 10) - this.position.y);
		v.normalize();
		
		a = new GameObject(obj[0], "dummy", "#fff", new Vec2D(this.position.x + v.x * 5, this.position.y + v.y * 5), new Vec2D(v.x/2, v.y/2), a.mass / 50, obj[1]);
		a.pickable = false;
		a.friend = true;
		a.victoryPoints = 0;
		
		_game.system.bodies.push(a);
	}
}
