class GameObject extends GravityBody
{
	icon: string;
	color: string;
	radius: number;
	
	constructor(icon: string, name: string, color: string, position: Vec2D, velocity: Vec2D, mass: number, radius: number)
	{
		super(name, position, velocity, mass);
		this.icon = icon;
		this.color = color;
		this.radius = radius;
	}
}