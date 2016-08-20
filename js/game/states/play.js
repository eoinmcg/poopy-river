class Play extends State {

  init() {


    this.bgCol = false;
    this.ripples = [];
    this.score = 0;
    this.hiScore = parseInt( localStorage.getItem('hiScore'), 10 ) || 20;
    this.newHi = false;

    this.h1 = this.g.mkFont('o', 7);
    this.timer = this.g.mkFont('w', 8);
    this.p = this.g.mkFont('r', 8);
    this.pw = this.g.mkFont('w', 8);
    this.hi = this.g.mkFont('w', 3);
    this.hi_s = this.g.mkFont('p', 3);

    this.dude = new Dude(this.g, {
      p: this,
    });
    this.map = new Map(this.g, {p: this});

    this.g.ents.push(this.dude);
    this.g.input.m.lastClick = false;
    this.lastPress = false;
    this._speed = 200;
    this.speed = 200;
    this.maxSpeed = 400;

    this.gameOver = false;

    this.fruits = {
        'cherry': this.g.draw.scale(this.g.imgs['cherry'], 3),
        'melon': this.g.draw.scale(this.g.imgs['melon'], 3),
        'orange': this.g.draw.scale(this.g.imgs['orange'], 3)
    };

  }

  update(step)  {


    let i = this.ripples.length;

    for (let n of this.ripples) {
      n.update(step);
    }

    while (i--) {
          if (this.ripples[i].remove) {
              this.ripples.splice(i, 1);
          }
    }
    
    super.update(step);
    this.map.update(step);
    if (this.dude.dead) {
      this.speed = 0;
    } else {
      this.score += 0.1;
    }

    if (this.dude.dead && !this.gameOver) {
      this.gameOverSequence();
    }


    if (!this.gameOver) {
      this._speed += 0.5;
      this.speed = ~~(this._speed);
      if (this.speed > this.maxSpeed) {
        this.speed = this.maxSpeed;
      }
    }

    if (this.dude.bonuses.length === 3 ) {
        let match = !!this.dude.bonuses.reduce(function(a, b){ return (a === b) ? a : NaN; });
        if (match) {
          this.dude.bonuses = [];
          this.dude.invincible = 5; 

          this.g.ents.push(new Text(this.g, {x: false, y: this.g.h - 200, text: 'INVINCIBILTY', col: 'r', vy: -200}));
          console.log('CCCCOMBO!', match);
        }
    }

    if (this.score > this.hiScore) {
      if (!this.newHi) {
          this.g.ents.push(new Text(this.g, {x: false, y: this.g.h, text: 'NEW HISCORE', col: 'p', vy: -150, accel: 5}));
      }
      this.newHi = true;
      this.hiScore = this.score;
    }

  }

  render()  {

    let i = 0;
    
    this.g.draw.clear($.cols.cloudblue);
    for (let n of this.ripples) {
      n.render();
    }
    this.map.render();


    super.render();
    if (!this.dude.dead) {
      this.dude.render();
    }

    this.g.draw.rect(0, 0, this.g.w, 35, $.cols.nightblue);
    this.g.ctx.globalAlpha = 0.3;
    this.g.draw.rect(0, 0, this.g.w, 40, $.cols.nightblue);
    this.g.ctx.globalAlpha = 1;
    // this.g.draw.rect(0, 0, this.g.w, 45, $.cols.nightblue);
    for (i = 0; i < this.dude.bonuses.length; i += 1) {
      // console.log(this.dude.bonuses[i], this.fruits[this.dude.bonuses[i]]);
      this.g.ctx.drawImage(this.fruits[this.dude.bonuses[i]], 120 + (i * 40), 5);
    }

    this.g.draw.text(Math.floor(this.score), this.hi, 10, 10);
    this.g.draw.text(Math.floor(this.hiScore), this.hi_s, this.g.w - 50, 10);

    if (this.dude.invincible > 0) {
      this.g.draw.text(Math.ceil(this.dude.invincible), this.timer, this.g.w / 2 - 15, 50);
    }

    if (this.gameOver && this.fader > 0) {
      this.g.draw.text('GAME OVER', this.p, 20, 100, { f: this.pw, offset: 4});
    }

  }


  gameOverSequence() {
    this.gameOver = true; 

    if (this.newHi) {
      localStorage.setItem('hiScore', this.score); 
      // alert('new Hi!');
    }

    this.g.addEvent({
      time: 0.20,
      cb: () => {
        this.startButton = this.g.ents.push(new Button(this.g, {
          y: 320,
          triggerOnEnter: true,
          col: $.cols.newpoop,
          state: 'Play',
          text: 'RETRY',
          cb: () => { 
            this.g.audio.play('tap');
            this.g.changeState('Play');
            }
        }));
        this.quitButton = this.g.ents.push(new Button(this.g, {
          y: 400,
          col: $.cols.skyblue,
          state: 'Title',
          text: 'TWEET',
          cb: () => { 

            window.location = 'https://twitter.com/intent/tweet?&text=I+swam+'+~~( this.score )+'m+then+ate+poop,+playing+Poopy+River&via=eoinmcg&url=https%3A%2F%2Feoinmcg.github.io%2FPoopy'; }
        }));
      }
    });
  }



}
