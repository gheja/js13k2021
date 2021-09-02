let _gfx: Gfx;
let _game: Game;
let _cursorDown = false;
let _cursorDownPosition: Vec2D;
let _cursorPosition: Vec2D;

function onResize()
{
	_gfx.resize();
}

function onFrame()
{
	_game.frame();
	_gfx.draw();
	
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
			_cursorPosition.x = (event as MouseEvent).clientX;
			_cursorPosition.y = (event as MouseEvent).clientY;
		}
	}
	catch (e) {}
}

function onMouseClick(event: Event)
{
	// TODO: is this needed at all?
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

function initGame()
{
	_game = new Game();
	_game.loadLevel(0);
}

function init()
{
	_gfx = new Gfx("c1");
	
	initCursor();
	initEventHandlers();
	initGame();
	
	onResize();
	onFrame();
}

window.addEventListener("load", init);
