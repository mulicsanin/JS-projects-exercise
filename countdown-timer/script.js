const DaysEl = document.getElementById('days');
const HoursEl = document.getElementById('hours');
const MinutesEl = document.getElementById('minutes');
const SecondsEl = document.getElementById('seconds');

const title = document.getElementById('title');
const btnClicked = document.querySelectorAll('[data-target]');

const input = document.getElementById('pickTitle');
const form = document.getElementById('form');
const dateEl = document.getElementById('pickDate');

const storedTitle = localStorage.getItem('Title');
const storedDate = localStorage.getItem('Date');

//manually added time for first site visiting
var time = '1 January 2022';

// making sure if something was saved previously
if (storedTitle && storedDate) {
  time = storedDate;
  title.innerHTML = storedTitle;
}

// countdown from currentDate
function countdown() {
  const newDate = new Date(time);
  const currentDate = new Date();
  const total = (newDate - currentDate) / 1000;

  const days = Math.floor(total / 3600 / 24);
  const hours = Math.floor((total / 3600) % 24);
  const min = Math.floor((total / 60) % 60);
  const sec = Math.floor(total % 60);

  DaysEl.innerHTML = formatTime(days);
  HoursEl.innerHTML = formatTime(hours);
  MinutesEl.innerHTML = formatTime(min);
  SecondsEl.innerHTML = formatTime(sec);
}
// formatTime will make numbers smaller than 10 start with 0
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}
// initial call
countdown();
setInterval(countdown, 1000);

// Buttons clicked for event
btnClicked.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    title.innerHTML = btn.innerHTML;
    saveToLocalStorage('Title', title.innerHTML);
    if (btn.innerHTML === 'Aid') {
      time = '09 July 2022';
    } else if (btn.innerHTML === 'Christmas') {
      time = '25 December 2021';
    } else {
      time = '1 January 2022';
    }
    saveToLocalStorage('Date', time.toString());
    countdown();
    setInterval(countdown, 1000);
  });
});

// Saving values to Local Storage
function saveToLocalStorage(storedName, storedValue) {
  localStorage.setItem(storedName, storedValue);
}

//on submit, values will go to screen and will be saved in LS
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputTEXT = input.value;
  time = dateEl.value;
  if (inputTEXT) {
    title.innerHTML = inputTEXT;
  }
  saveToLocalStorage('Title', title.innerHTML);
  saveToLocalStorage('Date', time.toString());
  input.value = '';
  dateEl.value = '1/1/2021';
  countdown();
  setInterval(countdown, 1000);
});
