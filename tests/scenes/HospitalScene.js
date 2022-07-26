import Player from './models/Player.js'
import Enemy from './models/Enemy.js'
import TextSpan from './models/TextSpan.js'
import Corredor from './Corredor.js'
import Corredor2 from './Corredor2.js'
import Out from './OutHospitalScene.js'
import Bar from './Bar.js'


export default class Hospital extends Phaser.Scene {
	constructor() {
		super({ key: 'Hospital' })
	}

	preload() {
		this.load.image('ground', '../assets/sprites/Scenario/Tiles/IndustrialTile_78.png')
		this.load.spritesheet('alex', `../assets/sprites/Alex/Alex.png`, { frameWidth: 47, frameHeight: 49 })
		this.load.spritesheet('enemy', '../assets/sprites/Enemies/SuperHuman/SuperHuman.png', { frameWidth: 47, frameHeight: 60 })

		this.load.audio('piano', '../assets/audio/background-sound.mp3')
		this.load.image('box', '../assets/sprites/Scenario/Objects/Box5.png')

		this.load.image('blood-pressure', '../../assets/sprites/Scenario/Objects/Hospital Environment Mini Asset - Expansion Pack 1/tiles/hospital-expansion-tile- (45).png')

		this.load.image('monitor', '../../assets/sprites/Scenario/Objects/Hospital Environment Mini Asset - Expansion Pack 1/tiles/hospital-expansion-tile- (38).png')

		this.load.image('clock', '../../assets/sprites/Scenario/Objects/Hospital Environment Mini Asset - Expansion Pack 1/tiles/hospital-expansion-tile- (39).png')

		this.load.image('symbol', '../../assets/sprites/Scenario/Objects/Hospital Environment Mini Asset - Expansion Pack 1/tiles/hospital-expansion-tile- (40).png')

		this.load.spritesheet('bed', '../../assets/sprites/Scenario/Objects/bed_room.png', { frameWidth: 32, frameHeight: 31 })

		this.load.spritesheet('medicine', '../../assets/sprites/Scenario/Objects/kitchen.png', { frameWidth: 32, frameHeight: 35 })

		this.load.spritesheet('closet', '../../assets/sprites/Scenario/Objects/closet.png', { frameWidth: 32, frameHeight: 32 })

		this.load.spritesheet('living', '../../assets/sprites/Scenario/Objects/living_room.png', { frameWidth: 32, frameHeight: 32 })

		this.load.spritesheet('wall', '../../assets/sprites/Scenario/Objects/Hospital Environment Mini Asset - Expansion Pack 1/tilemap/walls.png', { frameWidth: 20, frameHeight: 34 })

	}

	create() {
		this.cameras.main.backgroundColor.setTo(255, 255, 200)

		let pause = this.add.text(config.width - 20, config.height - 20, '',
			{ fontFamily: 'CustomFont', fontSize: '20px' })

		pause.setText('Pausado')

		let bsound = this.sound.add('piano', { loop: true })

		//bsound.play()
		bsound.volume = 0.2
		bsound.rate = 1


		this.gameOver = new TextSpan(this, config.width/2 - 200, config.height/2 - 50, 'Game Over', { fontSize: '50px', fontFamily: 'CustomFont', fill: '#ffff', padding: {bottom: 10}});
		

		/* Objetos */
		let platform = this.physics.add.staticGroup();
		let hospitalObj = this.physics.add.staticGroup();
		let walls = this.physics.add.staticGroup();

		walls.depth = -1;

		let bed = hospitalObj.create(70, screenHeight - 65, 'bed').setScale(3, 3).refreshBody();
		bed.depth = 1

		let bp = hospitalObj.create(150, screenHeight - 60, 'blood-pressure').setScale(3, 3).refreshBody();
		bp.depth = 1

		let monitor = hospitalObj.create(200, screenHeight - 60, 'monitor').setScale(3, 3).refreshBody();
		monitor.depth = 1

		let clock = hospitalObj.create(200, screenHeight - 200, 'clock').setScale(3, 3).refreshBody();
		clock.depth = 1

		let symbol = hospitalObj.create(300, screenHeight - 200, 'symbol').setScale(3, 3).refreshBody();
		symbol.depth = 1

		// let wall = hospitalObj.create(70, 150, 'wall').setScale(3,3).refreshBody();

		for (let i = 0, l = 52; i < 6; i++) {
			for (let k = 0, j = 22; k < 25; k++) {
				walls.create(0 + j, l, 'wall').setScale(3, 3).setTint('0x202020').refreshBody();
				j += 48;
			}
			l += 95;
		}

		let medicine = hospitalObj.create(screenWidth / 2, screenHeight - 60, 'medicine').setScale(3, 3).refreshBody();
		let closet = hospitalObj.create(screenWidth / 2 - 70, screenHeight - 60, 'closet').setScale(3, 3).refreshBody();
		let wardrobe = hospitalObj.create(screenWidth / 2 - 150, screenHeight - 60, 'wardrobe').setScale(3, 3).refreshBody();


		let box = this.physics.add.image(48, 48, 'box')

		box.body.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true);

		for (let i = 0, j = 30; i < 20; i++) {
			platform.create(3 + j, screenHeight + 11, 'ground').setScale(2, 2).refreshBody()
			j += 60
		}

		let alex = this.physics.add.existing(new Player(this, 100, 450, 'alex')).setScale(3, 3)
		let enemy = this.physics.add.existing(new Enemy(this, 600, 550, 'enemy')).setScale(3, 3)

		alex.depth = 2;

		alex.body.onWorldBounds = true;
		this.physics.world.once('worldbounds', (body, up, down, left, right) => {
			if (left || right) {
				this.scene.stop("Hospital")
				this.scene.launch("Corredor")
			}
		})



		alex.setCollideWorldBounds(true);
		enemy.setCollideWorldBounds(true);

		this.physics.add.collider(alex, platform)
		this.physics.add.collider(enemy, platform)
		this.physics.add.collider(alex, enemy, this.hitEnemy, null, this);

		this.physics.world.enableBody(alex)
		this.physics.world.enableBody(enemy)



		// Comandos
		this.cursors = this.input.keyboard.createCursorKeys()
		this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
		this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
		this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
		this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
		this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
		this.keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V)
		this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)


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
			key: 'left',
			frames: this.anims.generateFrameNumbers('alex', { frames: [0, 1, 2, 3, 4, 5] }),
			frameRate: 8,
			repeat: 1
		})

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('alex', { frames: [0, 1, 2, 3, 4, 5] }),
			frameRate: 8,
			repeat: 1
		})

		this.anims.create({
			key: 'punch',
			frames: this.anims.generateFrameNumbers('alex', { frames: [60, 61, 62, 63, 64] }),
			frameRate: 8,
			repeat: 0
		})

		this.anims.create({
			key: 'hurt',
			frames: this.anims.generateFrameNumbers('alex', { frames: [7] }),
			frameRate: 8,
			repeat: 1
		})

		this.anims.create({
			key: 'die',
			frames: this.anims.generateFrameNumbers('alex', { frames: [20, 21, 22, 23, 24] }),
			frameRate: 8,
			repeat: -1
		})

		this.anims.create({
			key: 'jump',
			frames: this.anims.generateFrameNumbers('alex', { frames: [40, 41, 42, 43, 44] }),
			frameRate: 8,
			repeat: 0
		})

		this.anims.create({
			key: 'idle',
			frames: this.anims.generateFrameNumbers('alex', { frames: [6] }),
			frameRate: 1,
			repeat: 0
		})

		this.anims.create({
			key: 'enemy-left',
			frames: this.anims.generateFrameNumbers('enemy', { frames: [5, 4, 3, 2, 1] }),
			frameRate: 5,
			repeat: 1
		})

		this.anims.create({
			key: 'enemy-right',
			frames: this.anims.generateFrameNumbers('enemy', { frames: [5, 4, 3, 2, 1] }),
			frameRate: 5,
			repeat: 1
		})

		this.anims.create({
			key: 'enemy-hit',
			frames: this.anims.generateFrameNumbers('enemy', { frames: [12, 13] }),
			frameRate: 5,
			repeat: 1
		})

		this.anims.create({
			key: 'enemy-death',
			frames: this.anims.generateFrameNumbers('enemy', { frames: [7, 8, 9, 10, 11] }),
			frameRate: 5,
			repeat: 1
		})

		this.anims.create({
			key: 'enemy-idle',
			frames: this.anims.generateFrameNumbers('enemy', { frames: [0] }),
			frameRate: 1,
			repeat: 0
		})

		enemy.walk()


		this.player = alex
		this.enemy = enemy
		this.medicine = medicine;
		this.platform = platform
		this.bed = bed;
		this.closet = closet;
		this.wardrobe = wardrobe;
		this.wall = walls;

		wardrobe.anims.play("wardrobe", true)
		closet.anims.play("closet", true)
		bed.anims.play("bed", true)
		medicine.anims.play("medicine", true)
	}

	update() {
		if (!this.player.alive) {
			this.player.anims.play('die')
			this.player.setTint(0xff0000)
			this.physics.pause()
			this.gameOver.show()
		}
		if(this.keyV.isDown){
			this.player.anims.play('die')
		}
	}

	hitEnemy(player, bomb) {
		if (this.player.anims.currentAnim.key == 'punch') {
			this.damageEnemy(this.enemy);
			if (this.enemy.alive === false) {
				this.destroySprite(this.enemy)
			}
		}
		else {
			let oneOrZero = (Math.random() >= 0.5) ? 1 : 0 
			if(oneOrZero === 1){
				this.player.damage(2)
				this.player.anims.play('hurt')
			}
		}
	}

	destroySprite(sprite){
		sprite.destroy()
	}

	damageEnemy(enemy) {
		if (!enemy) return
		if (!enemy.alive) return
		if (!Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemy.getBounds())) return
		enemy.hit()
		//enemy.anims.play('enemy-hit', true)
		let oneOrZero = (Math.random() >= 0.5) ? 1 : 0
		if (oneOrZero === 1) {
			// enemy.anims.play('kick');
		}
		else {
			// enemy.anims.play('punch');
		}
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
	scene: [Hospital, Corredor, Corredor2, Out, Bar]
};

const game = new Phaser.Game(config);

export let screenWidth = config.width
export let screenHeight = config.height