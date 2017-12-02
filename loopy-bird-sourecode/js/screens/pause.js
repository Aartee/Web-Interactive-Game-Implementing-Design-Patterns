/* COMPOSITE DESIGN PATTERN
 * Component: Game
 * Leaf: PauseScreen
 */

game.PauseScreen = me.ScreenObject.extend({
    init: function(){
        this.dialog = new (me.Renderable.extend({
             init: function() {
                    console.log("hi");
            this._super(me.Renderable, "init", [10, 10, 10, 10]);
            var c;
        // local copy of the global score
        this.stepsFont = new me.Font('gamefont', 30, 'yellow', 'center');
        // make sure we use screen coordinates
        this.floating = true;
        this.text = 'Press S key or Click button to Resume';
    },

    draw: function (renderer) {
        this.stepsFont.draw(renderer, this.text, me.game.viewport.width/2, 10);
    }
    }));
    c=me.game.world.addChild(this.dialog, 12);
    },

    onDestroyEvent: function() {

        this.font = null;
        me.game.world.removeChild(c);
        console.log("reset");
    }
});
