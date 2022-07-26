import Player from './models/Player.js'
import Enemy from './models/Enemy.js'
import Item from './models/Item.js'

import { gWidth, gHeight } from './GameLoadingScene.js';

export default class Bar extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'Bar' })
    }

	init(data) {
		this.playerHP = data.playerHP.value
	}
    
	preload()
    {
        this.load.image('nex', '../assets/sprites/Nex/Nex_head_cut.png')
		this.load.spritesheet('bar_wall', '../../assets/sprites/Scenario/Objects/Hospital Environment Mini Asset - Expansion Pack 1/tilemap/bar_walls.png', { frameWidth: 25, frameHeight: 20})
		this.load.image('piso', '../../assets/sprites/Scenario/Pub_Sallon/piso_madeira.png')
		this.load.image('cadeira', '../../assets/sprites/Scenario/Pub_Sallon/cadeira.png')
		this.load.image('mesa', '../../assets/sprites/Scenario/Pub_Sallon/mesa.png')
		this.load.image('copo_2', '../../assets/sprites/Scenario/Pub_Sallon/copo_2.png')
		this.load.image('garrafa_1', '../../assets/sprites/Scenario/Pub_Sallon/garrafa_1.png')
		this.load.image('garrafa_2', '../../assets/sprites/Scenario/Pub_Sallon/garrafa_2.png')
		this.load.image('garrafa_3', '../../assets/sprites/Scenario/Pub_Sallon/garrafa_3.png')
		this.load.image('lata_lixo', '../../assets/sprites/Scenario/Pub_Sallon/lata_lixo.png')
		this.load.image('prateleira', '../../assets/sprites/Scenario/Pub_Sallon/prateleira.png')
		this.load.image('balcao', '../../assets/sprites/Scenario/Pub_Sallon/balcao.png')
		this.load.image('sangue_parede', '../../assets/sprites/Scenario/bloodsplat/bloodtrail_4.png')
		this.load.image('sangue_pingando', '../../assets/sprites/Scenario/bloodsplat/blooddropsplash/splattersplash_1.png')
	}

    create()
    {

		// Comandos
		this.cursors = this.input.keyboard.createCursorKeys()
		this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
		this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
		this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
		this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
		this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
		this.keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V)
		this.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

		let walls = this.physics.add.staticGroup();
		let platform = this.physics.add.staticGroup();
		let bar = this.add.text(gWidth/2 - 200, gHeight/2 - 100, 'Prospects Bar', {fontFamily: 'CustomFont', fontSize: '40px', color: '#f65900', backgroundColor: '#ffff', padding: {x: 10, y: 10}});
		bar.depth = 1

		for(let i = 0, j = 22; i < 26; i++){
			platform.create(0 + j, gHeight + 6, 'piso').setScale(3, 3).refreshBody()
			j += 48;
		}
		walls.depth = -1;

        for(let i = 0, l = 20; i < 12; i++)
		{
			for(let k = 0, j = 25; k < 30; k++)
			{
				walls.create(0+j, l, 'bar_wall').setScale(3,3).refreshBody();
				j += 45;
			}
			l += 47;
		}

		let bootles = this.physics.add.staticGroup();

		for(let i = 0, j = 20; i < 5; i++, j+=26){
			let choose = parseInt(Math.random() * 3)
			if(choose == 1){
				let garrafa = bootles.create(gWidth - 230 + j, gHeight - 240, 'garrafa_1')
				garrafa.depth = 1
				garrafa.setScale(3, 3)
			}
			else if(choose == 2){
				let garrafa = bootles.create(gWidth - 230 + j, gHeight - 240, 'garrafa_2')
				garrafa.depth = 1
				garrafa.setScale(3, 3)
			}
			else {
				let garrafa = bootles.create(gWidth - 230 + j, gHeight - 240, 'garrafa_3')
				garrafa.depth = 1
				garrafa.setScale(3, 3)
			}
		}

		for(let i = 0, j = 20; i < 5; i++, j+=26){
			let choose = parseInt(Math.random() * 3)
			if(choose == 1){
				let garrafa = bootles.create(gWidth - 230 + j, gHeight - 180, 'garrafa_1')
				garrafa.depth = 1
				garrafa.setScale(3, 3)
			}
			else if(choose == 2){
				let garrafa = bootles.create(gWidth - 230 + j, gHeight - 180, 'garrafa_2')
				garrafa.depth = 1
				garrafa.setScale(3, 3)
			}
			else {
				let garrafa = bootles.create(gWidth - 230 + j, gHeight - 180, 'garrafa_3')
				garrafa.depth = 1
				garrafa.setScale(3, 3)
			}
		}

		
		this.chair = this.physics.add.existing(new Item(this, gWidth/2, gHeight - 78, 'cadeira')).setScale(4, 4)
		this.physics.add.collider(this.chair, platform)

		this.mesa = this.physics.add.image(new Item(this, gWidth/2 + 70, gHeight - 53, 'mesa').setScale(3, 3))
		this.physics.add.collider(this.mesa, platform)

		this.copo = this.physics.add.image(new Item(this, gWidth/2 + 75, gHeight - 75, 'copo_2').setScale(3, 3))
		this.physics.add.collider(this.copo, this.mesa)

		this.garrafa = this.physics.add.image(new Item(this, gWidth/2 + 50, gHeight - 80, 'garrafa_1').setScale(3, 3))
		this.physics.add.collider(this.garrafa, this.mesa)

		this.chair2 = this.physics.add.image(new Item(this, gWidth/2 + 140, gHeight - 80, 'cadeira', true).setScale(4, 4))
		this.physics.add.collider(this.chair2, platform)

		this.mesa2 = this.physics.add.image(new Item(this, gWidth/2 - 250, gHeight - 53, 'mesa').setScale(3, 3))
		this.physics.add.collider(this.mesa2, platform)

		this.copo2 = this.physics.add.image(new Item(this, gWidth/2 - 260, gHeight - 80, 'copo_2').setScale(3, 3))
		this.physics.add.collider(this.copo2, this.mesa)

		this.garrafa2 = this.physics.add.image(new Item(this, gWidth/2 - 235, gHeight - 80, 'garrafa_3').setScale(3, 3))
		this.physics.add.collider(this.garrafa2, this.mesa)

		this.chair3 = this.physics.add.existing(new Item(this, gWidth/2 - 320, gHeight - 130, 'cadeira')).setScale(4, 4)
		this.physics.add.collider(this.chair3, platform)

		this.chair4 = this.physics.add.image(new Item(this, gWidth/2 - 180, gHeight - 80, 'cadeira', true).setScale(4, 4))
		this.physics.add.collider(this.chair4, platform)

		this.lata = this.physics.add.image(new Item(this, 160, gHeight - 68, 'lata_lixo', true).setScale(3, 3))
		this.physics.add.collider(this.lata, platform)
		
		this.prateleira = this.physics.add.image(new Item(this, gWidth - 150, gHeight - 200, 'prateleira', true).setScale(3, 3))
		this.prateleira2 = this.physics.add.image(new Item(this, gWidth - 150, gHeight - 140, 'prateleira', true).setScale(3, 3))
		
		this.balcao = this.physics.add.image(new Item(this, gWidth - 150, gHeight, 'balcao', true).setScale(3, 3))
		this.balcao.depth = 3
		this.physics.add.collider(this.balcao, platform)
		
		this.nex = this.physics.add.image(new Item(this, gWidth/2, gHeight - 50, 'nex', true).setScale(3, 3))
		this.nex.depth = 1
		this.physics.add.collider(this.nex, platform)

		this.sangue_parede = this.physics.add.image(new Item(this, gWidth/2, gHeight + 20, 'sangue_parede', true))
		this.sangue_parede.depth = -1
		this.sangue_parede2 = this.physics.add.image(new Item(this, gWidth/2, gHeight - 100, 'sangue_parede', true))
		this.sangue_parede2.flipY = true
		
		
        this.player = this.physics.add.existing(new Player(this, 100, 450, 'alex', this.playerHP)).setScale(3, 3)
		this.player.depth = 1;
		this.player.setCollideWorldBounds(true);
		this.physics.add.collider(this.player, platform)
		this.physics.world.enableBody(this.player)



		//this.physics.add.collider(this.player, enemy, this.hitEnemy, null, this);


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


    }
    update()
    {
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
}