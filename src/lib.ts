function dist2d(a: Vec2D, b: Vec2D)
{
	return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function getAngle2D(a: Vec2D, b: Vec2D): number
{
	return Math.atan2(b.y - a.y, b.x - a.x) / (Math.PI * 2);
}

function arrayPick(a: Array<any>)
{
	return a[Math.floor(Math.random() * a.length)];
}

function clamp(min: number, max: number, x: number)
{
	return Math.min(Math.max(x, min), max);
}
