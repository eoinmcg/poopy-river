class Explosion extends Sprite {

  constructor(g, o){

    let i;

    o.i = o.i || 'boom';
    o.white = o.white || false;

    super(g, o);

    this.name = 'explosion';
    this.group = 'na';
    this.startX = o.x;
    this.startY = o.y;
    this.magnitude = o.magnitude || 16;
    this.factor = 1;
    this.p = o.p || false;

    this.angle = 0;
    this.grow = 1;
    this.opacity = o.opacity || 1;
    

  }


  update(step) {

    let g = this.g;

    if (this.scale <= this.magnitude) {
      this.scale += this.factor;
    }
    if (this.scale === this.magnitude) {
      this.factor *= -1;
    }
    if (this.scale <= 1) {
      this.remove = true;
    }

    this.mkImg(this.o.i);

  }


  render() {

    let x = this.startX - (this.w /2),
        y = this.y - (this.h / 2),
        g = this.g,
        i = (this.white) ? this.iHurt : this.i;

        // i = g.draw.rotate(this.i, this.angle);
    if (this.opacity < 1) {
      g.ctx.globalAlpha = this.opacity;
    }
    g.ctx.drawImage(i, x, y);
    // console.log(i.src, x, y);

    if (this.opacity < 1) {
      g.ctx.globalAlpha = 1;
    }
  }


}


