export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x = 0, y = 0, texture = 'SuperHuman') {
        super(scene, x, y, texture);

        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.alive = true
        this.hp = 10
        this.isRight = false
    }

    walk() {
        this.anims.play("enemy-left", true)
        this.scene.tweens.add({
            targets: this,
            x: this.x - 100,
            duration: 500,
            ease: 'Linear',
        });
        this.scene.time.addEvent({
            delay: 2500,
            callback: () => {
                this.isRight = !this.isRight
                this.isRight ? this.flipX = true : this.flipX = false
                if (this.alive) {
                    if (!this.isRight) {
                        this.anims.play("enemy-left", true)
                        this.scene.tweens.add({
                            targets: this,
                            x: this.x - 100,
                            duration: 800,
                            ease: 'Linear',
                        });

                    } else {
                        this.anims.play("enemy-right", true);
                        this.scene.tweens.add({
                            targets: this,
                            x: this.x + 200,
                            duration: 800,
                            ease: 'Linear',
                        });
                    }
                }
            },
            callbackScope: this,
            loop: true
        });
    }
    hit() {
        if (!this.alive)
            return
        if (this.hp > 0) {
            this.hp -= 1
            this.anims.play('enemy-hit')
        } else {
            this.alive = false
            this.anims.play('enemy-death')
        }
    }
}
