class Lightning extends Sprite {

  constructor(g, o = {}) {
    o.vx = 0;
    o.vy = 0;
    o.scale = 13;
    o.i = 'lightning';
    o.name = o.i;
    super(g, o);
    this.invert = $.H.rnd(30, 50);

    this.g.audio.play('explode');
  }


  update() {
    this.invert--;

    if (this.invert === 0) {
      this.flip.x = (this.flip.x === 0) ? 1 : 0;
      this.invert = $.H.rnd(30, 50);
    }

    if (this.g.player.dead) {
      this.kill();
    }

    super.update();
  }

}
