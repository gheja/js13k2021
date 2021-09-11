class Music
{
	baseNote: number;
	notesPlayed: number;
	
	constructor()
	{
		this.baseNote = 128;
		this.notesPlayed = 0;
	}
	
	soundDrag(n)
	{
		zzfx(1,0,getNoteFrequency(128 + n * 4),.01,.02,.09,1,.5,-0.1,0,0,0,0,0,0,0,.12,.5,.02,0); // Blip 123
	}
	
	soundDestroyed()
	{
		zzfx(1.24,.15,132,.1,0,.4,4,2.5,0,0,0,0,0,0,0,1,.24,.37,0,0); // Random 189
	}
	
	soundWin()
	{
		zzfx(1,0,300,.1,.3,.1,0,1.61,0,0,286,.06,.18,0,0,0,0,.4,.1,.09); // Powerup 458
	}
	
	nextNote()
	{
		// major chord triad: 0, +4, +7
		// minor chord triad: 0, +3, +7
		// diminished chord triad: 0, +3, +6
		
		// this needs a lot of work
		
/*		
		let a;
		// zzfx(1.85,0,65.40639 + (this.notesPlayed % 20) * 4,1.5,.04,3,0,1.5,0,0,0,0,0,0,0,.1,.17,.99,.01,0); // Music 112
		
		// zzfx(...[1.9,0,
		// 	getnotefreq(this.baseNote + arrayPick([0,4,7])),
		// 	.16,.7,1.5,1,1.1,,,,,.38,,,,.14,.8,.06,.12]); // Music 38
		
		// zzfx(...[2.5,0,
		// 	getnotefreq(this.baseNote + arrayPick([0,4,7])),
		// ,.02,1.58,.5,2,1.99,,,,,.07,.3,,,.05,.55,.31,.27]); // Music 31
		
		// zzfx(...[,0,
		// 	getnotefreq(this.baseNote + arrayPick([0,4,7])),
		// ,.04,,.2,,2.2,,.2,,,,,,,.1,.7,.08]); // Music 111
		
		a = [0,4,7,4,0,4,7,0];
		
		// zzfx(1,0,
		// 	getnotefreq(this.baseNote + a[this.notesPlayed % 3]),
		// 	.8,0,3.5,1,1.1,0,0,0,0,.38,0,0,0,.14,.8,.06,.12); // Music 38
		
		// zzfx(1,0,
		// 	getnotefreq(this.baseNote + a[this.notesPlayed % 8]),
		// 	.8,0,3.5,1,1.1,0,0,0,0,.38,0,0,0,.14,.8,.06,.12); // Music 38
		// 
		// zzfx(1,0,
		// 	getnotefreq(this.baseNote + a[this.notesPlayed % 8] + 4),
		// 	.5,0,3.5,1,1.1,0,0,0,0,.38,0,0,0,.14,.8,.06,.12); // Music 38
		// 
		// zzfx(1,0,
		// 	getnotefreq(this.baseNote + a[this.notesPlayed % 8] + 7),
		// 	.2,0,3.5,1,1.1,0,0,0,0,.38,0,0,0,.14,.8,.06,.12); // Music 38
		
		zzfx(.3,0,
			getnotefreq(this.baseNote + a[this.notesPlayed % 8]),
			.5,0,2.5,0,.9,0,0,0,0,.2,.1,.002,0,0,1,.06,.1); // Music 38
		
		// zzfx(.1,0,
		// 	getnotefreq(this.baseNote + a[this.notesPlayed % 8] + 4),
		// 	.15,0,2.5,0,.9,0,0,0,0,.2,.1,.002,0,0,1,.06,.1); // Music 38
		// 
		// zzfx(.1,0,
		// 	getnotefreq(this.baseNote + a[this.notesPlayed % 8] + 7),
		// 	.15,0,2.5,0,.9,0,0,0,0,.2,.1,.002,0,0,1,.06,.1); // Music 38
		
		this.notesPlayed++;
		
		if (this.notesPlayed % 8 == 0)
		{
			this.baseNote = 128 + Math.floor((Math.random() - 0.5) * 12);
		}
*/
	}
	
	start()
	{
/*
		window.setInterval(this.nextNote.bind(this), 2000);
*/
	}
}