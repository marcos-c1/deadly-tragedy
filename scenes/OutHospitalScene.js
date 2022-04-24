import Person from "./models/Person.js"
import { defaultConfig, gHeight, gWidth } from "./GameLoadingScene.js"
import Bar from "./Bar.js"

export default class Out extends Phaser.Scene {
    
    constructor() {
        super({ key: 'Out' })
    }

    preload() {
        let Alex = new Person("Alex", false)
		let Enemy = new Person("SuperHuman", true)
       
        Alex.animations.map((a) => {
			this.load.spritesheet(a.name, a.path, a.frameDimensions)
		})
		Enemy.animations.map((a) => {
			this.load.spritesheet(a.name, a.path, a.frameDimensions)
		})

		this.load.image('plat', '../assets/sprites/Scenario/Tiles/IndustrialTile_75.png')

		this.load.image('flag', '../assets/sprites/Scenario/Objects/Flag.png')

		this.load.image('barrel_2', '../assets/sprites/Scenario/Objects/Barrel2.png')

		this.load.image('barrel_1', '../assets/sprites/Scenario/Objects/Barrel1.png')

		this.load.image('sign', '../assets/sprites/Scenario/Objects/Pointer1.png')

		this.load.image('crate', '../assets/sprites/Scenario/Objects/Box8.png')

		this.load.image('bar', '../assets/sprites/Scenario/Bodies/13.png')


        this.load.spritesheet('hp', '../assets/sprites/Health-Bar/heart_animated_1.png',
			{ frameWidth: 18, frameHeight: 16 })
    
        this.load.image('bkg', '../assets/sprites/Scenario/Background/Background.png');
    }

    create() {
		let platform = this.physics.add.staticGroup();
		let outObj = this.physics.add.staticGroup();
        let hearts = this.physics.add.staticGroup();
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

        let alex = this.physics.add.sprite(100, gHeight - 90, 'Alex-run-right').setScale(3, 3);

		alex.body.collideWorldBounds = true;
		alex.depth = 2;
        alex.enableBody = true;
		alex.physicsBodyType = Phaser.Physics.ARCADE;
		

		alex.body.onWorldBounds = true;
		this.physics.world.once('worldbounds', (body, up, down, left, right) => {
			if(left || right)
            {
                this.scene.launch("")
            }
		})
        
		this.physics.add.collider(alex, platform);

        this.bg = this.add.tileSprite(0, 0, gWidth, gHeight, 'bkg')
        .setOrigin(0, 0).setScale(2, 1.76);
		this.bg.depth = -1

        // Comandos
        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        this.c = this.input.keyboard.addKey(defaultConfig.attackKey)
        this.v = this.input.keyboard.addKey(defaultConfig.especialKey)
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        for (let i = 0, j = 0; i < 5; i++) {
			hearts.create(50 + j, 20, 'hp').setScale(1, 1).refreshBody();
			j += 20
		}

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

        this.player = alex
		alex.anims.play("idle-right", true)
        let cursors = this.input.keyboard.createCursorKeys();
        this.cursors = cursors;
    }

    update() {
        let alex = this.player;

		if(alex.x >= 900)
		{
			this.scene.stop("Out");
			this.scene.launch("Bar");
		} 
		
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