import Player from "./models/Player.js"

import { defaultConfig, gHeight, gWidth } from "./GameLoadingScene.js"
import Bar from "./Bar.js"

export default class Out extends Phaser.Scene {
    
    constructor() {
        super({ key: 'Out' })
    }

	init(data) {
		this.playerHP = data.playerHP.value
	}

    preload() {
       
		this.load.image('plat', '../assets/sprites/Scenario/Tiles/IndustrialTile_75.png')
		this.load.image('flag', '../assets/sprites/Scenario/Objects/Flag.png')
		this.load.image('barrel_2', '../assets/sprites/Scenario/Objects/Barrel2.png')
		this.load.image('barrel_1', '../assets/sprites/Scenario/Objects/Barrel1.png')
		this.load.image('sign', '../assets/sprites/Scenario/Objects/Pointer1.png')
		this.load.image('crate', '../assets/sprites/Scenario/Objects/Box8.png')
		this.load.image('bar', '../assets/sprites/Scenario/Bodies/13.png')
        this.load.image('bkg', '../assets/sprites/Scenario/Background/Background.png');
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

		let platform = this.physics.add.staticGroup();
		let outObj = this.physics.add.staticGroup();
		let barName = this.add.text(gWidth - 400, gHeight - 180, '', {fontFamily: 'CustomFont', fontSize: '30px', color: '#f65900'});
		barName.setText('Prospects Bar')

		let barrel_1 = outObj.create(100, gHeight - 45, 'barrel_1').setScale(2,2);
		barrel_1.depth = 1;

		let bar = outObj.create(gWidth - 250, gHeight - 70, 'bar').setScale(2,2);
		bar.depth = 1;

		let barrel_2 = outObj.create(300, gHeight - 45, 'barrel_2').setScale(2,2);
		barrel_2.depth = 1;

		let crate = outObj.create(200, gHeight - 45, 'crate').setScale(2,2);
		crate.depth = 1;

		let sign = outObj.create(gWidth/2 + 100, gHeight - 45, 'sign').setScale(2,2);
		sign.depth = 1;

		let flag1 = outObj.create(400, gHeight/2 - 100, 'flag').setScale(2,2);
		flag1.depth = 1;

		let flag2 = outObj.create(800, gHeight/2 - 100, 'flag').setScale(2,2);
		flag2.depth = 1;


		for (let i = 0, j = 30; i < 20; i++) {
			platform.create(3 + j, gHeight + 11, 'plat').setScale(2, 2).refreshBody()
			platform.depth = 2;
			j += 60
		}

        /* Personagens */
		this.player = this.physics.add.existing(new Player(this, 100, gHeight - 110, 'alex', this.playerHP)).setScale(3, 3)
		this.player.depth = 2;
		this.player.enableBody = true;		
		this.physics.world.enableBody(this.player)
		this.player.body.collideWorldBounds = true;
		this.player.body.onWorldBounds = true;
		this.player.setCollideWorldBounds(true);

		this.physics.add.collider(this.player, platform);

        this.bg = this.add.tileSprite(0, 0, gWidth, gHeight, 'bkg')
        .setOrigin(0, 0).setScale(2, 1.76);
		this.bg.depth = -1


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

		if(this.player.x >= 900)
		{
			this.scene.stop("Out");
			this.scene.launch("Bar", {playerHP: this.player.hp});
		} 	
    }
}