export default class Bar extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'Bar' })
    }

    preload()
    {
        this.load.spritesheet('bar_wall', '../../assets/sprites/Scenario/Objects/Hospital Environment Mini Asset - Expansion Pack 1/tilemap/bar_walls.png', { frameWidth: 25, frameHeight: 20})

        this.load.spritesheet('hp', '../assets/sprites/Health-Bar/heart_animated_1.png',
			{ frameWidth: 16, frameHeight: 16 })
    }
    create()
    {
		let walls = this.physics.add.staticGroup();
		walls.depth = -1;
        let hearts = this.physics.add.staticGroup();

        for(let i = 0, l = 20; i < 12; i++)
		{
			for(let k = 0, j = 25; k < 30; k++)
			{
				walls.create(0+j, l, 'bar_wall').setScale(3,3).refreshBody();
				j += 45;
			}
			l += 47;
		}

        for (let i = 0, j = 0; i < 5; i++) {
			hearts.create(50 + j, 20, 'hp').setScale(1, 1).refreshBody();
			j += 20
		}

        let alex = this.physics.add.sprite(100, 450, 'Alex-run-right').setScale(3, 3);
		alex.depth = 2;

		alex.enableBody = true;
		alex.physicsBodyType = Phaser.Physics.ARCADE;
		
		alex.body.collideWorldBounds = true;

        // Comandos
		this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
		this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
		this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
		this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
		this.c = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
		this.v = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V)
		this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

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

		this.player = alex
		this.hp = hearts;
		let cursors = this.input.keyboard.createCursorKeys();
        this.cursors = cursors;
		alex.anims.play("idle-right", true)

    }
    update()
    {

    }
}