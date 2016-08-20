class Ripple extends Sprite {


  constructor(g, o){

    let i;

    o.i = 'ripple';
    o.scale = 2;
    o.opacity = 0.7;
    o.vy = 100;

    super(g, o);

    

  }


  update(step) {
    this.scale += 0.2;
    this.y += this.p.speed * step;
    this.mkImg('ripple');
    this.opacity -= 0.02;
    if (this.opacity < 0) {
      this.kill();
    }
  }

  render() {
    this.g.ctx.globalAlpha = this.opacity;
    this.g.ctx.drawImage(this.iHurt, this.x - (this.w / 2), this.y - (this.h / 2));
    this.g.ctx.globalAlpha = 1;
  }

}
