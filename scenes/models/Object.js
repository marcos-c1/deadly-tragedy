export default class Object extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x = 0, y = 0, texture) {
        super(scene, x, y, texture);

        this.setPosition(x, y);
    }
}