let _system: GravitySystem;
let _cursorDown = false;
let _cursorDownPosition: Vec2D;
let _cursorPosition: Vec2D;

function onResize()
{
}

function onFrame()
{
	window.requestAnimationFrame(onFrame);
}

function onMouseDown(event: Event)
{
	_cursorDown = true;
	onMouseMove(event);
	_cursorDownPosition.copyFrom(_cursorPosition);
}

function onMouseUp(event: Event)
{
	_cursorDown = false;
	onMouseMove(event);
}

function onMouseMove(event: Event)
{
	try
	{
		if (event instanceof TouchEvent)
		{
			_cursorPosition.x = event.touches[0].clientX;
			_cursorPosition.y = event.touches[0].clientY;
		}
		else
		{
			_cursorPosition.x = event.clientX;
			_cursorPosition.y = event.clientY;
		}
	}
	catch (e) {}
}

function onMouseClick(event: Event)
{
	// TODO: is this needed at all?
}

function initSystem()
{
	_system = new GravitySystem();
	_system.stepSize = 1;
	_system.addBody(new GameObject("🌑", "body1", "#ccc", new Vec2D(0, 0),  new Vec2D(0, 0), 1, 0.1));
	_system.addBody(new GameObject("🚀", "body2", "#f60", new Vec2D(10, 0), new Vec2D(0, 0), 1, 0.1));
}

function initCursor()
{
	_cursorPosition = new Vec2D();
	_cursorDownPosition = new Vec2D();
}

function initEventHandlers()
{
	window.addEventListener("resize", onResize);
	window.addEventListener("mousemove", onMouseMove);
	window.addEventListener("touchstart", onMouseDown);
	window.addEventListener("touchmove", onMouseMove);
	window.addEventListener("touchend", onMouseUp);
	window.addEventListener("mousedown", onMouseDown);
	window.addEventListener("mouseup", onMouseUp);
	window.addEventListener("click", onMouseClick);
}

function init()
{
	initCursor();
	initEventHandlers();
	initSystem();
	
	onResize();
	onFrame();
}

window.addEventListener("load", init);
