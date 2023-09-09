import { onPlaneClick, onPlaneAppear } from './animations/plane.js';
import { onCssPercentClick } from './animations/css.js';
import { onGamingIconClick } from './animations/gaming.js';

window.onload = () => {
  onPlaneAppear()
};

window.onPlaneClick = onPlaneClick;
window.onCssPercentClick = onCssPercentClick;
window.onGamingIconClick = onGamingIconClick;