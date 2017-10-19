## History

Clumsy Bird is a simple clone of the famous Flappy Bird. It was simple 2 day project that could build something that 
can help a lot of people to start making games. The game was made with a fabulous game framework called MelonJS. The game 
developer's prior motivation wasto make this project was to show to game developers aspirants that they didn’t need to 
spend hundreds of dollars buying pre-made game clones.

![](http://i.imgur.com/Slbvt65.png)

Play online at http://ellisonleao.github.io/clumsy-bird/

## Running Locally

- Install [Node](http://nodejs.org/download/) and [Grunt](http://gruntjs.com/)
- Install the dependencies

```
npm install
```

Then just type on your shell:

```
grunt connect
```

Open your browser at `http://localhost:8001/`

## Workflow 
1. Grunt Connect starts the game on provided HOST and PORT.
2. index.html has links to all .js files from which it calls the game.onload() function.
3. There are separate files for almost every screen according to the the current state of the game like LOADED, MENU, 
PLAY,GAME_OVER,etc.
4. Entities are defined in the javascript files with lots of animation features like rotation, gravity, jump, hit, etc.

## References
1. [Clumsy Bird](https://medium.com/ellisonleao/clumsy-bird-an-open-source-flappy-bird-clone-cf615724730f)
2. [Github Repo](https://github.com/ellisonleao/clumsy-bird/blob/master/README.md)
