class Mascot extends Sprite {

  constructor(g, o) {
    o.group = 'mascot';
    o.frames = 3;
    o.scale = 8;
    o.vx = 0,
    o.vy = 0;
    o.i = 'fish';
    super(g, o);
    this.x = this.g.w / 2 - (this.w / 2);
    let h = 20;
    this.bound = {
      x: h, y: h, w: this.w - h * 2, h: this.h - h * 2
    }
  }

  init() {
    this.anims = {
      swim: { frames: [1,2,3,2], rate: 100 }
    };
    this.changeAnim('swim');


  }


}

