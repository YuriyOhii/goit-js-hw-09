import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onFormSubmit);


function onFormSubmit(e) {
  e.preventDefault();
  const { amount, delay, step } = e.target.elements;
  const value = {
    firstDelay: delay.valueAsNumber,
    stepDelay: step.valueAsNumber,
    amount: amount.valueAsNumber,
  };
  makePluralPromises(value);
}

function makePluralPromises({ firstDelay, stepDelay, amount }) {
  let delay = firstDelay;
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += stepDelay;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(position, delay);
      } else {
        reject(position, delay);
      }
    }, delay);
  });
  return promise;
}

