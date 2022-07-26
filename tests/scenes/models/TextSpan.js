export default class TextSpan extends Phaser.GameObjects.Text {
    constructor(scene, x = 0, y = 0, text, style){
        super(scene, x, y, text, style)
        
        this.scene.add.existing(this)

        this.setInteractive({ useHandCursor: true })
        this.visible = false
        this.on('pointerdown', () => {
            scene.scene.restart()
        }, this)
        
    }

    show() {
        this.visible = true
        this.depth = 1
        
    }
}