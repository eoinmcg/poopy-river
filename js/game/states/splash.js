class Splash extends State {


  init() {
// var B,W,t,e,W,s,u;
// B="RIFFfor(WAVEfmt "+atob("EAAAAAEAAQAcRwAAHEcAAAEACABkYXRh");	// 18204 Hz, 8-bit single channel 
// 																// to match original tempo and have a
// for(W=t=e=0;4e5>W;) {											// power of 2 as the base note length
// 
// 	s = ((u=W&4095)&(u+1<<18+(W>>10&6))/u&255)/(u>>8)&112;		// Drumloop derived from work by mu6k
// 																// see http://www.pouet.net/topic.php?which=8357&page=19
// 																
// 																// Oscillator for sawtooth lead instrument
// 																// When iterating beyond the array bounds, ~~ coerces NaN to 0
// 	e+=~~"BchXNXBchBchXNX>]cJSXJSXJSXJSNJSXJSXJSXXSNJSXcXSNJSXXSNJSXJSXJNJ".charCodeAt(W++>>11)/64;
// 	B+=String.fromCharCode((s+e|3*e)&255);						// Combine drumloop and lead, | with 3*e adds depth
// }
// new Audio("data:audio/wav;base64,"+btoa(B)).play();				// Wish there was a way to get rid of base64 here

    this.tick = 1000;

    this.bgCol = $.cols.black;
    this.p = this.g.mkFont('w', 5);
    this.p2 = this.g.mkFont('w', 3);
    this.skull = this.g.ents.push(new Skull(this.g, { }));

    var fs = document.getElementById('fs');
    fs.style.display = 'block';
    // fs.addEventListener('click', function(){
    //     $.H.toggleFullScreen();
    //     this.g.scale();
    // });
    fs.addEventListener('click',() => {
        $.H.toggleFullScreen();
        setTimeout(() => { this.g.scale(); }, 100);
    });


  }

  update() {

      super.update();
      this.tick -= 1;
      //
      if (this.tick < 0 || (this.g.input.m.click || this.g.input.keys.enter)) {
        this.g.input.keys.enter = false;
        this.g.changeState('Title');
      }

  }


  render() {
    
    super.render();
    this.g.draw.text('EOINMCG', this.p, false, 145);
    this.g.draw.text('PRESENTS', this.p2, false, 300);
  }



}


class Skull extends Sprite {

  constructor(g, o) {
    o.vx = 0;
    o.vy = 0;
    o.scale = 1;
    o.i = 'skull';
    o.group = 'baddie';
    super(g, o);
    this.growRate = 1;
    this.grow = this.growRate;
    this.maxSize = 7;
  
  }


  update() {
    this.grow -= 1;
    if (this.grow < 0 && this.scale <= 10) {
      this.grow = this.growRate;
      this.scale += 1;
      this.mkImg('skull');
      if (this.scale === 7) {
        // this.g.audio.play('powerup');
      }
      if (this.scale === 10) {
        this.g.audio.play('fart');
        this.g.shake.start(20, 10);
      }
    }


    this.x = this.g.w / 2 - (this.w / 2);
    this.y = this.g.h / 2 - (this.h / 2);

  }



};
