
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


let userSelectedDate;

const refs = {
  inptElem: document.querySelector("#datetime-picker"),
  btnElem: document.querySelector("[data-start]"),
  dayElem: document.querySelector("[data-days]"),
  hoursElem: document.querySelector("[data-hours]"),
  minutesElem: document.querySelector("[data-minutes]"),
  secondsElem: document.querySelector("[data-seconds]"),
};

refs.btnElem.disabled = true;

const fp = flatpickr(refs.inptElem, {    
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0].getTime() > Date.now()){
        userSelectedDate = selectedDates[0].getTime();
        refs.btnElem.disabled = false;
      } else {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FFFFFF',
          titleSize: '16px',
          backgroundColor: '#EF4040',
          iconUrl: '../img/bi_x-octagon.svg',
          message: 'Please choose a date in the future',
          position: 'topRight',
          color: 'red',
          messageColor: '#FFFFFF',
          messageSize: '16px',
          closeOnEscape: true,
          closeOnClick: true,
          theme: 'dark',
      });
      refs.btnElem.disabled = true;
      }
    },}
);

let timerID

refs.btnElem.addEventListener('click', handlerBtnClick);

function handlerBtnClick(){
  console.log(userSelectedDate);
  refs.btnElem.disabled = true;
  refs.inptElem.disabled = true;
  timerID = setInterval(()=>{
    const currentTime = Date.now();
    const diff = userSelectedDate - currentTime;
    const times = convertMs(diff);
    addLeadingZero(times);
    if (diff < 1000) {
      clearInterval(timerID);
      refs.inptElem.disabled = false;
    }
  }, 1000)
};


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


function addLeadingZero({ days, hours, minutes, seconds }) {
  refs.dayElem.textContent = String(days).padStart(2, '0');
  refs.hoursElem.textContent = String(hours).padStart(2, '0');
  refs.minutesElem.textContent = String(minutes).padStart(2, '0');
  refs.secondsElem.textContent = String(seconds).padStart(2, '0');
}