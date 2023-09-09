const colors = {
  explosion: ['#ffc000', '#ff3b3b', '#ff8400'],
  flight: ['#d5edff', '#a5d4ff', '#6daaee', '#3858f9', '#043c9a']
};
const bubbles = {
  explosion: 25,
  flight: 7,
};

let planeInterval;

const onCssPercentClick = () => {
  const cssPercentElement = document.getElementById('css-percent');
  const breakElement = document.getElementById('break');
  const containerElement = document.getElementById('container');

  cssPercentElement.classList.add('animated');
  containerElement.classList.add('animated');
  setTimeout(() => {
    breakElement.classList.add('animated');
    const {x, y} = breakElement.getBoundingClientRect();
    explode({
      x: x + window.scrollX, 
      y: y + window.scrollY, 
      pallete: colors.explosion, 
      count: bubbles.explosion
    });
  }, 1000);
}

const listenDomLoaded = (event) => {
  onPlaneAppear();
}

document.addEventListener("DOMContentLoaded", listenDomLoaded);

const cleaners = {
  '4500': () => {
    document.removeEventListener('DOMContentLoaded', listenDomLoaded);
    clearInterval(planeInterval);
  }
}

Object.keys(cleaners).map((timeout) => {
  setTimeout(cleaners[timeout], timeout);
})

const onPlaneAppear = () => {
  const planeElement = document.getElementById('paper-plane');

  planeInterval = setInterval(() => {
    const {x, y} = planeElement.getBoundingClientRect();
    explode({
      x: x + window.scrollX + 10, 
      y: y + window.scrollY + 40, 
      pallete: colors.flight, 
      count: bubbles.flight,
      sizeFrom: 5,
      sizeTo: 15,
    });
  }, 150);
}

const onPlaneClick = () => {
  const planeElement = document.getElementById('paper-plane');
  const planeParent = planeElement.parentNode;
  const clonedPlaneElement = planeElement.cloneNode(true);

  planeElement.classList.add('animated');

  const planeClickInterval = setInterval(() => {
    const {x, y} = document
      .getElementById('paper-plane')
      .getBoundingClientRect();

    explode({
      x: x + window.scrollX + 10, 
      y: y + window.scrollY + 40, 
      pallete: colors.flight, 
      count: bubbles.flight,
      sizeFrom: 5,
      sizeTo: 15,
    });
  }, 150);
  setTimeout(() => {
    planeElement.remove();
    planeParent.insertBefore(clonedPlaneElement, planeParent.firstChild);
    setTimeout(() => {
      clearInterval(planeClickInterval);
    }, 4000);
  }, 2000)
}


const explode = ({
  x, y, pallete, count, 
  sizeFrom, sizeTo,
}) => {
  let particles = [];
  let ratio = window.devicePixelRatio;
  let c = document.createElement('canvas');
  let ctx = c.getContext('2d');

  const rand = (a, b, c) => parseFloat((Math.random() * ((a ? a : 1) - (b ? b : 0)) + (b ? b : 0)).toFixed(c ? c : 0));

  const render = (particles, ctx, width, height) => {
    requestAnimationFrame(() => render(particles, ctx, width, height));
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.speed * Math.cos(p.rotation * Math.PI / 180);
      p.y += p.speed * Math.sin(p.rotation * Math.PI / 180);

      p.opacity -= 0.01;
      p.speed *= p.friction;
      p.radius *= p.friction;
      p.yVel += p.gravity;
      p.y += p.yVel;

      if (p.opacity < 0 || p.radius < 0) return;

      ctx.beginPath();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
      ctx.fill();
    });

    return ctx;
  }

  c.style.position = 'absolute';
  c.style.left = (x - 100) + 'px';
  c.style.top = (y - 100) + 'px';
  c.style.pointerEvents = 'none';
  c.style.width = 200 + 'px';
  c.style.height = 200 + 'px';
  c.style.zIndex = 100;
  c.width = 200 * ratio;
  c.height = 200 * ratio;
  document.body.appendChild(c);

  for (let i = 0; i < count; i++) {
    particles.push({
      x: c.width / 2,
      y: c.height / 2,
      radius: rand(sizeFrom ?? 20, sizeTo ?? 30),
      color: pallete[Math.floor(Math.random() * pallete.length)],
      rotation: rand(0, 360, true),
      speed: rand(8, 12),
      friction: 0.9,
      opacity: rand(0, 0.5, true),
      yVel: 0,
      gravity: 0.1
    });
  }

  render(particles, ctx, c.width, c.height);
  setTimeout(() => document.body.removeChild(c), 1000);
}

const onGamingIconClick = () => {
  // TODO
}

const onCodingIconClick = () => {
  // TODO
}

const onCookingIconClick = () => {
  // TODO
}

const onLocationIconClick = () => {
  // TODO
}

const onEmailClick = () => {
  // TODO
}

const onProfilePhotoClick = () => {
  // TODO
}