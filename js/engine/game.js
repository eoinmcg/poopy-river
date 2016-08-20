class Game {

  constructor() {

    let ua = navigator.userAgent.toLowerCase(),
        w, h;

    this.l = document.getElementById('l');
    this.h = document.getElementById('h');

    if ($.data.orientation === 'portrait') {
      w = 320, h = 480;
    } else {
      w = 480, h = 320;
    }

    this.c = document.getElementsByTagName('canvas')[0];
    this.ctx = this.c.getContext('2d');
    this.w = w;
    this.h = h;
    this.c.width = w;
    this.c.height = h;
    this.c.style.width = w + 'px';
    this.c.style.height = h + 'px';

    // this.dt = 0;
    // this.tick = 0;
    // this.prevStep = new Date().getTime();
    // this.currStep = new Date().getTime();
		this.dt   = 0;
		this.fps  = 30;
		this.frameStep = 1/ this.fps;
		this.frameCurr = 0;
		this.framePrev = $.H.timeStamp();

		this.mobile = 'createTouch' in document || false;
    this.android = ua.indexOf('android') > -1;
    this.ios = /ipad|iphone|ipod/.test(ua);
    this.firefox = ua.indexOf('firefox') > -1;

    this.restrict = (this.firefox || this.ios) ? true : false;
    this.restrict = false;

    this.plays = 0;



    this.events = [];
    this.ents = [];
    this.imgs = [];
    this.fonts = [];
    this.sfx = [];

    document.title = $.data.title;

    this.load();

  }


  load() {

    this.draw = new Draw(this.ctx, this.w, this.h);
    this.input = new Input(this);
    this.emitter = new Emitter(this);
    this.shake = new Shake(this);

    if (!$.data.audio || ( this.mobile &&  this.firefox ) || this.ios) {
      this.audio = { play: function() {}, say: function() {} };
    } else {
      // this.audio = new $.Audio($.data.sfx);
      this.audio = $.Audio;
      this.audio.init();
    }

    this.load = new Load(this);


  }


  init() {

    this.scale();

    $.H.mkFavicon(this.draw.scale(this.imgs.dudejump, 4));
    this.changeState('Title');

    if (typeof Stats !== 'undefined' && window.location.search.indexOf('stats') !== -1) {
      this.stats = new Stats();
      this.stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
      document.body.appendChild( this.stats.dom );
    } else {
      this.stats = {begin: function() {}, end: function() {}};
    }

    this.loop();


    window.addEventListener('resize', 
      () => this.scale(), 
      false);

  }

  loop() {

    // // if (document.hasFocus()) {
    //   this.stats.begin();
    //   this.currStep = new Date().getTime();
    //   this.dt = this.currStep - this.prevStep;
    //   // this.tick += 1;
    //   this.c.className = '';
    //   this.input.poll();


    //   this.shake.update();
    //   this.state.update();
    //   this.state.render();

    //   this.prevStep $.H this.currStep;
    //   this.stats.end();

    //   requestAnimationFrame(() => this.loop());

    this.stats.begin();
		this.frameCurr = $.H.timeStamp();
		this.dt = this.dt + Math.min(1, (this.frameCurr - this.framePrev) / 1000);
    this.c.className = '';
    this.input.poll();

		while(this.dt > this.frameStep) {
			this.dt = this.dt - this.frameStep;
			this.state.update(this.frameStep);
		}

    this.shake.update(this.dt);
		this.state.render(this.dt);

		this.framePrev = this.frameCurr;
    this.stats.end();

    requestAnimationFrame(() => this.loop());

  }

  update(step) {

    for (let n of this.ents) {
      console.log('ok');
      n.update(step);
    }

  }

  render() {

    this.draw.clear();




    this.draw.rect(100, 100, 100, 100, 'pink');
    for (let n of this.ents) {
      n.render();
    }

  }

  scale() {


    if ($.data.orientation === 'portrait') {
      this.scalePortrait();
    } else {
      this.scaleLandscape();
    }

  }

  scalePortrait() {
    let winH = window.innerHeight,
        ratio = this.w / this.h,
        w2 = winH * ratio,
        scale = w2 / this.w;

      if (this.mobile && winH < window.innerWidth) {
          this.l.style.display = 'block';
          $.H.el('h').innerHTML = 'Rotate Device';
          this.c.style.display = 'none';
      } else {
          this.l.style.display = 'none';
          this.c.style.display = 'block';
      }

    if (window.navigator.standalone == true && this.ios) {
      return;
    }

    this.c.width = this.w;
    this.c.height = this.h;

    this.cx = this.w / 2;
    this.cy = this.h / 2;

    this.c.style.width = ~~(w2)+ 'px';
    this.c.style.height = ~~(winH) + 'px';
  }


  scaleLandscape() { }

  changeState(state) {

    this.ents = [];
    this.events = [];

    switch (state) {

      case 'Touch':
        this.state = new Touch(this);
      break;

      case 'Title':
        this.state = new Title(this);
      break;

      case 'Intro':
        this.state = new Intro(this);
      break;

      case 'Splash':
        this.state = new Splash(this);
      break;

      case 'Play':
        this.state = new Play(this);
      break;

      default:
      break;
    }

  }

  mkFont(col, scale) {
    let g = this,
        f = g.draw.scale(g.fonts[col], scale);

    f.scale = scale;
    return f;
  };

  addEvent(e) {
    this.events.push(e); 
  }


}
