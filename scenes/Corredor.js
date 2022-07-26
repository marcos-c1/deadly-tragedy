import Player from './models/Player.js'
import Enemy from './models/Enemy.js'

import { gHeight, gWidth } from './GameLoadingScene.js'
import { defaultConfig } from './GameLoadingScene.js'
import Out from './OutHospitalScene.js';
import Object from './models/Object.js'

export default class Corredor extends Phaser.Scene
{

    constructor()
    {
        super({ key: 'Corredor'})
    }

	init(data)
    {
        this.playerHP = data.playerHP.value;
    }

    preload()
    {

        this.load.image('fire_ext', '../assets/sprites/Scenario/Objects/Fire-extinguisher3.png')
        this.load.image('open-box', '../assets/sprites/Scenario/Objects/Box5.png')
        this.load.image('board', '../assets/sprites/Scenario/Objects/Board1.png')

    }
    create()
    {
		// Comandos
		this.cursors = this.input.keyboard.createCursorKeys()
		this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
		this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
		this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
		this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
		this.keyC = this.input.keyboard.addKey(defaultConfig.attackKey)
		this.keyV = this.input.keyboard.addKey(defaultConfig.especialKey)
		this.ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

		let walls = this.physics.add.staticGroup();
		let platform = this.physics.add.staticGroup();
        let wallObj = this.physics.add.staticGroup();

        let sceneName = this.add.text(gWidth/2 + 350, gHeight/2 - 270, '', {fontFamily: 'CustomFont', fontSize: '30px', color: '#2c2c2c'})
        sceneName.setText("Saida")
        let arrow = this.add.text(gWidth/2 + 400, gHeight/2 - 250, '', {fontFamily: 'CustomFont', fontSize: '100px', color: '#ff6666'})

        arrow.setText("→")
        
        sceneName.depth = 1;
        arrow.depth = 1;

        let refrigerator = wallObj.create(gWidth/2, gHeight - 60, 'medicine').setScale(3,3).refreshBody();
        refrigerator.depth = 1;

        let bp = wallObj.create(800, gHeight - 30, 'blood-pressure').setScale(3,3).refreshBody();
		bp.depth = 1
        bp.rotation = 90

        /* Personagens */
		this.player = this.physics.add.existing(new Player(this, 100, gHeight - 90, 'alex', this.playerHP)).setScale(3, 3)
		this.player.depth = 2;
		this.player.enableBody = true;		
		this.physics.world.enableBody(this.player)
		this.player.body.collideWorldBounds = true;
		this.player.body.onWorldBounds = true;
		this.player.setCollideWorldBounds(true);
		
		this.enemy = this.physics.add.existing(new Enemy(this, 800, gHeight - 90, 'enemy')).setScale(3, 3)
		this.enemy.depth = 2;
		this.physics.world.enableBody(this.enemy)
		this.enemy.setCollideWorldBounds(true);

        let fire = this.physics.add.sprite(300, gHeight - 60, 'fire_ext').setScale(2, 2);
        let box = this.physics.add.sprite(500, gHeight - 60, 'open-box').setScale(2, 2);
        let board = wallObj.create(300, gHeight - 180, 'board').setScale(2, 2);
        let symbol = wallObj.create(600, gHeight - 170, 'symbol').setScale(3,3);
        
		symbol.depth = 1;
        fire.depth = 1;
        box.depth = 1;
        board.depth = 1;	

		this.physics.world.once('worldbounds', (body, up, down, left, right) => {
			if(left || right)
			{
				this.scene.stop("Corredor")
				this.scene.launch("Out", {playerHP: this.player.hp})
			}
		}, this)
        
		// Colisão entre o player e o inimigo
		this.physics.add.collider(this.player, platform);
		this.physics.add.collider(this.enemy, platform);
		this.physics.add.collider(this.player, this.enemy, this.hitEnemy, null, this);

		// Colisão entre os objetos
        this.physics.add.collider(fire, platform);
        this.physics.add.collider(box, platform);
        this.physics.add.collider(bp, platform);
        
        
        for(let i = 0, l = 52; i < 6; i++)
		{
			for(let k = 0, j = 22; k < 25; k++)
			{
				walls.create(0+j, l, 'wall').setScale(3,3).refreshBody();
                j += 48;
			}
			l += 95;
		}

        for (let i = 0, j = 30; i < 20; i++) {
			platform.create(3 + j, gHeight + 11, 'ground').setScale(2, 2).refreshBody()
			j += 60
		}

        this.anims.create({
			key: 'medicine',
			frames: this.anims.generateFrameNames('medicine', { start: 3, end: 3 }),
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

        this.arrow = arrow
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