class Drop extends Sprite {

  constructor(g, o) {
    o.vx = 0;
    o.vy = 0;
    o.gravity = 0.1,
    o.scale = 3;
    o.i = 'drop';
    o.group = 'baddie';
    super(g, o);
    this.name = 'drop';

  }

  updateMove() {

    let dt = this.g.dt/ 1000;

    if (this.p.spilt) {
      return true;
    }

    this.x += this.vx * dt; 
    this.y += this.vy * dt; 

    this.vy += this.gravity * dt;

    if (this.y > ( this.p.floor + 4 ) || this.p.gameOver) {
      this.dead = true;
      this.g.audio.play('drip');
      this.g.shake.start(30, 20);
      this.explode();
      this.p.doSpill();
    }

  }


  explode() {
      this.kill();
      this.g.cloud.changeAnim('rage');
      this.g.emitter.particle(5, this.x + (this.w / 2), this.y + (this.h / 2),
          ['blaze']);
  }


  receiveDamage(o) {

    let sfx = 'drink';
    this.kill();
    this.g.audio.play(sfx);
    this.g.score += 1;
    this.g.player.changeAnim('gulp');

    if (!this.g.ios) {
      this.g.ents.push(new Bonus(this.g, {
        x: this.x, y: this.y
      }));
    }

  } 


  kill() {
    this.p.inWave -= 1;
    super.kill();
  }


};
