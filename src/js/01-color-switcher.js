const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;
startButton.addEventListener('click', function () {
  if (timerId === null) {
    timerId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }
  console.log('click');
  startButton.disabled = true;
  startButton.style.opacity = 0.5;
  stopButton.disabled = false;
  stopButton.style.opacity = 1;
});

stopButton.addEventListener('click', function () {
  clearInterval(timerId);
  timerId = null;
  startButton.style.opacity = 1;
  startButton.disabled = false;
  stopButton.disabled = true;
  stopButton.style.opacity = 0.5;
});
