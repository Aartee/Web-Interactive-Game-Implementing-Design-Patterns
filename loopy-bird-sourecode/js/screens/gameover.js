//Modular Design Pttern
//Here Private members are kept in the closure.
//Public members are exposed in the return object.
//Like returning Entity object.
game.GameOverScreen = me.ScreenObject.extend({
    init: function() {
        this.savedData = null;
        this.handler = null;
    },

    onResetEvent: function() {
        //save section
        this.savedData = {
            score: game.data.score,
            steps: game.data.steps
        };
        me.save.add(this.savedData);
        //Proxy Design Patterns
        //The steps and the score are stored in cache memory. Here me.save act as a proxy object
        //and saves the data for future use.
        game.data.newHiScore = false;
        if (!me.save.topSteps) me.save.add({topSteps: game.data.steps});
        if (game.data.steps > me.save.topSteps) {
            me.save.topSteps = game.data.steps;
            //Observer Pattern to notify user of new hi score
            game.data.newHiScore = true;
        }
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
        me.input.bindKey(me.input.KEY.SPACE, "enter", false)
        me.input.bindPointer(me.input.pointer.LEFT, me.input.KEY.ENTER);

        this.handler = me.event.subscribe(me.event.KEYDOWN,
            function (action, keyCode, edge) {
                //State Design Pattern
                //Changes behavior as its state changes(Now the state is MENU).
                if (action === "enter") {
                    me.state.change(me.state.MENU);
                }
            });

        me.game.world.addChild(new me.Sprite(
            me.game.viewport.width/2,
            me.game.viewport.height/2 - 100,
            {image: 'gameover'}
        ), 12);

        var gameOverBG = new me.Sprite(
            me.game.viewport.width/2,
            me.game.viewport.height/2,
            {image: 'gameoverbg'}
        );
        me.game.world.addChild(gameOverBG, 10);

        me.game.world.addChild(new BackgroundLayer('bg', 1));

        // ground
        this.ground1 = me.pool.pull('ground', 0, me.game.viewport.height - 96);
        this.ground2 = me.pool.pull('ground', me.game.viewport.width,
            me.video.renderer.getHeight() - 96);
        me.game.world.addChild(this.ground1, 11);
        me.game.world.addChild(this.ground2, 11);

        this.sky1 = me.pool.pull('sky', 0, 0);
        this.sky2 = me.pool.pull('sky', me.game.viewport.width, 0);
        me.game.world.addChild(this.sky1, 11);
        me.game.world.addChild(this.sky2, 11);

        // add the dialog with the game information
        if (game.data.newHiScore) {
            //Oberver design pattern - notifying player a new hi-score
            var newRect = new me.Sprite(
                gameOverBG.width/2,
                gameOverBG.height/2,
                {image: 'newhiscore'}
            );
            me.game.world.addChild(newRect, 12);
        }else{
            //Oberver design pattern - notifying player to play more to beat
            //the hi-score
            var newRect1 = new me.Sprite(
                gameOverBG.width/2,
                gameOverBG.height/2,
                {image: 'new'}
            );
            me.game.world.addChild(newRect1, 12);
        }

        this.dialog = new (me.Renderable.extend({
            // constructor
            init: function() {
                this._super(me.Renderable, 'init',
                    [0, 0, me.game.viewport.width/2, me.game.viewport.height/2]
                );
                this.font = new me.Font('gamefont', 20, 'black', 'left');
                this.steps = 'Steps: ' + game.data.steps.toString();
                this.topSteps= 'Higher Step: ' + me.save.topSteps.toString();
                this.newHiScoreMessage = 'Congratulations!!! New Hi Score';
                this.oldHiScoreMessage = 'Well Done! Play again to beat HiScore';
            },

            draw: function (renderer) {
                var stepsText = this.font.measureText(renderer, this.steps);
                var topStepsText = this.font.measureText(renderer, this.topSteps);
                var scoreText = this.font.measureText(renderer, this.score);
                var messageText = this.font.measureText(renderer, this.message);

                //steps
                this.font.draw(
                    renderer,
                    this.steps,
                    me.game.viewport.width/2 - stepsText.width/2 - 60,
                    me.game.viewport.height/2
                );

                //top score
                this.font.draw(
                    renderer,
                    this.topSteps,
                    me.game.viewport.width/2 - stepsText.width/2 - 60,
                    me.game.viewport.height/2 + 50
                );

                if (game.data.newHiScore) {
                    //Oberver design pattern - notifying player a new hi-score
                    //newHiScoreMessage
                    this.font.draw(
                        renderer,
                        this.newHiScoreMessage,
                        me.game.viewport.width/2 - stepsText.width/2 - 60,
                        me.game.viewport.height/2 + 100
                    );
                }else{
                    //Oberver design pattern - notifying player to play more to beat
                    //oldHiScoreMessage
                    this.font.draw(
                        renderer,
                        this.oldHiScoreMessage,
                        me.game.viewport.width/2 - stepsText.width/2 - 60,
                        me.game.viewport.height/2 + 100
                    );
                }  
            }
        }));
        me.game.world.addChild(this.dialog, 12);
    },

    onDestroyEvent: function() {
        // unregister the event
        me.event.unsubscribe(this.handler);
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindKey(me.input.KEY.SPACE);
        me.input.unbindPointer(me.input.pointer.LEFT);
        this.ground1 = null;
        this.ground2 = null;
        this.sky1 = null;
        this.sky2 = null;
        this.font = null;
        me.audio.stop("theme");
    }
});
