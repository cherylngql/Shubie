const { remote, BrowserWindow } = window.require('electron')
const currentWindow = remote.getCurrentWindow()
const exitGame = document.getElementById("close-child");
const Phaser = require('phaser');

exitGame.addEventListener('click', function(evt) {
  currentWindow.close();
})

var config = {
  type: Phaser.CANVAS,
  width: 380,
  height: 520,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

let player;
let cursors;
let treat1;
let treat2;
let treat3;

let game = new Phaser.Game(config);

function preload ()
{
  this.load.spritesheet('shubie', 
    '../public/assets/shubienew.png',
    { frameWidth: 32, frameHeight: 32 }
  );
  this.load.image('treat1', '../public/assets/treat1.png');
  this.load.image('treat2', '../public/assets/treat2.png');
  this.load.image('treat3', '../public/assets/treat3.png');
}

function create ()
{
  player = this.physics.add.sprite(190, 450, 'shubie');
  player.setDisplaySize(90,90)


  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  // treat1 = this.physics.add.group({
  //   key: 'treat1',
  //   repeat: 10,
  //   setXY: { x: Phaser.Math.Between(0, 380), y: 0 }
  // });

  // treat1.scale.setTo(0.1,0.1);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('shubie', { start: 12, end: 15 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [ { key: 'shubie', frame: 0 } ],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('shubie', { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'rightRun',
    frames: this.anims.generateFrameNumbers('shubie', { start: 32, end: 34 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'leftRun',
    frames: this.anims.generateFrameNumbers('shubie', { start: 8, end: 10 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'sit',
    frames: this.anims.generateFrameNumbers('shubie', { start: 16, end: 19 }),
    frameRate: 4,
    repeat: 0
  });
    
  this.anims.create({
    key: 'sitting',
    frames: this.anims.generateFrameNumbers('shubie', { start: 19, end: 19 }),
    frameRate: 4,
    repeat: -1,
  });

  cursors = this.input.keyboard.createCursorKeys();
}

function update ()
{ if (cursors.right.isDown && cursors.up.isDown) {
    player.setVelocityX(300);
    player.anims.play('rightRun', true);
  } else if (cursors.left.isDown && cursors.up.isDown) {
    player.setVelocityX(-300);
    player.anims.play('leftRun', true);
  } else if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  } else if (cursors.down.isDown) {
    player.setVelocityX(0);
    player.anims.play('sit', true);
    player.anims.currentFrame.index === 19;
    player.anims.play('sitting', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }
}