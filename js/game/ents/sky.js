class Sky {

  constructor(g, p) {
    this.g = g;
    this.p = p;

    this.cols = ['ash', 'blind'];
    this.changeStep = 10;
    this.change = 0;
    this.col = $.H.rndArray(this.cols);

  }


  update() {

    if (this.p.spilt) {
      this.change -= 1;

      if (this.change <= 0) {
        this.change = this.changeStep;
        this.col = $.H.rndArray(this.cols);
      }
    }

  }

  render() {
    if (this.p.spilt) {
      this.g.draw.clear($.cols[this.col]);
    } else if (this.g.player.dead) {
      this.g.draw.clear($.cols.black);
    } else if (this.p.gameOver) {
      this.g.draw.clear($.cols.ash);
    }
  }



};
