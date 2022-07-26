import HealthBar from "./HealthBar.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
	constructor(scene, x = 0, y = 0, texture = 'Alex', hp = null) {
		super(scene, x, y, texture);

		scene.add.existing(this)
		scene.physics.add.existing(this)

		this.hp = hp == null ? new HealthBar(scene, 30, 30) : new HealthBar(scene, 30, 30, hp)
		this.alive = true

		scene.events.on('update', this.update, this)
	}

	damage(amount) {

		if (this.hp.decrease(amount)) {
			this.alive = false
		}
	}

	update() {

		if (this.scene) {
			if (this.scene.cursors.up.isDown || this.scene.keyW.isDown) {
				this.y += -5
				this.anims.play('jump', true)
			} else if (this.scene.cursors.left.isDown || this.scene.keyA.isDown) {
				this.x -= 5
				this.flipX = true
				this.anims.play('left', true)
			} else if (this.scene.cursors.right.isDown || this.scene.keyD.isDown) {
				this.x += 5
				this.flipX = false
				this.anims.play('right', true)
			} else if (this.scene.keyC.isDown) {
				this.anims.play('punch', true)
			} else {
				this.setVelocityX(0)
				this.anims.play('idle', true)
			}
		}


	}
}
