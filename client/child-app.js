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
let mum;
let cursors;
let treat1;
let count = 0;
let treat2;
let mumInRoom = false;
let gameover = false;
var score = 0;
let divider1 = 100;
let divider2 = 120;
let watching = false;
let even = true;
let youWon = false;

let game = new Phaser.Game(config);

function preload ()
{
  this.load.spritesheet('shubie', 
    '../public/assets/shubienew.png',
    { frameWidth: 32, frameHeight: 32 }
  );
  this.load.spritesheet('mum', 
    '../public/assets/mum.png',
    { frameWidth: 32, frameHeight: 32 }
  );
  this.load.image('treat1', '../public/assets/treat1.png');
  this.load.image('treat2', '../public/assets/treat2.png');
  this.load.image('treat3', '../public/assets/treat3.png');
  this.load.image('home', '../public/assets/newhome.png');
}

function create ()
{  
  this.add.image(190, 260,'home');
  player = this.physics.add.sprite(190, 350, 'shubie');
  player.setDisplaySize(80,80)

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  
  mum = this.physics.add.sprite(380, 500, 'mum');
  mum.setDisplaySize(80,80)
  mum.visible = false;

  mum.setBounce(0.2);
  mum.setCollideWorldBounds(true);

  this.generateTreat1 =  () => {
    const x =  10+Math.random()*360
    treat1 = this.physics.add.sprite(x, 1, 'treat1');
    treat1.setDisplaySize(20,20)
    this.physics.add.overlap(player, treat1, collectTreat1, null, this);
    this.physics.add.overlap(mum, treat1, vacuumTreat1, null, this);
    treat1.setCollideWorldBounds(true);
  }

  this.generateTreat2 =  () => {
    const x =  10+Math.random()*360
    treat2 = this.physics.add.sprite(x, 1, 'treat2');
    treat2.setDisplaySize(20,20)
    this.physics.add.overlap(player, treat2, collectTreat2, null, this);
    this.physics.add.overlap(mum, treat2, vacuumTreat2, null, this);
    treat2.setCollideWorldBounds(true);
  }

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

  this.anims.create({
    key: 'enter',
    frames: this.anims.generateFrameNumbers('mum', { start: 3, end: 5 }),
    frameRate: 4,
    repeat: 0,
  });

  this.anims.create({
    key: 'watch',
    frames: this.anims.generateFrameNumbers('mum', { start:2, end: 2 }),
    frameRate: 4,
    repeat: 5,
  });

  this.anims.create({
    key: 'leave',
    frames: this.anims.generateFrameNumbers('mum', { start: 6, end: 8 }),
    frameRate: 4,
    repeat: 5,
  });

  cursors = this.input.keyboard.createCursorKeys();

  scoreText = this.add.text(16, 16, 'Fullness: 0', { fontSize: '20px', fill: '#777' });
}

function update ()
{ 
  if (gameover) {
    scoreText.setText('GAME OVER!');
    return;
  }

  if (youWon) {
    scoreText.setText('Shubie is full!');
    return;
  }
  count += 1;
  while (divider1 > 40) {
    divider1 -= 1;
  }
  while (divider2 > 50) {
    divider2 -= 2;
  }
  if (cursors.right.isDown && cursors.up.isDown) {
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
  if (count%divider1 === 0 && !mumInRoom) {
    this.generateTreat1();
  }
  if (count%divider2 === 0 && !mumInRoom) {
    this.generateTreat2();
  }
  if (watching && !cursors.down.isDown) {
    score -= 1;
    scoreText.setText('Fullness: ' + score);
    if (score <= 0) {
      scoreText.setText('Fullness: ' + (score >= 0 ? score : 0));
      gameover = true;
    }
  }

  if (count%(800) === 0 && even) {
    const randomTime = 2200*Math.random();
    mum.body.x = 400;
    mum.visible = true;
    mum.setVelocityX(-130);
    mum.anims.play('enter');
    mumInRoom = true;
    setTimeout(() => {
      mum.setVelocityX(0);
      mum.anims.play('watch');
      watching = true;
      let enterOrLeave = Math.random();
      if (enterOrLeave > 0.3) {
        setTimeout(() => {
          mum.setVelocityX(-130);
          mum.anims.play('enter');
          setTimeout(() => {
            watching = false;
            mum.visible = false;
            mumInRoom = false;
            mum.setVelocityX(0);
            even = false;
          }, 2200 - randomTime);
        }, 2400);
      } else {
        setTimeout(() => {
          mum.setVelocityX(130);
          mum.anims.play('leave');
          setTimeout(() => {
            watching = false;
            mum.visible = false;
            mumInRoom = false;
            mum.setVelocityX(0);
          }, randomTime);
        }, 2400);
      }
    }, randomTime);
  }

  if (count%(800) === 0 && !even) {
    const randomTime = 2200*Math.random();
    mum.body.x = 0;
    mum.visible = true;
    mum.setVelocityX(130);
    mum.anims.play('leave');
    mumInRoom = true;
    setTimeout(() => {
      mum.setVelocityX(0);
      mum.anims.play('watch');
      watching = true;
      let enterOrLeave = Math.random();
      if (enterOrLeave > 0.3) {
        setTimeout(() => {
          mum.setVelocityX(130);
          mum.anims.play('leave');
          setTimeout(() => {
            watching = false;
            mum.visible = false;
            mumInRoom = false;
            mum.setVelocityX(0);
            even = true;
          }, 2200 -randomTime);
        }, 2400);
      } else {
        setTimeout(() => {
          mum.setVelocityX(-130);
          mum.anims.play('enter');
          setTimeout(() => {
            watching = false;
            mum.visible = false;
            mumInRoom = false;
            mum.setVelocityX(0);
          },randomTime);
        }, 2400);
      }
    }, randomTime);
  }
}

function collectTreat1 (player, treat) {   
  treat.disableBody(true, true);
  score += 1;
  scoreText.setText('Fullness: ' + score);
  if (score >= 100) {
    scoreText.setText('Shubie is full!');
    youWon = true;
  }
}

function collectTreat2 (player, treat) {   
  treat.disableBody(true, true);
  score += 3;
  scoreText.setText('Fullness: ' + score);
  scoreText.setText('Fullness: ' + score);
  if (score >= 100) {
    scoreText.setText('Shubie is full!');
    youWon = true;
  }
}

function vacuumTreat1 (mum, treat) {   
  if (mum.visible) {
    treat.disableBody(true, true);
    score -= 5;
    scoreText.setText('Fullness: ' + score);
    if (score <= 0) {
      scoreText.setText('Fullness: ' + (score >= 0 ? score : 0));
      gameover = true;
    }
  }
}

function vacuumTreat2 (mum, treat) { 
  if (mum.visible) {
    treat.disableBody(true, true);
    score -= 10;
    scoreText.setText('Fullness: ' + score);
    if (score <= 0) {
      scoreText.setText('Fullness: ' + (score >= 0 ? score : 0));
      gameover = true;
    }
  }
}
