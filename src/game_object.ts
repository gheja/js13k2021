class GameObject extends GravityBody
{
	icon: string;
	color: string;
	diameter: number;
	predictedPath: Array<Vec2D>;
	
	constructor(icon: string, name: string, color: string, position: Vec2D, velocity: Vec2D, mass: number, diameter: number)
	{
		super(name, position, velocity, mass);
		this.icon = icon;
		this.color = color;
		this.diameter = diameter;
	}
}