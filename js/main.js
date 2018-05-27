var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
    preload: function() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('chicken', 'assets/images/chicken.png');
        this.load.image('horse', 'assets/images/horse.png');
        this.load.image('pig', 'assets/images/pig.png');
        this.load.image('sheep', 'assets/images/sheep3.png');
    },

    create: function() {
        this.background = this.game.add.sprite(0, 0, 'background');

        this.chicken = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'chicken');
        this.chicken.anchor.setTo(0.5, 0.5);
        this.chicken.scale.setTo(1.2);
        
        this.horse = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'horse');
        this.horse.anchor.setTo(0.5);
        this.horse.scale.setTo(0.9);

        this.pig = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'pig');
        this.pig.anchor.setTo(0.5);
        this.pig.scale.setTo(-1, 1);

        this.sheep = this.game.add.sprite(100, 250, 'sheep');
        this.sheep.anchor.setTo(0.5);
        this.sheep.scale.setTo(0.5);
        // this.sheep.angle = 30; //just to know how to rotate
    },
    
    update: function() {
        // this.sheep.angle += 0.5; //rotating constantly

    }
};

game.state.add('GameState', GameState);
game.state.start('GameState');
