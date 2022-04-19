class Person 
{
	constructor(name=String, isEnemy=Boolean)
	{
		this.personName = name
		this.isEnemy = isEnemy

		let rpath = '../assets/sprites'
		this.isEnemy ? this.animations = 
		[
			{
				name: `${name}-run-right`,
				path: `${rpath}/Enemies/${name}/${name}_run_right.png`,
				frameDimensions: {frameWidth: 48, frameHeight: 48}
			},
			{
				name: `${name}-run-left`,
				path: `${rpath}/Enemies/${name}/${name}_run_left.png`,
				frameDimensions: {frameWidth: 48, frameHeight: 48}
			},
			{
				name: `${name}-idle`,
				path: `${rpath}/Enemies/${name}/${name}_idle.png`,
				frameDimensions: {frameWidth: 48, frameHeight: 48}
			}
		] :
		this.animations = 
		[
			{
				name: `${name}-run-right`,
				path: `${rpath}/${name}/${name}_run_right.png`,
				frameDimensions: {frameWidth: 48, frameHeight: 48}
			},
			{
				name: `${name}-run-left`,
				path: `${rpath}/${name}/${name}_run_left.png`,
				frameDimensions: {frameWidth: 48, frameHeight: 48}
			},
			{
				name: `${name}-idle-right`,
				path: `${rpath}/${name}/${name}_idle_right.png`,
				frameDimensions: {frameWidth: 48, frameHeight: 48}
			},
			{
				name: `${name}-idle-left`,
				path: `${rpath}/${name}/${name}_idle_left.png`,
				frameDimensions: {frameWidth: 48, frameHeight: 48}
			},
			{
				name: `${name}-jump`,
				path: `${rpath}/${name}/${name}_jump.png`,
				frameDimensions: {frameWidth: 48, frameHeight: 48}
			},
			{
				name: `${name}-hurt`,
				path: `${rpath}/${name}/${name}_hurt.png`,
				frameDimensions: {frameWidth: 48, frameHeight: 48}
			},
		]
	}
}

class Hospital extends Phaser.Scene
{
	constructor()
	{
		super()
	}

	preload() {
		let rpath = '../assets/sprites'
		let Alex = new Person("Alex", false)
		let Enemy = new Person("SuperHuman", true)
		
	
		Alex.animations.map((a) => {
			this.load.spritesheet(a.name, a.path, a.frameDimensions)
		})
		Enemy.animations.map((a) => {
			this.load.spritesheet(a.name, a.path, a.frameDimensions)
		})

		this.load.image('ground', '../assets/sprites/Scenario/Tiles/IndustrialTile_78.png')

			this.load.image('background',
			'../assets/dark-room-background.png');
	
			this.load.spritesheet('hp', `${rpath}/Health-Bar/heart_animated_1.png`,
			{frameWidth: 18, frameHeight: 16})
	
			this.load.audio('piano', '../assets/audio/background-sound.mp3')
			
	}

	create() {
		this.add.image(config.width / 2 + 50, config.height/2, 'background')

		this.platforms = this.physics.add.staticGroup()

		let bsound = this.sound.add('piano', {loop: true})
		
		bsound.play()
		bsound.volume = 0.2
		bsound.rate = 1
	
		// Comandos
		this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
		this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
		this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
		this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

		for(let i = 0, j = 30; i < 19; i++)
		{
			this.platforms.create(3+j, config.height  , 'ground').setScale(2).refreshBody();
			j += 63
		}
		
		let alex = this.physics.add.sprite(100, config.height - 100, 'player').setScale(3, 3);


		this.physics.add.collider(alex, this.platforms);
	
		let alex_2 = this.physics.add.sprite(500, 200, 'player_2').setScale(3, 3)
	
		let enemy = this.physics.add.sprite(50, 300, 'SuperHuman-run-right').setScale(3, 3);
		

		alex.setCollideWorldBounds(true);
		alex.setBounce(0.2);
		enemy.setCollideWorldBounds(true);
		enemy.setBounce(0.2);
		//enemy_left.setCollideWorldBounds(true);
		//enemy_left.setBounce(0.2);
	
		let heart1 = this.physics.add.sprite(50, 20, 'hp').setScale(1, 1);
		let heart2 = this.physics.add.sprite(70, 20, 'hp').setScale(1, 1);
		let heart3 = this.physics.add.sprite(90, 20, 'hp').setScale(1, 1);
		let heart4 = this.physics.add.sprite(110, 20, 'hp').setScale(1, 1);
		let heart5 = this.physics.add.sprite(130, 20, 'hp').setScale(1, 1);
		
		this.anims.create({
				key: 'heart-hurt',
				frames: this.anims.generateFrameNames('hp', {start: 0, end: 1}),
				frameRate: 4,
				repeat: 0
		})

		this.anims.create({
			key: 'run-right',
			frames: this.anims.generateFrameNumbers('SuperHuman-run-right',
			{start: 0, end: 5}),
			frameRate: 6,
			yoyo: false,
			repeat: 7,
		});

		this.anims.create({
			key: 'run-left',
			frames: this.anims.generateFrameNumbers('SuperHuman-run-left',
			{start: 0, end: 5}),
			frameRate: 6,
			yoyo: false,
			repeat: 6
		});

		
	
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNames('Alex-run-right',
			{start: 0, end: 5}),
			frameRate: 10,
			repeat: -1
		})
	
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNames('Alex-run-left',
			{start: 5, end: 0}),
			frameRate: 10,
			repeat: -1
		})
	
		this.anims.create({
			key: 'idle-right',
			frames: this.anims.generateFrameNames('Alex-idle-right',
			{start: 0, end: 0}),
			frameRate: 1,
			repeat: -1
		})

		this.anims.create({
			key: 'idle-left',
			frames: this.anims.generateFrameNames('Alex-idle-left',
			{start: 0, end: 0}),
			frameRate: 1,
			repeat: -1
		})

		this.anims.create({
			key: 'jump',
			frames: this.anims.generateFrameNames('Alex-jump',
			{start: 0, end: 3}),
			frameRate: 8,
			repeat: 0
		})
		
		this.anims.create({
			key: 'hurt',
			frames: this.anims.generateFrameNames('Alex-hurt',
			[0, 1]),
			frameRate: 1,
			repeat: 0
		})
	
	
		enemy.anims.play("run-right", true)
		enemy.setCollideWorldBounds(true)

		alex_2.anims.play("hurt", true)
		
		this.tweens.add({
			targets: enemy,
			x: 750,
			duration: 8100,
			ease: 'Linear',
		})

		let isRight = true

		this.time.addEvent({
			delay: 8500,
			callback: () => {
				isRight = !isRight
				if(!isRight)
				{
					enemy.anims.play("run-left", true)

					this.tweens.add({
						targets: enemy,
						x: -750,
						duration: 15000,
						ease: 'Linear',
					});

				} else {

					enemy.anims.play("run-right", true);

					this.tweens.add({
						targets: enemy,
						x: 750,
						duration: 8100,
						ease: 'Linear',
					});
				}
			},
			callbackScope: this,
			loop: true
		});

		this.player = alex
		alex.anims.play("idle-right", true)
		this.hp = heart1;
	}

	update() {
		let alex = this.player;
		let isLeft;
		// Personagens
		let cursors = this.input.keyboard.createCursorKeys();
	;
		
	

		if ((cursors.left.isDown || this.a.isDown) || (cursors.right.isDown || this.d.isDown))
		{
			alex.setVelocityX(cursors.left.isDown || this.a.isDown ? -200 : 200);	

			this.isLeft = cursors.left.isDown || this.a.isDown ? true : false

			alex.anims.play(cursors.left.isDown || this.a.isDown ? "left" : "right", true);
		} 
		else {
			alex.setVelocityX(0);
			if(this.isLeft != undefined)
			{
				this.isLeft ? alex.anims.play("idle-left", true) : alex.anims.play("idle-right", true)
			} else {
				alex.anims.play("idle-right", true)
			}
		} 

		if(cursors.up.isDown && alex.body.touching.down)
		{
			alex.setVelocityY(-330)
		}
		
		/*if ((cursors.up.isDown || this.w.isDown) || (cursors.down.isDown || this.s.isDown)) 
		this.player.setVelocityY(cursors.up.isDown || this.w.isDown ? -160 : 160);
		else this.player.setVelocityY(0);*/
	}
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
    scene: [Hospital]
};

const game = new Phaser.Game(config);