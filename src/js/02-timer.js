import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.getElementById('datetime-picker'),
  button: document.querySelector('[data-start]'),
  reset: document.querySelector('[data-reset]'),
};
const dateRef = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let periodOfTime = 0;
let timerId = null;
let timerValue = 0;

refs.button.disabled = true;

const fp = flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDate) {
    actsOnChoosenDate(selectedDate);
  },
  onOpen() {
    openedCalendar();
  },
});

function openedCalendar() {
  clearInterval(timerId);
  dateRef.days.textContent = '00';
  dateRef.hours.textContent = '00';
  dateRef.minutes.textContent = '00';
  dateRef.seconds.textContent = '00';
}

function actsOnChoosenDate(selDate) {
  periodOfTime = Date.parse(selDate[0]);

  if (periodOfTime - new Date().getTime() > 30000) {
    refs.button.disabled = false;
    refs.button.addEventListener('click', onStartBtnClick, { once: true });
  } else {
    Notify.failure('Please choose a date in the future');
    refs.button.disabled = true;
  }
}

function makeFirstTimerValue() {
  timerValue = periodOfTime - new Date().getTime();
}

function onStartBtnClick() {
  refs.input.disabled = true;
  refs.reset.addEventListener('click', onResetBtnClick);
  makeFirstTimerValue();
  timerId = setInterval(calculateAndDisplay, 1000);
}

function onResetBtnClick() {
  refs.input.disabled = false;
  openedCalendar();
}

function calculateAndDisplay() {
  const timeObj = convertMs(timerValue);
  displayTime(timeObj);
  timerValue -= 1000;
}

const addLeadingZero = value => String(value).padStart(2, '0');

function displayTime(value) {
  dateRef.days.textContent = addLeadingZero(value.days);
  dateRef.hours.textContent = addLeadingZero(value.hours);
  dateRef.minutes.textContent = addLeadingZero(value.minutes);
  dateRef.seconds.textContent = addLeadingZero(value.seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
