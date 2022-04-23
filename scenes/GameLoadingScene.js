import Hospital from "./HospitalScene.js";
import Corredor from "./OutHospitalScene.js";

export let defaultConfig = 
{
    attackKey: 'c',
    especialKey: 'v'
}

class Menu extends Phaser.Scene
{

    constructor()
    {
        super({ key: 'Menu'})
    }

    preload()
    {
        this.load.audio('piano', '../assets/audio/background-sound.mp3')
        this.load.image('bg', '../assets/sprites/Scenario/Background/Forest/Background.png')

    }
    create()
    {
        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'bg')
        .setOrigin(0, 0);

        
        // Menu
        let title = this.add.text(config.width/2 - 350, 50, '', { fontSize: '64px', fontFamily: 'CustomFont', align: 'center', fill: '#ffff'})
        title.setText('Deadly Tragedy')

        let copyRight = this.add.text(10, config.height - 35, '', {fontSize: '20px', fontFamily: 'CustomFont', align: 'left', fill: "#ffff"})

        let newGame = this.add.text(config.width/2 - 200, config.height/2 - 50, '', { fontSize: '50px', fontFamily: 'CustomFont', fill: '#ffff', padding: {bottom: 10}});

        let options = this.add.text(config.width/2 - 200, config.height/2 + 10, '', { fontSize: '50px', fontFamily: 'CustomFont', fill: '#ffff', padding: {top: 10}});
        
        let audio = this.add.text(config.width/2 - 200, config.height/2 + 80, '', { fontSize: '50px', fontFamily: 'CustomFont', fill: '#ffff', padding: {top: 10}});

        newGame.setText(
            'Novo Jogo',
        ); options.setText(
            'Opcoes',
        ); audio.setText(
            'Audio',
        );
        copyRight.setText('Copyright © All rights reserved')
        
        newGame.setInteractive({ useHandCursor: true });
        options.setInteractive({ useHandCursor: true });
        audio.setInteractive({ useHandCursor: true });

        newGame.on('pointerdown', () => {
             this.scene.start('Loading')
        })
        
        newGame.on('pointerover', () => {
            newGame.setFill('#ff6666')
        })
        newGame.on('pointerout', () => {
            newGame.setFill('#ffff')
        })
        

        options.on('pointerdown', () => {
            this.scene.start('Opcoes')
        })
        options.on('pointerover', () => {
            options.setFill('#ff6666')
        })
        options.on('pointerout', () => {
            options.setFill('#ffff')
        })

       audio.on('pointerdown', () => {
            this.scene.start('Audio')
        })

        audio.on('pointerover', () => {
            audio.setFill('#ff6666')
        })
        audio.on('pointerout', () => {
            audio.setFill('#ffff')  
        })

        

        let bsound = this.sound.add('piano', { loop: true })

		bsound.play()
        bsound.eventNames();

		bsound.volume = 0.2
		bsound.rate = 1
    }
    
    update()
    {
        this.bg.tilePositionX -= 2;
    }

}

class Opcoes extends Phaser.Scene
{
    constructor()
    {
        super({key: 'Opcoes'});
    }
    preload()
    {
        this.load.image('bg', '../assets/sprites/Scenario/Background/Forest/Background.png')
    }
    create()
    {
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)


        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'bg')
            .setOrigin(0, 0);

        let ataque = this.add.text(config.width/2 - 300, config.height/2 - 150, '' , {fontFamily: "CustomFont", fontSize: '40px', fill: '#ffff'})
        ataque.setText('Tecla de Ataque: ');

        let ataqueKey = this.add.text(config.width/2 + 270, config.height/2 - 150, '' , {fontFamily: "CustomFont", fontSize: '40px', fill: '#ffff'})
        ataqueKey.setText('C')
        ataqueKey.setInteractive({ useHandCursor: true })

        this.ataque_key = 'C'

        ataqueKey.on('pointerdown', () => {
            ataqueKey.setText('__');
            ataqueKey.setFill('#ff6666')
            this.input.keyboard.once('keydown', (e) => {
                ataqueKey.setText(e.code.substring(3, e.code.length))
                this.ataque_key = e.code.substring(3, e.code.length)
                ataqueKey.setFill('#ffff')
                return;
            }, this)
        })

        
        let especial = this.add.text(config.width/2 - 300, config.height/2 - 60, '', { fontSize: '40px', fontFamily: 'CustomFont', fill: '#ffff', padding: {top: 10}});
        especial.setText('Tecla de Especial: ')
        
        
        let especialKey = this.add.text(config.width/2 + 300, config.height/2 - 60, '' , {fontFamily: "CustomFont", fontSize: '40px', fill: '#ffff'})
        especialKey.setText('V')
        especialKey.setInteractive({ useHandCursor: true })
        
        this.especial_key = 'V' 
        
        especialKey.on('pointerdown', () => {
            especialKey.setText('__');
            especialKey.setFill('#ff6666')
            this.input.keyboard.once('keydown', (e) => {
                especialKey.setText(e.code.substring(3, e.code.length))
                this.especial_key = e.code.substring(3, e.code.length)
                especialKey.setFill('#ffff')
                return;
            }, this)
        })
        


        let copyRight = this.add.text(10, config.height - 35, '', {fontSize: '20px', fontFamily: 'CustomFont', align: 'left', fill: '#ffff'})
        copyRight.setText('Copyright © All rights reserved')

        let seta = this.add.text(10, 10, '', {fontFamily: 'CustomFont', color: '#ffff', fontSize: '60px'})

        seta.setText('<')
        seta.setInteractive({ useHandCursor: true })

        seta.on('pointerdown', () => {
            this.scene.start('Menu')
        })
    }
    update()
    {
        if(this.esc.isDown){
            this.scene.start('Menu')
        }
        this.bg.tilePositionX -= 2;
        defaultConfig.attackKey = this.ataque_key
        defaultConfig.especialKey = this.especial_key
    }  
}

class Audio extends Phaser.Scene
{
    constructor()
    {
        super({key: 'Audio'});
    }
    preload()
    {
        this.load.image('bg', '../assets/sprites/Scenario/Background/Forest/Background.png')
    }
    create()
    {
        this.esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        this.bg = this.add.tileSprite(0, 0, config.width, config.height, 'bg')
            .setOrigin(0, 0);

        let volume = this.add.text(config.width/2 - 200, config.height/2 - 50, '' , {fontFamily: "CustomFont", fontSize: '50px', fill: '#ffff'})
        volume.setText('Volume: ');
        this.data.set('volume', this.sound.volume*10)

        let minus = this.add.text(config.width/2 + 60, config.height/2 - 50, '' , {fontFamily: "CustomFont", fontSize: '50px', fill: '#ffff'})
        minus.setText(' - ');
        minus.setInteractive({ useHandCursor: true });
        
        let soundItself = this.add.text(config.width/2 + 170, config.height/2 - 50, '', {fontFamily: "CustomFont", fontSize: '50px', fill: '#ffff'})

        this.volume = soundItself
        
        let plus = this.add.text(config.width/2 + 240, config.height/2 - 50, '' , {fontFamily: "CustomFont", fontSize: '50px', fill: '#ffff'})
        plus.setText(' + ');
        plus.setInteractive({ useHandCursor: true });


        minus.on('pointerdown', () => {
            if(this.sound.volume > 0.0){
                this.sound.volume -= 0.1 
            }
        })

        plus.on('pointerdown', () => {
            if(this.sound.volume < 1.0)
            {
                this.sound.volume += 0.1
            }
        })

        let mute = this.add.text(config.width/2 - 200, config.height/2 + 10, '', { fontSize: '50px', fontFamily: 'CustomFont', fill: '#ffff', padding: {top: 10}});
        mute.setText('Mute')
        mute.setInteractive({ useHandCursor: true });

        mute.on('pointerdown', () => {
            let mute = this.sound.mute
            this.sound.setMute(!mute);
        })

        let copyRight = this.add.text(10, config.height - 35, '', {fontSize: '20px', fontFamily: 'CustomFont', align: 'left', fill: '#ffff'})
        copyRight.setText('Copyright © All rights reserved')

        let seta = this.add.text(10, 10, '', {fontFamily: 'CustomFont', color: '#ffff', fontSize: '60px'})

        seta.setText('<')
        seta.setInteractive({ useHandCursor: true })

        seta.on('pointerdown', () => {
            this.scene.start('Menu')
        })
    }
    update()
    {
        let volume = this.sound.volume * 10
        
        if(this.esc.isDown){
            this.scene.start('Menu')
        }
        this.bg.tilePositionX -= 2;
        this.volume.setText(Math.ceil(volume))
    }
}

class Loading extends Phaser.Scene
{
    constructor()
    {
        super({ key: 'Loading' })
    }
    preload()
    {
        this.load.image('logo', '../assets/sprites/Scenario/Additions/donuts.png');
        for(let i = 0; i < 500; i++){
            this.load.image('logo'+i, '../assets/sprites/Scenario/Additions/donuts.png');
        }

        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(config.width/2 - 150, config.height / 2, 320, 50);


        let title = this.make.text({
            x: config.width/2 - 250, 
            y: config.height / 2 - 250, 
            text: 'Deadly Tragedy',
            style: 
            { fontSize: '45px', fontFamily: 'CustomFont', align: 'center', fill: '#ffff'}   
        });


        let loadingText = this.make.text({
            x: config.width/2 - 140, 
            y: config.height / 2 - 50, 
            text: 'Carregando...',
            style: 
            { fontSize: '30px', fontFamily: 'CustomFont', align: 'center', fill: '#ffff'}   
        });


        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xff6666, 1);
            progressBar.fillRect(config.width/2 - 150 + 10, config.height / 2 + 10, 300*value, 30)
        })

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            title.destroy();
            this.scene.start('Hospital');
        })
    }
    create()
    {
    }
    update()
    {

    }
}
const config = {
	type: Phaser.AUTO,
	width: 1200,
	height: 580,
	pixelArt: true,
	backgroundColor: 'background',
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {
				y: 300
			},
			debug: false
		}
	},
	scene: [Menu, Opcoes, Audio, Loading, Hospital, Corredor]
};

const game = new Phaser.Game(config);

export let gWidth = config.width 
export let gHeight = config.height
