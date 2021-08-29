class Gfx
{
	canvas: any;
	ctx: any;
	pixelRatio: number;
	
	constructor(id: any)
	{
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext("2d");
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
	
	draw()
	{
		this.drawDebug();
	}
}
