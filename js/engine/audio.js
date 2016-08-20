$.Audio = {
  init: function() {
  },

  play: function(sfx) {
    if ($.data.audio) {
      SoundFX[sfx]();
    }
  },

  say: function() {
    if ($.data.audio) {

    }
  }

};

