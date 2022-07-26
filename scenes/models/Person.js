export default class Person extends Phaser.Physics.Arcade.Sprite{
	constructor(scene, x = 0, y = 0, name,  isEnemy = Boolean) {
		super(scene, x, y);

		this.setPosition(x, y);
		this.personName = name
		this.isEnemy = isEnemy

		let rpath = '../assets/sprites'
		this.isEnemy ? this.animations =
			[
				{
					name: `${this.personName}-run-right`,
					path: `${rpath}/Enemies/${this.personName}/${this.personName}_run_right.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${this.personName}-run-left`,
					path: `${rpath}/Enemies/${this.personName}/${this.personName}_run_left.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${this.personName}-idle`,
					path: `${rpath}/Enemies/${this.personName}/${this.personName}_idle.png`,

					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				}
			] :
			this.animations =
			[
				{
					name: `${this.personName}-run-right`,
					path: `${rpath}/${this.personName}/${this.personName}_run_right.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${this.personName}-run-left`,
					path: `${rpath}/${this.personName}/${this.personName}_run_left.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${this.personName}-idle-right`,
					path: `${rpath}/${this.personName}/${this.personName}_idle_right.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${this.personName}-idle-left`,
					path: `${rpath}/${this.personName}/${this.personName}_idle_left.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${this.personName}-jump-right`,
					path: `${rpath}/${this.personName}/${this.personName}_jump_right.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${this.personName}-jump-left`,
					path: `${rpath}/${this.personName}/${this.personName}_jump_left.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${this.personName}-hurt`,
					path: `${rpath}/${this.personName}/${this.personName}_hurt.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${this.personName}-attack1-right`,
					path: `${rpath}/${this.personName}/${this.personName}_attack1_right.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${this.personName}-attack1-left`,
					path: `${rpath}/${this.personName}/${this.personName}_attack1_left.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${this.personName}-special-right`,
					path: `${rpath}/${this.personName}/${this.personName}_special_right.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${this.personName}-special-left`,
					path: `${rpath}/${this.personName}/${this.personName}_special_left.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
			]
	}
}
