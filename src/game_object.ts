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
	}
}
