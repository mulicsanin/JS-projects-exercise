const DaysEl = document.getElementById('days');
const HoursEl = document.getElementById('hours');
const MinutesEl = document.getElementById('minutes');
const SecondsEl = document.getElementById('seconds');

var time="1 January 2021";
function countdown()
{
    const newDate=new Date(time);
    const currentDate=new Date();
    const total=(newDate - currentDate)/1000;

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
countdown();
setInterval(countdown, 1000);

const title=document.getElementById('title');
const aid=document.getElementById("aid");
const christmas=document.getElementById("christmas");
const newYear=document.getElementById("newY");

aid.addEventListener('click', (e) => {
    e.preventDefault();
    title.innerHTML="Aid"
    time="20 July 2021";
    countdown();
    setInterval(countdown, 1000);
});
christmas.addEventListener('click', (e) => {
    e.preventDefault();
    title.innerHTML="Christmas"
    time="26 December 2020";
    countdown();
    setInterval(countdown, 1000);
})
newY.addEventListener('click', (e) => {
    e.preventDefault();
    title.innerHTML="New Year"
    time="1 January 2021";
    countdown();
    setInterval(countdown, 1000);
})

const input=document.getElementById('pickTitle');
const form=document.getElementById('form');
const dateEl=document.getElementById('pickDate');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputTEXT=input.value;
    time=dateEl.value;
    if(inputTEXT)
    {
        title.innerHTML=inputTEXT;
    }
    input.value="";
    dateEl.value="1/1/2020";
    countdown();
    setInterval(countdown, 1000);
});


