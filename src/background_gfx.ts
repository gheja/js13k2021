class BackgroundGfx
{
	canvas: any;
	ctx: any;
	
	constructor(id: any)
	{
		this.canvas = document.getElementById(id);
		this.canvas.width = NOISE_RESOLUTION;
		this.canvas.height = NOISE_RESOLUTION;
		
		this.ctx = this.canvas.getContext("2d");
	}
	
	// based on my entry for js13kgames 2017, Where is Winston?
	//   - http://js13kgames.com/entries/where-is-winston
	//   - https://github.com/gheja/lost13k
	//   - https://gheja.itch.io/where-is-winston
	
	getNoiseLayer(pow, color)
	{
		// heightmap generation using random midpoint displacement
		
		// 0 1 2 3 4 5 6 7 8
		// x               x - init
		// .       x       . - 4
		// .   x   .   x   . - 2
		// . x . x . x . x . - 1
		
		let x, y, step, max_elevation, map, p, d, a, b, canvas, ctx, min, max;
		
		canvas = document.createElement("canvas");
		canvas.width = NOISE_RESOLUTION;
		canvas.height = NOISE_RESOLUTION;
		
		ctx = canvas.getContext("2d");
		
		map = [];
		
		// initialize the grid with default values
		for (x=0; x<=NOISE_RESOLUTION; x++)
		{
			map[x] = [];
			
			for (y=0; y<=NOISE_RESOLUTION; y++)
			{
				map[x][y] = 0;
			}
		}
		
		step = NOISE_RESOLUTION;
		max_elevation = 1;
		
		while (step > 0)
		{
			for (y=0; y<NOISE_RESOLUTION; y+=step)
			{
				for (x=step; x<NOISE_RESOLUTION; x+= step * 2)
				{
					map[x][y] = (map[x - step][y] + map[x + step][y]) / 2 + randPlusMinus(max_elevation);
				}
			}
			
			for (x=0; x<NOISE_RESOLUTION; x+=step)
			{
				for (y=step; y<NOISE_RESOLUTION; y+=step * 2)
				{
					map[x][y] = (map[x][y - step] + map[x][y + step]) / 2 + randPlusMinus(max_elevation);
				}
			}
			
			step = Math.floor(step / 2);
			max_elevation /= 2;
		}
		
		// normalization
		min = 1.0;
		max = 0.0;
		
		// find limits
		for (x=0; x<NOISE_RESOLUTION; x++)
		{
			for (y=0; y<NOISE_RESOLUTION; y++)
			{
				min = Math.min(min, map[x][y]);
				max = Math.max(max, map[x][y]);
			}
		}
		
		d = ctx.getImageData(0, 0, NOISE_RESOLUTION, NOISE_RESOLUTION);
		
		// normalization + output
		for (x=0; x<NOISE_RESOLUTION; x++)
		{
			for (y=0; y<NOISE_RESOLUTION; y++)
			{
				a = Math.pow((map[x][y] - min) * (1 / (max - min)), pow);
				
				b = Math.floor(Math.pow(a, 15) * 255);
				
				d.data[(y * NOISE_RESOLUTION + x) * 4] = clamp(0, 255, color[0] + b);
				d.data[(y * NOISE_RESOLUTION + x) * 4 + 1] = clamp(0, 255, color[1] + b);
				d.data[(y * NOISE_RESOLUTION + x) * 4 + 2] = clamp(0, 255, color[2] + b);
				d.data[(y * NOISE_RESOLUTION + x) * 4 + 3] = Math.floor(a * 255);
			}
		}
		
		ctx.putImageData(d, 0, 0);
		
		return canvas;
	}
	
	resize()
	{
		let a: number;
		let zoom: number;
		
		zoom = Math.max(window.innerWidth / NOISE_RESOLUTION, window.innerHeight / NOISE_RESOLUTION);
		
		a = NOISE_RESOLUTION * zoom;
		
		this.canvas.style.width = a;
		this.canvas.style.height = a;
		
		// it does not need to be centered, it should just fill the screen
		// this.canvas.style.top = window.innerWidth / 2 - a / 2;
		// this.canvas.style.left = window.innerWidth / 2 - a / 2;
	}
	
	run()
	{
		let colorSets, colorSet;
		
		this.ctx.clearRect(0, 0, NOISE_RESOLUTION, NOISE_RESOLUTION);
		this.ctx.globalCompositeOperation = "screen";
		
		colorSets = [
			[ [ 120, 0, 120 ], [ 0, 128, 255 ], [ 255, 120, 0 ] ],
			[ [ 255, 30, 20 ], [ 0, 128, 255 ], [ 255, 120, 0 ] ],
			[ [ 0, 180, 140 ], [ 0, 128, 255 ], [ 255, 180, 0 ] ],
		];
		
		colorSet = arrayPick(colorSets);
		
		this.ctx.drawImage(this.getNoiseLayer(3, colorSet[0]), 0, 0);
		this.ctx.drawImage(this.getNoiseLayer(2, colorSet[1]), 0, 0);
		this.ctx.drawImage(this.getNoiseLayer(3, colorSet[2]), 0, 0);
	}
}
