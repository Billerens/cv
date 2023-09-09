import { explode } from "../explosions.js";
import { colors, bubbles } from "../constants.js";

let planeInterval;

const PLANE_FLIGHT_DURATION = 4000;
const PLANE_OUT_DURATION = 2000;
const PLANE_EXPLOSION_INTERVAL = 150;

export const onPlaneAppear = () => {
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

  setTimeout(() => {
    clearInterval(planeInterval);
  }, PLANE_FLIGHT_DURATION);
};

export const onPlaneClick = () => {
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
  }, PLANE_EXPLOSION_INTERVAL);
  setTimeout(() => {
    planeElement.remove();
    planeParent.insertBefore(clonedPlaneElement, planeParent.firstChild);
    setTimeout(() => {
      clearInterval(planeClickInterval);
    }, PLANE_FLIGHT_DURATION);
  }, PLANE_OUT_DURATION)
};
