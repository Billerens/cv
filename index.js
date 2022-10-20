const onCssPercentClick = () => {
  const cssPercentElement = document.getElementById('css-percent');
  const breakableElement = document.getElementById('breakable');
  const containerElement = document.getElementById('container');

  cssPercentElement.classList.add('animated');
  containerElement.classList.add('animated');
  setTimeout(() => breakableElement.classList.add('animated'), 1000);
}