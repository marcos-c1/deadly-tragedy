import Person from './models/Person.js'
import { gHeight, gWidth } from './HospitalScene.js'

export default class Corredor extends Phaser.Scene
{

    constructor()
    {
        super({ key: 'Corredor'})
    }

    preload()
    {
		let Alex = new Person("Alex", false)
		let Enemy = new Person("SuperHuman", true)
       
        Alex.animations.map((a) => {
			this.load.spritesheet(a.name, a.path, a.frameDimensions)
		})
		Enemy.animations.map((a) => {
			this.load.spritesheet(a.name, a.path, a.frameDimensions)
		})

        this.load.spritesheet('hp', '../assets/sprites/Health-Bar/heart_animated_1.png',
			{ frameWidth: 18, frameHeight: 16 })

        this.load.spritesheet('wall', '../../assets/sprites/Scenario/Objects/Hospital Environment Mini Asset - Expansion Pack 1/tilemap/walls.png', { frameWidth: 20, frameHeight: 34})

        this.load.image('ground', '../assets/sprites/Scenario/Tiles/IndustrialTile_78.png')

        this.load.image('symbol', '../../assets/sprites/Scenario/Objects/Hospital Environment Mini Asset - Expansion Pack 1/tiles/hospital-expansion-tile- (40).png')

        this.load.image('fire_ext', '../assets/sprites/Scenario/Objects/Fire-extinguisher3.png')

        this.load.image('open-box', '../assets/sprites/Scenario/Objects/Box5.png')

        this.load.image('board', '../assets/sprites/Scenario/Objects/Board1.png')

        this.load.image('blood-pressure', '../../assets/sprites/Scenario/Objects/Hospital Environment Mini Asset - Expansion Pack 1/tiles/hospital-expansion-tile- (45).png')

    }
    create()
    {
        let hearts = this.physics.add.staticGroup();
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

        let alex = this.physics.add.sprite(100, gHeight - 90, 'Alex-run-right').setScale(3, 3);
		let enemy = this.physics.add.sprite(800, gHeight - 90, 'SuperHuman-run-right').setScale(3, 3);
        let fire = this.physics.add.sprite(300, gHeight - 60, 'fire_ext').setScale(2, 2);
        let box = this.physics.add.sprite(500, gHeight - 60, 'open-box').setScale(2, 2);
        let board = wallObj.create(300, gHeight - 180, 'board').setScale(2, 2);
        let symbol = wallObj.create(600, gHeight - 170, 'symbol').setScale(3,3);
        
		symbol.depth = 1;
        fire.depth = 1;
        box.depth = 1;
        board.depth = 1;

        // Comandos
		this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
		this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
		this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
		this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
		this.c = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
		this.v = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V)
		this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

		
		alex.depth = 2;
        enemy.depth = 2;

        enemy.body.collideWorldBounds = true;
		alex.body.collideWorldBounds = true;
        alex.enableBody = true;
		alex.physicsBodyType = Phaser.Physics.ARCADE;
		

		alex.body.onWorldBounds = true;
		this.physics.world.once('worldbounds', (body, up, down, left, right) => {
			if(left || right)
            {
                this.scene.launch("Out")
            }
		})
        
		this.physics.add.collider(alex, platform);
        this.physics.add.collider(enemy, platform);
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

        for (let i = 0, j = 0; i < 5; i++) {
			hearts.create(50 + j, 20, 'hp').setScale(1, 1).refreshBody();
			j += 20
		}

        this.anims.create({
			key: 'medicine',
			frames: this.anims.generateFrameNames('medicine', { start: 3, end: 3 }),
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

		enemy.anims.play("run-left", true)
        
        this.tweens.add({
			targets: enemy,
			x: -400,
			duration: 18000,
			ease: 'Linear',
		})
        let isRight = false;

        this.time.addEvent({
            delay: 2000,
            callback: () => {
                if(arrow.visible)
                    arrow.setVisible(false);
                else
                    arrow.setVisible(true);
            },
            callbackScope: this,
			loop: true
        });

        this.time.addEvent({
			delay: 8100,
			callback: () => {
				isRight = !isRight
				if (!isRight) {
					enemy.anims.play("run-left", true)
					// john.anims.play("john-run-left", true)

					this.tweens.add({
						targets: enemy,
						x: -400,
						duration: 18000,
						ease: 'Linear',
					});
				} else {

					enemy.anims.play("run-right", true);
					// john.anims.play("john-run-right", true)

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
        this.arrow = arrow
		alex.anims.play("idle-right", true)
        let cursors = this.input.keyboard.createCursorKeys();
		this.cursors = cursors;
    }

    update()
    {
		let alex = this.player;
        
        if (this.cursors.left.isDown || this.a.isDown) {
			alex.setVelocityX(-200);
			this.isLeft = true
			alex.anims.play("left", true);
			
		}
		else if(this.cursors.right.isDown || this.d.isDown) {
			alex.setVelocityX(200);
			this.isLeft = false
			alex.anims.play("right", true);
		}
		else {
			alex.setVelocityX(0)
			if (this.isLeft != undefined) {
				this.isLeft ? alex.anims.play("idle-left", true) : alex.anims.play("idle-right", true)
			} else {
				alex.anims.play("idle-right", true)
			}
		}
		if (this.cursors.up.isDown && alex.body.touching.down) {
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

}