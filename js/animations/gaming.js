const MARIO_FRAMES = {
  IDLE: 'assets/mario/mario-standing.png',
  JUMP: 'assets/mario/mario-jumping.png',
  RUN_1: 'assets/mario/mario-running-1.png',
  RUN_3: 'assets/mario/mario-running-2.png',
  RUN_2: 'assets/mario/mario-running-3.png',
}

const animationIndexIterator = {
  RUN_1: 'RUN_2',
  RUN_2: 'RUN_3',
  RUN_3: 'RUN_1',
  [Symbol.iterator]() {
    return this;
  },
  next() {
    if (this.current === undefined) {
      this.current = 'RUN_3';
    } else {
      this.current = this[this.current];
    }
    return {value: this[this.current], done: false}
  }
}

export const onGamingIconClick = () => {
  const pipeSound = new Audio('assets/mario/mario-pipe-sound.mp3');
  const gameSound = new Audio('assets/mario/mario-game-sound.mp3');
  gameSound.play();
  const pipeElement = document.getElementById('mario-pipe');
  const marioElement = document.getElementById('mario');
  pipeElement.classList.add('animated');
  let marioAnimationInterval;

  setTimeout(() => {
    marioElement.classList.add('animated');
  }, 1000)

  setTimeout(() => {
    marioElement.src = MARIO_FRAMES.JUMP;
    marioElement.classList.add('moving');
  }, 3500);

  setTimeout(() => {
    marioAnimationInterval = setInterval(() => {
      const nextFrame = MARIO_FRAMES[animationIndexIterator.next().value];
      marioElement.src = nextFrame;
    }, 150)
  }, 4500)

  setTimeout(() => {
    pipeSound.play();
  }, 2000)

  setTimeout(() => {
    pipeElement.classList.remove('animated');
  }, 7000)
  setTimeout(() => {
    marioElement.classList.remove('animated');
    marioElement.classList.remove('moving');
    marioElement.src = MARIO_FRAMES.IDLE;
    clearInterval(marioAnimationInterval);
  }, 10000)
}