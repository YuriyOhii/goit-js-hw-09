const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};
let timerId = null;

refs.start.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  refs.stop.addEventListener('click', onStopBtnClick);
  refs.start.disabled = true;
  timerId = setInterval(colorBodyBG, 1000);
}

function onStopBtnClick() {
  refs.start.disabled = false;
  refs.stop.removeEventListener('click', onStopBtnClick);
  clearInterval(timerId);
}

function colorBodyBG() {
  document.body.style.backgroundColor = `${getRandomHexColor()}`;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
