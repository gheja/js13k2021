let _gfx: Gfx;
let _backgroundGfx: BackgroundGfx;
let _game: Game;
let _cursorDown = false;
let _cursorDownPosition: Vec2D;
let _cursorPosition: Vec2D;

function onResize()
{
	_gfx.resize();
	_backgroundGfx.resize();
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
	event.preventDefault();
}

function onMouseUp(event: Event)
{
	_cursorDown = false;
	onMouseMove(event);
	event.preventDefault();
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
	event.preventDefault();
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
	window.addEventListener("touchstart", onMouseDown, { passive:false });
	window.addEventListener("touchmove", onMouseMove, { passive:false });
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
	_backgroundGfx = new BackgroundGfx("c2");
	
	initCursor();
	initEventHandlers();
	initGame();
	
	onResize();
	onFrame();
}

function b1(action: number)
{
	if (action == 1)
	{
		_gfx.toggleFullscreen();
	}
	else if (action == 2)
	{
		_game.paused = !_game.paused;
	}
/*	else if (action == 6)
	{
		_game.autopauseEnabled = !_game.autopauseEnabled;
		target.classList.remove("on");
		if (_game.autopauseEnabled)
		{
			target.classList.add("on");
		}
	}
*/
	else if (action == 7)
	{
		_game.loadNextLevel();
	}
	else if (action == 8)
	{
		_game.unpause();
	}
	else if (action == 9)
	{
		_game.restartLevel();
	}
}

window.addEventListener("load", init);
