class Emitter {


  constructor(g) {
    this.g = g;
  }


  particle(p, x, y, cols = ['ash']) {
  
    let g = this.g, i;


    for (i = 0; i < p; i+= 1) {
        let col = $.H.rndArray(cols);
        g.ents.push(new Particle(g, {
          x: x, y: y, col: col }
        ));
    }
      

  };

    explosion(num, x, y, particles, magnitude) {

      let g = this.g,
          r = $.H.rnd;


      while (num--) {
        window.setTimeout(function() {
          g.ents.push(new Explosion(g, {
            x: x + r(-10, 10), y: y + r(-10, 10),
            magnitude: magnitude,
            particles: particles
          }));
        }, num * 150);
      }
    };


}
