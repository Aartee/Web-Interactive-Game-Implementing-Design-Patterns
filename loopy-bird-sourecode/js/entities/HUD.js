game.HUD = game.HUD || {};

game.HUD.Container = me.Container.extend({
    init: function() {
        this._super(me.Container, 'init');
        // persistent across level change
        this.isPersistent = true;

        // non collidable
        this.collidable = false;

        // make sure our object is always draw first
        this.z = Infinity;

        // give a name
        this.name = "HUD";

        // add our child score object at the top left corner
        this.addChild(new game.HUD.ScoreItem(5, 5));
        this.addChild(new game.HUD.PauseButton(5,5));
    },
    update: function(){
        if (me.input.isKeyPressed("pause")) {
            var a;
            me.Renderable.extend()
            if(me.state.isRunning())
            {
                me.audio.pause("theme");
                a= me.game.world.addChild(new game.PauseScreen());
                me.state.pause();
            }
            var resume_loop = setInterval(function resume() {
            if (me.input.isKeyPressed("pause")) {
                clearInterval(resume_loop);
                if(me.state.isPaused())
                {
                    me.audio.play("theme");
                    me.state.resume();
                    me.game.world.removeChild(a);
                }
            }   
            },100); //end resume loop
        }
        // toggle fullscreen on/off
        if (me.input.isKeyPressed("toggleFullscreen")) {
            if (!me.device.isFullscreen) {
                me.device.requestFullscreen();
            } else {
                me.device.exitFullscreen();
            }
        }
        return true;
    }
});


game.HUD.ScoreItem = me.Renderable.extend({
    init: function(x, y) {
        this._super(me.Renderable, "init", [x, y, 10, 10]);

        // local copy of the global score
        this.stepsFont = new me.Font('gamefont', 80, '#000', 'center');

        // make sure we use screen coordinates
        this.floating = true;
    },

    draw: function (renderer) {
        if (game.data.start && me.state.isCurrent(me.state.PLAY))
            this.stepsFont.draw(renderer, game.data.steps, me.game.viewport.width/2, 10);
    }

});

var BackgroundLayer = me.ImageLayer.extend({
    init: function(image, z, speed) {
        var settings = {};
        settings.name = image;
        settings.width = 900;
        settings.height = 600;
        settings.image = image;
        settings.z = z;
        settings.ratio = 1;
        // call parent constructor
        this._super(me.ImageLayer, 'init', [0, 0, settings]);
    },

    update: function() {
        if (me.input.isKeyPressed('mute')) {
            game.data.muted = !game.data.muted;
            if (game.data.muted){
                me.audio.disable();
            }else{
                me.audio.enable();
            }
        }
        return true;
    }
});

// create a basic GUI Object
game.HUD.PauseButton = me.GUI_Object.extend(
{
   init:function (x, y)
   {
      var settings = {}
      settings.image = "pause";
      settings.framewidth = 64;
      settings.frameheight = 64;
      // super constructor
      this._super(me.GUI_Object, "init", [30,30,settings]);
      // define the object z order
      this.pos.z = 4;
      var b;
   },

   // output something in the console
   // when the object is clicked
   onClick:function (event)
   {
      // don't propagate the event
      
      if(me.state.isPaused())
        {
            me.state.resume();
            me.audio.play("theme");
            me.game.world.removeChild(b);
            me.input.bindPointer(me.input.KEY.S);
        }
      else if(me.state.isRunning())
        {
            me.state.pause();
            me.audio.pause("theme");
            b= me.game.world.addChild(new game.PauseScreen());
            me.input.bindPointer(me.input.KEY.S);
        }
    return false;
   }
});
