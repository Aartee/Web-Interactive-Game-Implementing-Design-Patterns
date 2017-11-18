//Modular Design Pttern
//Here Private members are kept in the closure.
//Public members are exposed in the return object.
//Like returning Entity object.
game.PlayScreen = me.ScreenObject.extend({
    init: function() {
        me.audio.play("theme", true);
        // lower audio volume on firefox browser
        var vol = me.device.ua.indexOf("Firefox") !== -1 ? 0.3 : 0.5;
        me.audio.setVolume(vol);
        this._super(me.ScreenObject, 'init');
    },

    onResetEvent: function() {
        me.game.reset();
        me.audio.stop("theme");
        if (!game.data.muted){
            me.audio.play("theme", true);
        }
        me.input.bindKey(me.input.KEY.SPACE, "fly", true);
        game.data.score = 0;
        game.data.steps = 0;
        game.data.start = false;
        game.data.newHiscore = false;

        me.game.world.addChild(new BackgroundLayer('bg', 1));

        this.ground1 = me.pool.pull('ground', 0, me.game.viewport.height - 96);
        this.ground2 = me.pool.pull('ground', me.game.viewport.width,
            me.game.viewport.height - 96);
        me.game.world.addChild(this.ground1, 11);
        me.game.world.addChild(this.ground2, 11);

        this.sky1 = me.pool.pull('sky', 0, 0);
        this.sky2 = me.pool.pull('sky', me.game.viewport.width, 0);
        me.game.world.addChild(this.sky1, 11);
        me.game.world.addChild(this.sky2, 11);

        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD, 11);

        this.bird = me.pool.pull("clumsy", 60, me.game.viewport.height/2 - 100);
        me.game.world.addChild(this.bird, 10);

        //inputs
        me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.SPACE);

        //logic of changing levels in the game
        if(game.data.steps <= 2){
            this.getReady = new me.Sprite(
            me.game.viewport.width/2,
            me.game.viewport.height/2,
            {image: 'getready'}
            );
            me.game.world.addChild(this.getReady, 11);

            this.level1();
            me.game.world.removeChild(this.getReady);

         }else if(game.data.steps > 2 && game.data.steps <= 20){
            this.level2 = new me.Sprite(
            me.game.viewport.width/2,
            me.game.viewport.height/2,
            {image: 'level2'}
            );
            me.game.world.addChild(this.level2, 11);

             this.level2();
             
             me.game.world.removeChild(this.level2, 11);
         }else{
             this.level3();
        }
    },

    level1: function() {

        //Decorator Design pattern which changes level of the game
        var fadeOut = new me.Tween(this.getReady).to({alpha: 0}, 2000)
            .easing(me.Tween.Easing.Linear.None)
            .onComplete(function() {
                game.data.start = true;
                // if(game.data.steps > 2){}
                me.game.world.addChild(new game.LoopGenerator(), 0);
                //me.game.world.removeChild(this.getReady);
            }).start();
    },

    level2: function(){

        var fadeOut = new me.Tween(this.getReady).to({alpha: 0}, 2000)
            .easing(me.Tween.Easing.Linear.None)
            .onComplete(function() {
                game.data.start = true;
                me.game.world.addChild(new game.LoopGenerator(), 0);
                me.game.world.removeChild(that.level2);
            }).stop();

        var fadeOut = new me.Tween(this.getReady).to({alpha: 0}, 2000)
            .easing(me.Tween.Easing.Linear.None)
            .onComplete(function() {
                game.data.start = true;
                me.game.world.addChild(new game.PipeGenerator(), 0);
                me.game.world.removeChild(that.level2);
            }).start();
    },

    level3: function(){
        var fadeOut = new me.Tween(this.getReady).to({alpha: 0}, 2000)
            .easing(me.Tween.Easing.Linear.None)
            .onComplete(function() {
                game.data.start = true;
                me.game.world.addChild(new game.LoopGenerator(), 0);
                me.game.world.removeChild(that.level2);
            }).start();

        var fadeOut = new me.Tween(this.getReady).to({alpha: 0}, 2000)
            .easing(me.Tween.Easing.Linear.None)
            .onComplete(function() {
                game.data.start = true;
                me.game.world.addChild(new game.PipeGenerator(), 0);
                me.game.world.removeChild(that.level2);
            }).start();
    },

    onDestroyEvent: function() {
        me.audio.stopTrack('theme');
        // free the stored instance
        this.HUD = null;
        this.bird = null;
        this.ground1 = null;
        this.ground2 = null;
        this.sky1 = null;
        this.sky2 = null;
        me.input.unbindKey(me.input.KEY.SPACE);
        me.input.unbindPointer(me.input.pointer.LEFT);
    }
});
