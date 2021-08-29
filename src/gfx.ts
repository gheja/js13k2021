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
	}
	
	draw()
	{
		this.drawDebug();
	}
}

function render()
{
}
