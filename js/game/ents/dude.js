class Dude extends Sprite {
  constructor(g, o) {
    o.col = $.cols.nightblue;
    o.group = 'player';
    o.baseScale = o.scale;
    o.speed = -200;
    o.jumping = false;
    o.vx = 0;
    o.vy = 0;
    o.vz = 0;
    o.z = 0;
    o.i = 'dude';
    o.frames = 2;
    o.scale = 4;
    super(g, o);
    this.x = g.w / 2 - (this.w / 2);
    this.y = g.h - 100;
    this.baseY = this.y;
    this.press = false;
    this.lastPress = false;
    this.sinceLastPress = 0;

    this.gravity = 1200;
    this.canJump = true;
    this.jumping = false;
    this.jump = -700;
    this.vy = 0;
    this.nextRipple = 0;
    this.rippleFreq = 0.1;
    this.o = o;

    this.angle = 4.7;

    this.img = o.i
    this.bonuses = [];

    this.shadow = g.draw.scale(this.g.imgs['shadow'], this.scale);

    this.flipper = 0;
    this.lastVx = this.vx;
    this.invincible = 0;
  }

  init() {
    this.anims = {
      swim: { frames: [1,2], rate: 100 },
    };
    this.changeAnim('swim');

  }

  updateMove(step) {

    this.nextRipple += step;
    this.invincible -= step;

    this.press = ( this.g.input.m.click ||
                  this.g.input.keys.shoot || 
                  this.g.input.keys.enter ) ? true : false;

    if (!this.jumping && this.press && !this.lastPress) {
      if (this.canJump && this.sinceLastPress <= 5) {
        this.g.audio.play('jump');
        this.vy = this.jump;
        this.jumping = true;
      } else {
        this.g.emitter.particle($.H.rnd(1,3), this.x + (this.w / 2), this.y + (this.h / 2),
            ['blind']);
        this.g.audio.play('tap');
        this.vx = (this.vx === 0)
          ? this.speed : this.vx * -1;
      }
      this.sinceLastPress = 0;
    }

    this.angle += this.vx / 20;
    if (this.angle > 5.3) {
      this.angle = 5.3;
    }
    if (this.angle < 4.1) {
      this.angle = 4.1;
    }

    this.lastPress = this.press;

    if (this.x <= 0 || this.x >= this.g.w - this.w) {
      this.vx * -1;
    } 
 
    if (!this.press) {
      this.sinceLastPress += 1;
    }

    let vx = this.vx;
    if (this.jumping) {
      vx = 0;
    }


    this.x += vx * step;
    this.y += this.vy * step; 

    this.vy += this.gravity * step;

    if (!this.jumping) {
      this.hitMap = this.p.map.checkEnt(this);
      this.mapCollision(this.hitMap[0], 0, this.hitMap[2]);
      this.mapCollision(this.hitMap[1], 1, this.hitMap[2]);
    }


    if (this.y > this.baseY) {
      this.y = this.baseY;
      if (this.jumping) {
        this.g.audio.play('splash');
        this.g.emitter.particle(10, this.x + (this.w / 2), this.y + (this.h / 2),
            ['blind']);
        this.g.ents.push(new Explosion(this.g, {x: this.x + 20, 
          y: this.y + 10,
          p: this,
          track: 1,
          vy: 100,
          magnitude: 18, white: true, opacity: 0.5}));
      }
      this.jumping = false;
      this.scale = 4;

    }


    if (this.jumping) {
      this.scale = ~~(( this.baseY - this.y ) / 15);
      if  (this.scale < this.o.scale) {
        this.scale = this.o.scale;
      }
    }

    
    if (this.x < 0) {
      this.x= 0;
    } else if (this.x > (this.g.w - this.w)) {
      this.x= this.g.w - this.w;
    }

    if ( !this.jumping && !this.g.ios && this.nextRipple > this.rippleFreq) {
      this.nextRipple = 0;
      this.p.ripples.push(new Ripple(this.g, {x: this.x + (this.w / 1), 
          y: this.y + (this.h / 2),
          p: this.p}));
    }

    this.flipper = Math.sin(new Date().getTime() * 0.02);

    this.lastVx = this.vx;
    if (this.jumping) {
      this.mkImg('dudejump');
    } else {
      if (this.flipper > 0) {
        this.mkImg('dude0');
      } else {
        this.mkImg('dude1');
      }
    }

  }

  render() {
    if (this.jumping) {
      this.g.ctx.globalAlpha = 0.05;
      this.g.ctx.drawImage(this.shadow, this.x, this.baseY);
      this.g.ctx.globalAlpha = 1;
    } 

    let i = super.rotate( this.invincible > 0 ? this.iHurt : this.i, this.angle );
    this.g.ctx.drawImage(i, ~~this.x, ~~this.y);

  }

  kill(coords) {
    if (this.jumping) {
      return;
    }

    this.g.audio.play('die');
    this.g.ents.push(new Explosion(this.g, {i: 'ouch', x: this.x, y: this.baseY}));

    this.g.shake.start(50, 30);

    this.g.emitter.particle(40, this.x, this.baseY,
        ['oldpoop', 'newpoop']);
    super.kill();
  }


  mapCollision(val, offset, coords) {

    let destroy = false, i;
    coords[0] = coords[0] + offset;

    switch (val) {

      case 1:
      case 2:
        this.x += (offset === 0) ? this.scale : -this.scale;
        this.vx *= -1;
        this.g.audio.play('tap');
      break;


      case 3:
        if (this.invincible < 0) {
          this.kill();
        } else {
          this.g.emitter.particle(40, this.x + 20, this.baseY,
              ['oldpoop', 'newpoop']);
          this.g.audio.play('zap');
        }
        destroy = true;
      break;

      case 4:
        destroy = true;
      break;

      case 5:
        destroy = true;
      break;

      case 6:
        destroy = true;
      break;
      
      default:
      break;
    }

    if (destroy) {
      if (val == 4) {
        i = 'cherry';
      } else if (val == 5) {
        i = 'orange';
      } else if (val == 6) {
        i = 'melon';
      }

      if (val === 3) {
      } else {
        this.bonuses.push(i);
        if (this.bonuses.length > 3) {
          this.bonuses.shift();
        }
        
        this.g.audio.play('coin');
        this.g.ents.push(new Text(this.g, {x: this.x, y: this.baseY, i: i, vx: 100, accel: 10}));
      }

      this.p.map.data[this.p.map.data.length - coords[1]][coords[0]] = 0;
    }
  }

    receiveDamage(o) {
  }



}

