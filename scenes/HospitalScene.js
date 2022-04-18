//import {} from 'OutHospitalScene.js'

function preload() {
	let rpath = '../assets/sprites'
    this.load.spritesheet('player_right', `${rpath}/Alex/Biker_all_sprites_right.png`,
		{frameWidth: 48.5, frameHeight: 50.5});

		this.load.spritesheet('player_left', `${rpath}/Alex/Biker_all_sprites_left.png`,
		{frameWidth: 48.5, frameHeight: 50.5});

		this.load.image('background',
		'../assets/dark-room-background.png');

		this.load.spritesheet('run', `${rpath}/Alex/Biker_run.png`,
		{frameWidth: 48.5, frameHeight: 50})

		this.load.spritesheet('hp', `${rpath}/Health-Bar/heart_animated_1.png`,
		{frameWidth: 18, frameHeight: 16})

		this.audio.load('piano', '../assets/audio/background-sound.flac')
		
}

function create() {
	this.add.image(400, 400, 'background')
	this.sound.add('piano', {loop: true})
		// Comandos
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

    let alex = this.physics.add.sprite(config.width / 2, config.height - 50, 'player').setScale(3, 3);
    alex.setCollideWorldBounds(true);

	let heart1 = this.physics.add.sprite(50, 20, 'hp').setScale(1, 1);
	let heart2 = this.physics.add.sprite(70, 20, 'hp').setScale(1, 1);
	let heart3 = this.physics.add.sprite(90, 20, 'hp').setScale(1, 1);
	let heart4 = this.physics.add.sprite(110, 20, 'hp').setScale(1, 1);
	let heart5 = this.physics.add.sprite(130, 20, 'hp').setScale(1, 1);
	
	heart1.setCollideWorldBounds(true);
	
	for(let i = 0; i < 5; i++)
	{
		this.anims.create({
			key: 'heart-begin',
			frames: this.anims.generateFrameNames('hp', {start: 0, end: 0}),
			frameRate: 10,
			repeat: 1
		})
	}
		
		this.anims.create(
			{
				key: 'stand_right',
				frames: this.anims.generateFrameNames('player_right',
				{start: 50,	end: 50}),
				frameRate: 1,
				repeat: 0
			}
		)

		this.anims.create(
			{
				key: 'stand_left',
				frames: this.anims.generateFrameNames('player_left',
				{start: 1,	end: 1}),
				frameRate: 1,
				repeat: 0
			}
		)
	
		this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNames('player_left', {start: 49, end: 42}),
            framerate: 10,
			repeat: -1
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNames('player_right', {start: 41, end: 49}),
            framerate: 10,
			repeat: -1
        })
		
		this.player = alex
		this.player.anims.play("stand_left", true)
		this.player.setBounce(0.2)
		this.hp = heart1;
}

function update() {
	
	let hp = this.hp;
	let alex = this.player;
	hp.anims.play("heart-begin");
  

	// Personagens
	let cursors = this.input.keyboard.createCursorKeys();
;

    if ((cursors.left.isDown || this.a.isDown) || (cursors.right.isDown || this.d.isDown))
	{
		alex.setVelocityX(cursors.left.isDown || this.a.isDown ? -200 : 200);	
		alex.anims.play(cursors.left.isDown || this.a.isDown ? "left" : "right", true);
	}
    else {
		alex.setVelocityX(0);
		alex.anims.play("stand_right", true) 
	} 
    
	/*if ((cursors.up.isDown || this.w.isDown) || (cursors.down.isDown || this.s.isDown)) 
	this.player.setVelocityY(cursors.up.isDown || this.w.isDown ? -160 : 160);
    else this.player.setVelocityY(0);*/
}

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 580,
	pixelArt: true,
    backgroundColor:'background',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);