export default class Person extends Phaser.Scene {
	constructor(name = String, isEnemy = Boolean) {
		super();

		this.personName = name
		this.isEnemy = isEnemy

		let rpath = '../assets/sprites'
		this.isEnemy ? this.animations =
			[
				{
					name: `${name}-run-right`,
					path: `${rpath}/Enemies/${name}/${name}_run_right.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${name}-run-left`,
					path: `${rpath}/Enemies/${name}/${name}_run_left.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${name}-idle`,
					path: `${rpath}/Enemies/${name}/${name}_idle.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${name}-hurt`,
					path: `${rpath}/Enemies/${name}/${name}_hurt.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				}
			] :
			this.animations =
			[
				{
					name: `${name}-run-right`,
					path: `${rpath}/${name}/${name}_run_right.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${name}-run-left`,
					path: `${rpath}/${name}/${name}_run_left.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${name}-idle-right`,
					path: `${rpath}/${name}/${name}_idle_right.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${name}-idle-left`,
					path: `${rpath}/${name}/${name}_idle_left.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${name}-jump-right`,
					path: `${rpath}/${name}/${name}_jump_right.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${name}-jump-left`,
					path: `${rpath}/${name}/${name}_jump_left.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${name}-hurt`,
					path: `${rpath}/${name}/${name}_hurt.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${name}-attack1-right`,
					path: `${rpath}/${name}/${name}_attack1_right.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${name}-attack1-left`,
					path: `${rpath}/${name}/${name}_attack1_left.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${name}-special-right`,
					path: `${rpath}/${name}/${name}_special_right.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
				{
					name: `${name}-special-left`,
					path: `${rpath}/${name}/${name}_special_left.png`,
					frameDimensions: { frameWidth: 48, frameHeight: 48 }
				},
			]
	}
}
