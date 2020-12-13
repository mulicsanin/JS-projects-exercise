const DaysEl = document.getElementById('days');
const HoursEl = document.getElementById('hours');
const MinutesEl = document.getElementById('minutes');
const SecondsEl = document.getElementById('seconds');

const newYear="1 January 2021";
function countdown()
{
    const newYearsDate=new Date(newYear);
    const currentDate=new Date();
    const total=(newYearsDate - currentDate)/1000;

    const days= Math.floor(total / 3600 / 24);
    const hours=Math.floor(total / 3600 % 24);
    const min=Math.floor(total / 60 % 60);
    const sec=Math.floor(total % 60);

    DaysEl.innerHTML=formatTime(days);
    HoursEl.innerHTML=formatTime(hours);
    MinutesEl.innerHTML=formatTime(min);
    SecondsEl.innerHTML=formatTime(sec);
    
}
function formatTime(time)
{
    return time < 10 ? `0${time}` : time;
}

// initial call
countdown()
setInterval(countdown, 1000);