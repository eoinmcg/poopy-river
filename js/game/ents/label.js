class Label extends Sprite {


  constructor(g, o = {}) {
    super(g, o);
    this.h1 = this.g.mkFont('w', 5);
    this.p = this.g.mkFont('r', 3);
    this.w = 150;
    this.h = 120;
    this.destX = 85;
    this.distX = 0;
    this.x = -10;
    this.y = 220;
    this.vx = 1;
  }

  update() {
		this.distX = this.destX - this.x;

    this.x = $.H.tween(33, this.x, this.distX, this.speed);
  }


  render() {
    this.g.draw.rect(this.x, this.y, 150, 120, $.cols.black);
    this.g.draw.text('WHISKEY', this.h1, this.x + 8, this.y + 30);
    this.g.draw.text('F E V E R', this.p, this.x + 18, this.y + 70);
  }

}
