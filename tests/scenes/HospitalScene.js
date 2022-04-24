import Person from './models/Person.js'
import Corredor from './Corredor.js'
import Out from './OutHospitalScene.js'
import Bar from './Bar.js'

export default class Hospital extends Phaser.Scene {
	constructor() {
		super({ key: 'Hospital'})
	}

	preload() {
		let rpath = '../assets/sprites'
		let Alex = new Person("Alex", false)
		let John = new Person("John", false)
		let Nex = new Person("Nex", false)
		let Enemy = new Person("SuperHuman", true)

		Nex.animations.map((a) => {
			this.load.spritesheet(a.name, a.path, a.frameDimensions)
		})
		John.animations.map((a) => {
			this.load.spritesheet(a.name, a.path, a.frameDimensions)
		})

		Alex.animations.map((a) => {
			this.load.spritesheet(a.name, a.path, a.frameDimensions)
		})
		Enemy.animations.map((a) => {
			this.load.spritesheet(a.name, a.path, a.frameDimensions)
		})

		this.load.image('ground', '../assets/sprites/Scenario/Tiles/IndustrialTile_78.png')

		this.load.image('mountain', '../../assets/sprites/Scenario/Background/parallax_mountain_pack/layers/parallax-mountain-bg.png')

		this.load.image('background',
			'../assets/dark-room-background.png');

		this.load.spritesheet('hp', `${rpath}/Health-Bar/heart_animated_1.png`,
			{ frameWidth: 18, frameHeight: 16 })

		this.load.audio('piano', '../assets/audio/background-sound.mp3')

		this.load.image('box', '../assets/sprites/Scenario/Objects/Box5.png')

		this.load.image('blood-pressure', '../../assets/sprites/Scenario/Objects/Hospital Environment Mini Asset - Expansion Pack 1/tiles/hospital-expansion-tile- (45).png')

		this.load.image('monitor', '../../assets/sprites/Scenario/Objects/Hospital Environment Mini Asset - Expansion Pack 1/tiles/hospital-expansion-tile- (38).png')

		this.load.image('clock', '../../assets/sprites/Scenario/Objects/Hospital Environment Mini Asset - Expansion Pack 1/tiles/hospital-expansion-tile- (39).png')

		this.load.image('symbol', '../../assets/sprites/Scenario/Objects/Hospital Environment Mini Asset - Expansion Pack 1/tiles/hospital-expansion-tile- (40).png')

		this.load.spritesheet('bed', '../../assets/sprites/Scenario/Objects/bed_room.png', { frameWidth: 32, frameHeight: 31})

		this.load.spritesheet('medicine', '../../assets/sprites/Scenario/Objects/kitchen.png', { frameWidth: 32, frameHeight: 35})

		this.load.spritesheet('closet', '../../assets/sprites/Scenario/Objects/closet.png', { frameWidth: 32, frameHeight: 32})

		this.load.spritesheet('living', '../../assets/sprites/Scenario/Objects/living_room.png', { frameWidth: 32, frameHeight: 32})

		this.load.spritesheet('wall', '../../assets/sprites/Scenario/Objects/Hospital Environment Mini Asset - Expansion Pack 1/tilemap/walls.png', { frameWidth: 20, frameHeight: 34})

	}

	create() {
		// this.add.image(gWidth / 2 + 50, gHeight / 2, 'background')
		this.cameras.main.backgroundColor.setTo(255, 255, 200)

		let pause = this.add.text(config.width - 20, config.height - 20, '',
		{fontFamily: 'CustomFont', fontSize: '20px'})
		
		pause.setText('Pausado')
		
		let bsound = this.sound.add('piano', { loop: true })

		//bsound.play()
		bsound.volume = 0.2
		bsound.rate = 1

		/* Objetos */
		let platform = this.physics.add.staticGroup();
		let hearts = this.physics.add.staticGroup();
		let hospitalObj = this.physics.add.staticGroup();
		let walls = this.physics.add.staticGroup();

		walls.depth = -1;

		let bed = hospitalObj.create(70, gHeight - 65, 'bed').setScale(3,3).refreshBody();
		bed.depth = 1

		let bp = hospitalObj.create(150, gHeight - 60, 'blood-pressure').setScale(3,3).refreshBody();
		bp.depth = 1
	
		let monitor = hospitalObj.create(200, gHeight - 60, 'monitor').setScale(3,3).refreshBody();
		monitor.depth = 1

		let clock = hospitalObj.create(200, gHeight - 200, 'clock').setScale(3,3).refreshBody();
		clock.depth = 1

		let symbol = hospitalObj.create(300, gHeight - 200, 'symbol').setScale(3,3).refreshBody();
		symbol.depth = 1

		// let wall = hospitalObj.create(70, 150, 'wall').setScale(3,3).refreshBody();
		
		for(let i = 0, l = 52; i < 6; i++)
		{
			for(let k = 0, j = 22; k < 25; k++)
			{
				walls.create(0+j, l, 'wall').setScale(3,3).refreshBody();
				j += 48;
			}
			l += 95;
		}

		let medicine = hospitalObj.create(gWidth/2, gHeight - 60, 'medicine').setScale(3,3).refreshBody();

		let closet = hospitalObj.create(gWidth/2 - 70, gHeight - 60, 'closet').setScale(3,3).refreshBody();

		let wardrobe = hospitalObj.create(gWidth/2 - 150, gHeight - 60, 'wardrobe').setScale(3,3).refreshBody();


		let box = this.physics.add.image(48, 48, 'box')
				
		box.body.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true);

		for (let i = 0, j = 30; i < 20; i++) {
			platform.create(3 + j, gHeight + 11, 'ground').setScale(2, 2).refreshBody()
			j += 60
		}

		for (let i = 0, j = 0; i < 5; i++) {
			hearts.create(50 + j, 20, 'hp').setScale(1, 1).refreshBody();
			j += 20
		}

		/* Personagens */
		let alex = this.physics.add.sprite(100, 450, 'Alex-run-right').setScale(3, 3);
		alex.depth = 2;

		alex.enableBody = true;
		alex.physicsBodyType = Phaser.Physics.ARCADE;
		
		alex.body.collideWorldBounds = true;

		alex.body.onWorldBounds = true;
		this.physics.world.once('worldbounds', (body, up, down, left, right) => {
			if(left || right){
				this.scene.launch("Corredor")
			}
		})
		
		
		let john = this.physics.add.sprite(300, 450, 'John-run-right').setScale(3, 3);
		let nex = this.physics.add.sprite(700, 450, 'Nex-run-right').setScale(3, 3);
		let enemy = this.physics.add.sprite(700, 300, 'SuperHuman-run-right').setScale(3, 3);
		enemy.depth = 2;

		alex.setCollideWorldBounds(true);
		john.setCollideWorldBounds(true);
		nex.setCollideWorldBounds(true);
		enemy.setCollideWorldBounds(true);
		enemy.setBounce(0.2);
				
		this.physics.add.collider(alex, platform);
		this.physics.add.collider(john, platform);
		this.physics.add.collider(nex, platform);
		this.physics.add.collider(enemy, platform);


		// Comandos
		this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
		this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
		this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
		this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
		this.c = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
		this.v = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V)
		this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

		

		/* Debug personagem */
		let alex_2 = this.physics.add.sprite(500, 200, 'Alex-run-right').setScale(3, 3)
		alex_2.setCollideWorldBounds(true);
		alex_2.setBounce(0.2);
		this.physics.add.collider(alex_2, platform)
		/* Debug fim personagem */
		
		
		
		this.anims.create({
			key: 'wardrobe',
			frames: this.anims.generateFrameNames('living', { start: 8, end: 8 }),
			frameRate: 1,
			repeat: 0
		})
		
		this.anims.create({
			key: 'bed',
			frames: this.anims.generateFrameNames('bed', { start: 7, end: 7 }),
			frameRate: 1,
			repeat: 0
		})

		this.anims.create({
			key: 'medicine',
			frames: this.anims.generateFrameNames('medicine', { start: 3, end: 3 }),
			frameRate: 1,
			repeat: 0
		})

		this.anims.create({
			key: 'closet',
			frames: this.anims.generateFrameNames('closet', { start: 18, end: 18 }),
			frameRate: 1,
			repeat: 0
		})

		this.anims.create({
			key: 'heart-hurt',
			frames: this.anims.generateFrameNames('hp', { start: 0, end: 1 }),
			frameRate: 4,
			repeat: 0
		})

		this.anims.create({
			key: 'run-right',
			frames: this.anims.generateFrameNumbers('SuperHuman-run-right',
				{ start: 0, end: 5 }),
			frameRate: 6,
			yoyo: false,
			repeat: 7,
		});

		this.anims.create({
			key: 'run-left',
			frames: this.anims.generateFrameNumbers('SuperHuman-run-left',
				{ start: 0, end: 5 }),
			frameRate: 6,
			yoyo: false,
			repeat: 6
		});


		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNames('Alex-run-right',
				{ start: 0, end: 5 }),
			frameRate: 10,
			repeat: -1
		})

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNames('Alex-run-left',
				{ start: 5, end: 0 }),
			frameRate: 10,
			repeat: -1
		})

		this.anims.create({
			key: 'idle-right',
			frames: this.anims.generateFrameNames('Alex-idle-right',
				{ start: 0, end: 0 }),
			frameRate: 1,
			repeat: -1
		})

		this.anims.create({
			key: 'idle-left',
			frames: this.anims.generateFrameNames('Alex-idle-left',
				{ start: 0, end: 0 }),
			frameRate: 1,
			repeat: -1
		})

		this.anims.create({
			key: 'jump-right',
			frames: this.anims.generateFrameNames('Alex-jump-right',
				{ start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		})

		this.anims.create({
			key: 'jump-left',
			frames: this.anims.generateFrameNames('Alex-jump-left',
				{ start: 3, end: 0 }),
			frameRate: 10,
			repeat: -1
		})

		this.anims.create({
			key: 'hurt',
			frames: [{ key: 'Alex-hurt', frame: 1 }],
			frameRate: 10,
		})

		this.anims.create({
			key: 'attack-right',
			frames: [{ key: 'Alex-attack1-right', frame: 4 }],
			frameRate: 10,
		})

		this.anims.create({
			key: 'attack-left',
			frames: [{ key: 'Alex-attack1-left', frame: 1 }],
			frameRate: 10,
		})

		this.anims.create({
			key: 'special-right',
			frames: this.anims.generateFrameNames('Alex-special-right',
				{ end: 7 }),
			frameRate: 10,
			repeat: -1
		})

		this.anims.create({
			key: 'special-left',
			frames: this.anims.generateFrameNames('Alex-special-left',
				{ start: 7, end: 0 }),
			frameRate: 10,
			repeat: -1
		})

		this.anims.create({
			key: 'john-idle-right',
			frames: this.anims.generateFrameNames('John-idle-right',
				{ start: 0, end: 0 }),
			frameRate: 1,
			repeat: -1
		})

		this.anims.create({
			key: 'john-idle-left',
			frames: this.anims.generateFrameNames('John-idle-left',
				{ start: 0, end: 0 }),
			frameRate: 1,
			repeat: -1
		})

		this.anims.create({
			key: 'john-run-right',
			frames: this.anims.generateFrameNames('John-run-right',
				{ start: 0, end: 5 }),
			frameRate: 6,
			yoyo: false,
			repeat: 7,
		})

		this.anims.create({
			key: 'john-run-left',
			frames: this.anims.generateFrameNames('John-run-left',
				{ start: 5, end: 0 }),
			frameRate: 6,
			yoyo: false,
			repeat: 6,
		})

		this.anims.create({
			key: 'nex-idle-right',
			frames: this.anims.generateFrameNames('Nex-idle-right',
				{ start: 0, end: 0 }),
			frameRate: 1,
			repeat: -1
		})

		this.anims.create({
			key: 'nex-idle-left',
			frames: this.anims.generateFrameNames('Nex-idle-left',
				{ start: 0, end: 0 }),
			frameRate: 1,
			repeat: -1
		})

		enemy.anims.play("run-right", true)
		// john.anims.play("john-run-right", true);

		enemy.setCollideWorldBounds(true)

		alex_2.anims.play("hurt", false)

		this.tweens.add({
			targets: enemy,
			x: 750,
			duration: 8100,
			ease: 'Linear',
		})

		/*this.tweens.add({
			targets: john,
			x: 750,
			duration: 8100,
			ease: 'Linear',
		})*/

		let isRight = true

		this.time.addEvent({
			delay: 8100,
			callback: () => {
				isRight = !isRight
				if (!isRight) {
					enemy.anims.play("run-left", true)
					// john.anims.play("john-run-left", true)

					this.tweens.add({
						targets: enemy,
						x: -750,
						duration: 15000,
						ease: 'Linear',
					});

					/*this.tweens.add({
						targets: john,
						x: -750,
						duration: 15000,
						ease: 'Linear',
					})*/

				} else {

					enemy.anims.play("run-right", true);
					// john.anims.play("john-run-right", true)

					this.tweens.add({
						targets: enemy,
						x: 750,
						duration: 8100,
						ease: 'Linear',
					});

					/*this.tweens.add({
						targets: john,
						x: 750,
						duration: 8100,
						ease: 'Linear',
					})*/
				}
			},
			callbackScope: this,
			loop: true
		});

		this.player = alex
		this.npc_john = john
		this.box = box;
		this.medicine = medicine;
		this.platform = platform
		this.hp = hearts;
		this.bed = bed;
		this.closet = closet;
		this.wardrobe = wardrobe;
		this.wall = walls;
		wardrobe.anims.play("wardrobe", true)
		closet.anims.play("closet", true)
		bed.anims.play("bed", true)
		medicine.anims.play("medicine", true)
		alex.anims.play("idle-right", true)
		john.anims.play("john-idle-right", true)
		nex.anims.play("nex-idle-right", true)
	}

	update() {
		if(this.esc.isDown)
		{
			if(this.scene.isActive())
				this.scene.pause()
		}

		let alex = this.player;
		let box = this.box;
		let platform = this.platform;
		let isLeft;

		// Personagens
		let cursors = this.input.keyboard.createCursorKeys();

		this.physics.world.collide(box, platform);

		if ((cursors.left.isDown || this.a.isDown) || (cursors.right.isDown || this.d.isDown)) {
			alex.setVelocityX(cursors.left.isDown || this.a.isDown ? -200 : 200);

			this.isLeft = cursors.left.isDown || this.a.isDown ? true : false

			alex.anims.play(cursors.left.isDown || this.a.isDown ? "left" : "right", true);
		}
		else {
			alex.setVelocityX(0);
			if (this.isLeft != undefined) {
				this.isLeft ? alex.anims.play("idle-left", true) : alex.anims.play("idle-right", true)
			} else {
				alex.anims.play("idle-right", true)
			}
		}
		if (cursors.up.isDown && alex.body.touching.down) {
			alex.setVelocityY(-250)
		}
		if (this.c.isDown) {
			if (this.isLeft != undefined) {
				this.isLeft ? alex.anims.play("attack-left", true) : alex.anims.play("attack-right", true)
			} else {
				alex.anims.play("attack-right", true)
			}

		}

		if (this.v.isDown) {
			if (this.isLeft != undefined) {
				this.isLeft ? alex.anims.play("special-left", true) : alex.anims.play("special-right", true)
			} else {
				alex.anims.play("special-right", true)
			}
		}
	}

	render()
	{
	}
}

const config = {
	type: Phaser.AUTO,
	width: 1200,
	height: 580,
	pixelArt: true,
	backgroundColor: 'background',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				y: 300
			},
			debug: false
		}
	},
	scene: [Hospital, Corredor, Out, Bar]
};

const game = new Phaser.Game(config);

export let gWidth = config.width 
export let gHeight = config.height