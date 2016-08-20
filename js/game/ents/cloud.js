class Cloud extends Sprite {

  constructor(g, o = {}) {
    o.w = 16;
    o.h = 16;
    o.group = 'cloud';
    o.collidesWith = 'baddie';
    o.frames = 3;
    o.scale = 4;
    o.vx = 4,
    o.vy = 4;
    o.i = 'cloud';
    super(g, o); 
    this.dir = 1;
    this.changeDir = 30;
    this.drop = 20;
    this.lightning = 0;
    this.hasShocked = 0;

    this.x = g.w/2 - ( this.w / 2 );


  }

  init() {
    this.anims = {
      idle: { frames: [1], rate: 100 },
      laugh: { frames: [1,2], rate: 100 },
      burp: { frames: [2], rate: 50, next: 'idle' },
      rage: { frames: [3], rate: 100, next: 'idle' }
    };
    this.changeAnim('idle');


  }



  update() {


    if (this.p.gameOver) {
      if (this.x < this.g.player.x - ( this.w / 2 ) + 5) {
        this.x += 1;
      } else if (this.x > this.g.player.x - ( this.w / 2 ) + 5) {
        this.x -= 1;
      } else if (this.lightning === 0 && !this.hasShocked) {
        this.g.lightning = this.g.ents.push(new Lightning(this.g, {x: this.x , y: this.y + this.h - 0}));
        this.lightning = 80;
        this.hasShocked = true;
        this.g.shake.start(50, 30);
        this.g.player.changeAnim('fry');
      } else if (this.lightning  === 0 && this.hasShocked) {
        if (this.g.player.dead === false) {
          this.changeAnim('laugh');
          this.g.player.kill();
        }
      } else {
        this.lightning -= 1;

      }

      return;
    }

    if (this.p.spilt || this.p.inWave < 0) {
      return;
    }

    if (this.x <= 0) {
        this.dir = 1;
    }
    else if (this.x >= (this.g.w - this.w)) {
        this.dir = -1;
    }

    if (this.changeDir <= 0) {
      this.vx = ~~(Math.random() * 4) + this.p.wave;
      this.dir = this.dir * -1;
      this.changeDir = ~~(Math.random() * (this.g.w - this.w) / 2);
    }

    if (this.drop <= 0) {
      this.drop = $.H.rnd(15,30);
      this.p.doDrop();
    }

    this.x += (this.dir * this.vx );

    this.updateAnim();
    this.changeDir--;
    this.drop--;

  }


  render() {
    super.render();
  }


}
