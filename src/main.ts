let _gfx: Gfx;
let _backgroundGfx: BackgroundGfx;
let _game: Game;
let _cursorDown = false;
let _cursorDownPosition: Vec2D;
let _cursorPosition: Vec2D;

let _music: Music;

function popDivDestroy(obj)
{
	obj.parentNode.removeChild(obj);
}

function popDiv(x, y, text, reverse, emoji, color)
{
	let tmp;
	
	tmp = document.createElement("div");
	tmp.className = "pop";
	tmp.style.left = x;
	tmp.style.top = y;
	tmp.innerHTML = text;
	
	if (reverse)
	{
		tmp.className += " popr";
	}
	
	if (emoji)
	{
		tmp.className += " popt";
	}
	
	document.body.appendChild(tmp);
	window.setTimeout(popDivDestroy.bind(null, tmp), 2500);
}

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
	
	if (event.target.id != "dog" && event.target.tagName.toLowerCase() != "button")
	{
		event.preventDefault();
	}
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
	_game.checkDog();
	_game.loadPlayerName();
}

function init()
{
	_gfx = new Gfx("c1");
	_backgroundGfx = new BackgroundGfx("c2");
	_music = new Music();
	
	initCursor();
	initEventHandlers();
	initGame();
	
	onResize();
	onFrame();
	
	document.getElementById("intro").classList.add("loaded");
}

function initWait()
{
	// wait for twemoji to load or 10 seconds at most
	if (!document.fonts.check('1em twemoji') && performance.now() < 10000)
	{
		window.setTimeout(initWait, 100);
		return;
	}
	
	init();
}

function introShowLine(obj)
{
	obj.classList.add("shown");
}

function introStart()
{
	let a, delay;
	
	delay = 500;
	
	for (a of document.querySelectorAll("#intro > div > p"))
	{
		window.setTimeout(introShowLine.bind(null, a), delay);
		delay += 1000;
	}
}

function initFirst()
{
	introStart();
	initWait();
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
	else if (action == 10)
	{
		_game.unpause();
	}
	else if (action == 11)
	{
		_music.start();
		document.getElementById("intro").style.display = "none";
	}
	else if (action == 12)
	{
		_game.petDog();
	}
	else if (action == 13)
	{
		_game.askPlayerName();
	}
	else if (action == 14)
	{
		_game.tweetLevel();
	}
	else if (action == 15)
	{
		_game.tweetDog();
	}
}

window.addEventListener("load", initFirst);
