var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
    preload: function() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('arrow', 'assets/images/arrow.png');
        this.load.image('chicken', 'assets/images/chicken.png');
        this.load.image('horse', 'assets/images/horse.png');
        this.load.image('pig', 'assets/images/pig.png');
        this.load.image('sheep', 'assets/images/sheep3.png');
    },

    create: function() {
        //scale to all screens
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        //set backgroung
        this.background = this.game.add.sprite(0, 0, 'background');
        
        //right arrow
        this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
        this.rightArrow.anchor.setTo(0.5);
        this.rightArrow.customParams = {direction: 1};
        this.rightArrow.inputEnabled = true;
        this.rightArrow.input.pixelPerfectClick = true;
        this.rightArrow.events.onInputDown.add(this.switchAnimal, this);
        
        //left arrow
        this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
        this.leftArrow.anchor.setTo(0.5);
        this.leftArrow.scale.x = -1;
        this.leftArrow.customParams = {direction: -1};
        this.leftArrow.inputEnabled = true;
        this.leftArrow.input.pixelPerfectClick = true;
        this.leftArrow.events.onInputDown.add(this.switchAnimal, this);
        
        //chicken
        this.chicken = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'chicken');
        this.chicken.anchor.setTo(0.5, 0.5);
        this.chicken.scale.setTo(1.2);
        this.chicken.inputEnabled = true;
        this.chicken.input.pixelPerfectClick = true;
        this.chicken.events.onInputDown.add(this.animateAnimal, this);

        
        //horse
        this.horse = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'horse');
        this.horse.anchor.setTo(0.5);
        this.horse.scale.setTo(0.9);
        this.horse.inputEnabled = true;
        this.horse.input.pixelPerfectClick = true;
        this.horse.events.onInputDown.add(this.animateAnimal, this);
       
        //pig
        this.pig = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'pig');
        this.pig.anchor.setTo(0.5);
        this.pig.scale.setTo(-1, 1);
        this.pig.inputEnabled = true;
        this.pig.input.pixelPerfectClick = true;
        this.pig.events.onInputDown.add(this.animateAnimal, this);
        
        //sheep
        this.sheep = this.game.add.sprite(100, 250, 'sheep');
        this.sheep.anchor.setTo(0.5);
        this.sheep.scale.setTo(0.5);
        // this.sheep.angle = 30; //just to know how to rotate
        this.sheep.inputEnabled = true;
        this.sheep.input.pixelPerfectClick = true;
        this.sheep.events.onInputDown.add(this.animateAnimal, this);
    },
    
    update: function() {
        // this.sheep.angle += 0.5; //rotating constantly

    },

    switchAnimal: function(sprite, event) {
        console.log('move animal');
    },

    animateAnimal: function(sprite, event) {
        console.log('animate animal');
    }
};

game.state.add('GameState', GameState);
game.state.start('GameState');
