import { Notify } from 'notiflix/build/notiflix-notify-aio';

const submitButton = document.querySelector('button[type="submit"]');
const form = document.querySelector('.form');

const timeAlert = 3000;

form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  submitButton.disabled = true;
  submitButton.style.opacity = 0.5;

  createAllPromises(e);
}

function createAllPromises({ target: { delay, step, amount } }) {
  const amountValue = Number(amount.value);
  let delayTime = Number(delay.value);
  const stepTime = Number(step.value);

  for (let i = 1; i <= amountValue; i++, delayTime += stepTime) {
    if (i === amountValue) {
      buttonAnable(delayTime);
    }
    createPromise(i, delayTime)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`, {
          timeout: timeAlert,
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
          timeout: timeAlert,
        });
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function buttonAnable(delay) {
  setTimeout(() => {
    submitButton.disabled = false;
    submitButton.style.opacity = 1;
  }, delay + timeAlert);
}
