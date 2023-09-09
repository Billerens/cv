import { explode } from "../explosions.js";
import { colors, bubbles } from "../constants.js";

export const onCssPercentClick = () => {
  const cssPercentElement = document.getElementById('css-percent');
  const breakElement = document.getElementById('break');
  const containerElement = document.getElementById('container');

  if (!cssPercentElement.classList.contains('animated')) {
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
}