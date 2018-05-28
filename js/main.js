var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
    preload: function() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('arrow', 'assets/images/arrow.png');

        this.load.spritesheet('chicken', 'assets/images/chicken_spritesheet.png', 131, 200, 3);
        this.load.spritesheet('horse', 'assets/images/horse_spritesheet.png', 212, 200, 3);
        this.load.spritesheet('pig', 'assets/images/pig_spritesheet.png', 297, 200, 3);
        this.load.spritesheet('sheep', 'assets/images/sheep_spritesheet.png', 244, 200, 3);

        this.load.audio("chickenSound", ['assets/audio/chicken.ogg', 'assets/audio/chicken.mp3']);
        this.load.audio("horseSound", ['assets/audio/horse.ogg', 'assets/audio/horse.mp3']);
        this.load.audio("pigSound", ['assets/audio/pig.ogg', 'assets/audio/pig.mp3']);
        this.load.audio("sheepSound", ['assets/audio/sheep.ogg', 'assets/audio/sheep.mp3']);


    },

    create: function() {
        //scale to all screens
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        //set backgroung
        this.background = this.game.add.sprite(0, 0, 'background');

        //group of animals
        var animalData = [
            {key: 'chicken', text: 'CHICKEN', audio: 'chickenSound'},
            { key: 'horse', text: 'HORSE', audio: 'horseSound'},
            { key: 'pig', text: 'PIG', audio: 'pigSound'},
            { key: 'sheep', text: 'SHEEP', audio: 'sheepSound'},
        ]
        this.animals = this.game.add.group(); //phaser method
        var self = this;
        animalData.forEach(function(element){
            animal = self.animals.create(-1000, self.game.world.centerY, element.key, 0);
            animal.customParams = {text: element.text, sound: self.game.add.audio(element.audio)};
            animal.anchor.setTo(0.5);

            animal.animations.add('animate', [0, 1, 2, 1, 0, 1], 3, false);

            animal.inputEnabled = true;
            animal.input.pixelPerfectClick = true;
            animal.events.onInputDown.add(self.animateAnimal, self);
        });

        //position of animal
        this.currentAnimal = this.animals.next();
        this.currentAnimal.position.setTo(this.game.world.centerX, this.game.world.centerY);

        //show animal text
        this.showText(this.currentAnimal);

        
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
        
        // //chicken
        // this.chicken = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'chicken');
        // this.chicken.anchor.setTo(0.5, 0.5);
        // this.chicken.scale.setTo(1.2);
        // this.chicken.inputEnabled = true;
        // this.chicken.input.pixelPerfectClick = true;
        // this.chicken.events.onInputDown.add(this.animateAnimal, this);

        
        // //horse
        // this.horse = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'horse');
        // this.horse.anchor.setTo(0.5);
        // this.horse.scale.setTo(0.9);
        // this.horse.inputEnabled = true;
        // this.horse.input.pixelPerfectClick = true;
        // this.horse.events.onInputDown.add(this.animateAnimal, this);
       
        // //pig
        // this.pig = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'pig');
        // this.pig.anchor.setTo(0.5);
        // this.pig.scale.setTo(-1, 1);
        // this.pig.inputEnabled = true;
        // this.pig.input.pixelPerfectClick = true;
        // this.pig.events.onInputDown.add(this.animateAnimal, this);
        
        // //sheep
        // this.sheep = this.game.add.sprite(100, 250, 'sheep');
        // this.sheep.anchor.setTo(0.5);
        // this.sheep.scale.setTo(0.5);
        // // this.sheep.angle = 30; //just to know how to rotate
        // this.sheep.inputEnabled = true;
        // this.sheep.input.pixelPerfectClick = true;
        // this.sheep.events.onInputDown.add(this.animateAnimal, this);
    },
    
    update: function() {
        // this.sheep.angle += 0.5; //rotating constantly

    },

    switchAnimal: function(sprite, event) {
        if(this.isMoving) {
            return false;
        }

        this.isMoving = true;

        //hide text
        this.animalText.visible = false;
        
        var newAnimal, endX;

        if(sprite.customParams.direction > 0) {
            newAnimal = this.animals.next();
            newAnimal.x = -newAnimal.width/2;
            endX = 640 + this.currentAnimal.width/2;
        } else {
            newAnimal = this.animals.previous();
            newAnimal.x = 640 + newAnimal.width / 2;
            endX = - this.currentAnimal.width/2;
        }

        var newAnimalMoviment = this.game.add.tween(newAnimal);
        newAnimalMoviment.to({x: this.game.world.centerX}, 1000);
        newAnimalMoviment.onComplete.add(function(){
            this.isMoving = false;
            this.showText(newAnimal);
        }, this);
        newAnimalMoviment.start();

        currentAnimalMoviment = this.game.add.tween(this.currentAnimal);
        currentAnimalMoviment.to({ x: endX}, 1000);
        currentAnimalMoviment.start();

        this.currentAnimal = newAnimal;

    },

    animateAnimal: function(sprite, event) {
        sprite.play('animate');
        sprite.customParams.sound.play();
    },

    showText: function(animal) {
        if(!this.animalText) {
            var style = {
                font: 'bold 30pt Arial',
                fill: '#D0171B',
                align: 'center'
            }
            this.animalText = this.game.add.text(this.game.width/2, this.game.height * 0.85, '', style);
            this.animalText.anchor.setTo(0.5);
        }
        this.animalText.setText(animal.customParams.text);
        this.animalText.visible = true;
    }
};

game.state.add('GameState', GameState);
game.state.start('GameState');
