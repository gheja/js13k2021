function _x(a)
{
	return (a + _gfx.pad.x) *_gfx.pixelRatio * _gfx.zoom;
}

function _y(a)
{
	return (a + _gfx.pad.y) *_gfx.pixelRatio * _gfx.zoom;
}

function _px(a)
{
	return a *_gfx.pixelRatio * _gfx.zoom;
}

function _pulsate(length: number, offset: number)
{
	return Math.cos((performance.now() + offset) / length * Math.PI * 2);
}

function _blink(length: number, duty: number, offset: number)
{
	return (performance.now() + offset) % length < duty;
}

class Gfx
{
	canvas: any;
	ctx: any;
	pixelRatio: number;
	zoom: number;
	pad: Vec2D;
	pathGradient: CanvasGradient;
	
	constructor(id: any)
	{
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext("2d");
		this.zoom = 10;
		this.pad = new Vec2D(10, 10);
	}
	
	zoomToFit()
	{
		// TODO
	}
	
	resize()
	{
		let dpr, bsr;
		
		dpr = window.devicePixelRatio || 1;
		
		// TODO: this is very likely deprecated now and will always
		// be set to 1, remove if needed
		bsr = this.ctx.webkitBackingStorePixelRatio ||
			this.ctx.mozBackingStorePixelRatio ||
			this.ctx.msBackingStorePixelRatio ||
			this.ctx.oBackingStorePixelRatio ||
			this.ctx.backingStorePixelRatio || 1;
		
		this.pixelRatio = dpr / bsr;
		
		this.canvas.width = Math.floor(window.innerWidth * this.pixelRatio);
		this.canvas.height = Math.floor(window.innerHeight * this.pixelRatio);
		
		this.canvas.style.width = window.innerWidth;
		this.canvas.style.height = window.innerHeight;
		
		// initialize gradients
		let gradient: CanvasGradient;
		
		gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);
		gradient.addColorStop(0.0, "#f0f");
		gradient.addColorStop(0.5, "#03f");
		gradient.addColorStop(1.0, "#0f3");
		
		this.pathGradient = gradient;
	}
	
	toggleFullscreen()
	{
		if (document.fullscreenElement)
		{
			document.exitFullscreen();
		}
		else
		{
			document.documentElement.requestFullscreen();
		}
	}
	
	// NOTE: this will be removed by Closure Compiler as it will not be
	// called in the final code
	drawDebug()
	{
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		
		// testing if cursor/touch down/up is detected properly
		if (_cursorDown)
		{
			this.ctx.fillStyle = "#222";
		}
		else
		{
			this.ctx.fillStyle = "#444";
		}
		
		// testing 200x200 px border
		this.ctx.fillRect(200, 200, this.canvas.width - 400, this.canvas.height - 400);
		
		// testing device pixel ratio
		this.ctx.fillStyle = "#fff";
		this.ctx.fillRect(300, 200, 1, this.canvas.height - 400);
		this.ctx.fillRect(302, 200, 1, this.canvas.height - 400);
		this.ctx.fillRect(304, 200, 1, this.canvas.height - 400);
		this.ctx.fillRect(306, 200, 1, this.canvas.height - 400);
		
		this.ctx.fillRect(200, 300, this.canvas.width - 400, 1);
		this.ctx.fillRect(200, 302, this.canvas.width - 400, 1);
		this.ctx.fillRect(200, 304, this.canvas.width - 400, 1);
		this.ctx.fillRect(200, 306, this.canvas.width - 400, 1);
		
		// last cursor down position
		this.ctx.fillStyle = "#0f0";
		this.ctx.fillRect(_cursorDownPosition.x * this.pixelRatio, 0, 1, this.canvas.height);
		this.ctx.fillRect(0, _cursorDownPosition.y * this.pixelRatio, this.canvas.width, 1);
		
		// current cursor position
		this.ctx.fillStyle = "#ff0";
		this.ctx.fillRect(_cursorPosition.x * this.pixelRatio, 0, 1, this.canvas.height);
		this.ctx.fillRect(0, _cursorPosition.y * this.pixelRatio, this.canvas.width, 1);
		
		// for emojis
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		
		// emoji tests below
		
		let character;
		
		if (performance.now() % 4000 < 2000)
		{
			character = "🌘";
		}
		else
		{
			character = "🚀";
		}
		
		// default emoji with crosshair at 0,0 of text
		this.ctx.fillStyle = "#888";
		this.ctx.strokeStyle = "#888";
		this.ctx.fillRect(400, 350, 1, 200);
		this.ctx.fillRect(300, 450, 200, 1);
		this.ctx.beginPath();
		this.ctx.arc(400, 450, 60, 0, Math.PI * 2);
		this.ctx.stroke();
		this.ctx.font = "100px arial";
		this.ctx.fillText(character, 400, 450);
		
		// twemoji emoji with crosshair at 0,0 of text
		this.ctx.fillStyle = "#888";
		this.ctx.strokeStyle = "#888";
		this.ctx.fillRect(600, 350, 1, 200);
		this.ctx.fillRect(500, 450, 200, 1);
		this.ctx.font = "100px twemoji";
		this.ctx.beginPath();
		this.ctx.arc(600, 450, 60, 0, Math.PI * 2);
		this.ctx.stroke();
		this.ctx.fillText(character, 600, 450);
		
		// twemoji emoji, rotating
		this.ctx.setTransform(1, 0, 0, 1, 800, 450);
		this.ctx.rotate((performance.now() / 2000) * Math.PI * 2);
		this.ctx.fillText(character, 0, 0);
		
		// reset
		this.ctx.setTransform(1, 0, 0, 1, 0, 0);
	}
	
	drawPredictedPaths()
	{
		let a, b;
		
		this.ctx.strokeStyle = this.pathGradient;
		this.ctx.lineWidth = _px(0.3);
		this.ctx.setLineDash([]);
		
		for (a of _game.system.bodies)
		{
			this.ctx.beginPath();
			this.ctx.moveTo(_x(a.position.x), _y(a.position.y));
			
			for (b of a.predictedPath)
			{
				this.ctx.lineTo(_x(b.x), _y(b.y));
			}
			
			this.ctx.stroke();
			
			// draw a warning sign when falling into the black hole
			if (a.predictedToBeDestroyed && _blink(1000, 500, 0))
			{
				this.ctx.font = _px(3) + "px twemoji";
				this.ctx.fillText("⚠️", _x(b.x), _y(b.y));
			}
		}
	}
	
	drawDrag()
	{
		if (_cursorDown)
		{
			this.ctx.strokeStyle = "#ff4";
			this.ctx.lineWidth = _px(0.3);
			
			this.ctx.beginPath();
			this.ctx.moveTo(_cursorDownPosition.x * _gfx.pixelRatio, _cursorDownPosition.y * _gfx.pixelRatio);
			this.ctx.lineTo(_cursorPosition.x * _gfx.pixelRatio, _cursorPosition.y * _gfx.pixelRatio);
			this.ctx.stroke();
		}
	}
	
	drawObjects(blackholes: boolean)
	{
		let a;
		
		for (a of _game.system.bodies)
		{
			if (a.isBlackHole != blackholes)
			{
				continue;
			}
			
			this.ctx.font = _px(a.diameter) + "px twemoji";
			
			this.ctx.setTransform(1, 0, 0, 1, _x(a.position.x), _y(a.position.y));
			// this.ctx.rotation()
			this.ctx.fillText(a.icon, 0, 0);
			
			if (a.isBlackHole)
			{
				let n;
				n = _pulsate(3000, 0);
				
				this.ctx.lineWidth = _px(0.4);
				this.ctx.setLineDash([20 * (1 + n*0.1), 10 * (1 + n*0.1)]);
				
				this.ctx.strokeStyle = "#f00a";
				this.ctx.beginPath();
				this.ctx.arc(0, 0, _px(a.influenceDistance * (0.5 * (1 + n*0.1))), 0, Math.PI * 2);
				this.ctx.stroke();
			}
		}
		
		this.ctx.setTransform(1, 0, 0, 1, 0, 0);
	}
	
	draw()
	{
		this.ctx.setTransform(1, 0, 0, 1, 0, 0);
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = "middle";
		
		this.drawObjects(true);
		this.drawPredictedPaths();
		this.drawDrag();
		this.drawObjects(false);
	}
}
