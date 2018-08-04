import { TimelineMax } from 'gsap';
import Draggable from 'gsap/Draggable'

export const enter = () => {
  let timeline = new TimelineMax();
  timeline
    .from('#body,#tail', 1, { scale: 0, ease: Bounce.easeOut })
    .yoyo(true);
}

export const moveRightAndRotate = () => {
  let timeLine = new TimelineMax();
  timeLine
    .to('#body,#tail', 2, { x: 500, rotation: 360 });
}

export const wagTail = () => {
  let timeLine = new TimelineMax();
  timeLine.to('#tail', 0.3, {rotation:-30, transformOrigin:"bottom", repeat: -1});
}

// export const breathing = () => {
//   let timeLine1 = new TimelineMax();
//   timeLine1.to('#body', 3, {scale: 0.5, repeat: 5});
//   let timeLine3 = new TimelineMax();
//   timeLine1.to('#blink', 3, {scale: 0.5, repeat: 5});
//   let timeLine2 = new TimelineMax();
//   timeLine2.to('#tail', 3, {scale: 0.5, x: 27, y: 50, repeat: 5});
  
// }

export const blinking = () => {
  const blink =document.getElementById('blink');
  setInterval(function() {
    blink.style.display = 'block';
    setTimeout(function() {
      blink.style.display = 'none';
    }, 100);
  }, 4000 + 2000*Math.random());
}

export const treatTime = () => {
  Draggable.create("#treat-image");
  const mouth =document.getElementById('mouth');
  mouth.style.display = 'block';
  let timer;
  if (!timer) {
    timer = setInterval(function() {
      setTimeout(function() {
        mouth.style.display = 'none';
      }, 2000 + 1000*Math.random());
      mouth.style.display = 'block';
    }, 4000 + 2000*Math.random());
  } else {
    clearInterval(timer);
  }
}

export const bark = () => {
  const audio = document.getElementsByTagName('AUDIO')[0];
  audio.play();
  const barking = document.getElementById('barking');
  const notBarking = document.getElementById('not-barking');
  setTimeout(function() {
    notBarking.style.display = 'none';
    barking.style.display = 'block';
    setTimeout(function() {
      notBarking.style.display = 'block';
      barking.style.display = 'none';
      setTimeout(function() {
        notBarking.style.display = 'none';
        barking.style.display = 'block';
        setTimeout(function() {
          notBarking.style.display = 'block';
          barking.style.display = 'none';
          setTimeout(function() {
            notBarking.style.display = 'none';
            barking.style.display = 'block';
            setTimeout(function() {
              notBarking.style.display = 'block';
              barking.style.display = 'none';
              setTimeout(function() {
                notBarking.style.display = 'none';
                barking.style.display = 'block';
                setTimeout(function() {
                  notBarking.style.display = 'block';
                  barking.style.display = 'none';
                  setTimeout(function() {
                    notBarking.style.display = 'none';
                    barking.style.display = 'block';
                    setTimeout(function() {
                      notBarking.style.display = 'block';
                      barking.style.display = 'none';
                    }, 200);
                  }, 400);
                }, 200);
              }, 600);
            }, 200);
          }, 600);
        }, 200);
      }, 500);
    }, 200);
  }, 2400);

}