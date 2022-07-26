export default class Item extends Phaser.Physics.Arcade.Image {
    constructor(scene, x = 0, y = 0, texture, flip = false) {
        super(scene, x, y, texture);
        this.setPosition(x, y);
        this.depth = 1
        scene.add.existing(this);
        if(flip) this.flipX = true
    }
}