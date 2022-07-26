import Player from './models/Player.js'
import Enemy from './models/Enemy.js'
import TextSpan from './models/TextSpan.js';

import {defaultConfig, gWidth, gHeight} from './GameLoadingScene.js'
import Corredor from "./Corredor.js";

export default class Hospital extends Phaser.Scene {
	static player
	static enemy

	constructor() {
		super({ key: 'Hospital'})
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

		this.load.spritesheet('bed', '../../assets/sprites/Scenario/Objects/bed_room.png', { frameWidth: 32, frameHeight: 32.5})

		this.load.spritesheet('medicine', '../../assets/sprites/Scenario/Objects/kitchen.png', { frameWidth: 32, frameHeight: 35})

		this.load.spritesheet('closet', '../../assets/sprites/Scenario/Objects/closet.png', { frameWidth: 32, frameHeight: 32})

		this.load.spritesheet('living', '../../assets/sprites/Scenario/Objects/living_room.png', { frameWidth: 32, frameHeight: 32})

		this.load.spritesheet('wall', '../../assets/sprites/Scenario/Objects/Hospital Environment Mini Asset - Expansion Pack 1/tilemap/walls.png', { frameWidth: 20, frameHeight: 34})

	}

	create() {
		// Comandos
		this.cursors = this.input.keyboard.createCursorKeys()
		this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
		this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
		this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
		this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
		this.keyC = this.input.keyboard.addKey(defaultConfig.attackKey)
		this.keyV = this.input.keyboard.addKey(defaultConfig.especialKey)
		this.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

		// Som

		// Objetos
		let platform = this.physics.add.staticGroup();
		let hospitalObj = this.physics.add.staticGroup();
		let box = this.physics.add.image(48, 48, 'box')
		let walls = this.physics.add.staticGroup();

		walls.depth = -1;

		let bed = hospitalObj.create(70, gHeight - 58, 'bed').setScale(3,3).refreshBody();
		bed.depth = 1

		let bp = hospitalObj.create(150, gHeight - 60, 'blood-pressure').setScale(3,3).refreshBody();
		bp.depth = 1
	
		let monitor = hospitalObj.create(200, gHeight - 60, 'monitor').setScale(3,3).refreshBody();
		monitor.depth = 1

		let clock = hospitalObj.create(200, gHeight - 200, 'clock').setScale(3,3).refreshBody();
		clock.depth = 1

		let symbol = hospitalObj.create(300, gHeight - 200, 'symbol').setScale(3,3).refreshBody();
		symbol.depth = 1
		
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

		box.body.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true);

		for (let i = 0, j = 30; i < 20; i++) {
			platform.create(3 + j, gHeight + 11, 'ground').setScale(2, 2).refreshBody()
			j += 60
		}

		this.gameOver = new TextSpan(this, gWidth/2 - 200, gHeight/2 - 50, 'Game Over', { fontSize: '50px', fontFamily: 'CustomFont', fill: '#ffff', padding: {bottom: 10}});

		
		/* Personagens */
		this.player = this.physics.add.existing(new Player(this, 100, 450, 'alex')).setScale(3, 3)
		this.player.depth = 2;
		this.player.enableBody = true;		
		this.physics.world.enableBody(this.player)
		this.player.body.collideWorldBounds = true;
		this.player.body.onWorldBounds = true;
		this.player.setCollideWorldBounds(true);
		
		this.enemy = this.physics.add.existing(new Enemy(this, 600, 550, 'enemy')).setScale(3, 3)
		this.physics.world.enableBody(this.enemy)
		this.enemy.setCollideWorldBounds(true);


		this.physics.world.once('worldbounds', (body, up, down, left, right) => {
			if(left || right)
			{
				this.scene.stop("Hospital")
				this.scene.launch("Corredor", {playerHP: this.player.hp})
			}
		}, this)

		// Colisão entre o player e o inimigo
		this.physics.add.collider(this.player, platform);
		this.physics.add.collider(this.enemy, platform);
		this.physics.add.collider(this.player, this.enemy, this.hitEnemy, null, this);

		
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

		this.enemy.walk()
		
		
		this.box = box;
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

	update(){
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
			// TODO: Fazer o ataque do oponente?
			// enemy.anims.play('kick');
		}
		else {
			// TODO: Fazer o ataque do oponente?
			// enemy.anims.play('punch');
		}
	}
}