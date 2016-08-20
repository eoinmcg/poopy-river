class Title extends State {


  init() {


    if (!this.g.hiScore) {
      this.g.hiScore = 20;
    }

    this.bgCol = $.cols.oldpoop;

    this.title = this.g.mkFont('o', 9);
    this.titleShadow = this.g.mkFont('o', 9);
    this.hi = this.g.mkFont('w', 3);
    this.sm = this.g.mkFont('w', 2);

    this.g.audio.play('fart');


    this.g.ents.push(new Button(this.g, {
      y: 380,
      triggerOnEnter: true,
      col: $.cols.newpoop,
      text: 'PLAY',
      cb: () => { 
        this.g.changeState('Play');
        }
    }));
    this.g.ents.push(new Button(this.g, {
      y: 450,
      size: 2,
      clickCol: 'transparent',
      col: 'transparent',
      text: 'BY EOINMCG',
      cb: () => { 
          window.location = '//twitter.com/eoinmcg';
        }
    }));




    // this.bubble();

  }


  render()  {
    
    this.g.draw.clear(this.bgCol);

    this.g.ctx.globalAlpha = 0.3;
    // this.g.draw.rect(0, 250, 320, 330, $.cols.seablue);
    this.g.ctx.globalAlpha = 1;


    this.g.draw.text('POOPY', this.title, false, 80, {f: this.titleShadow, offset: 2});
    this.g.draw.text('RIVER', this.title, false, 140, {f: this.titleShadow, offset: 2});

    for (let n of this.g.ents) {
      n.render();
    }


  }



}

