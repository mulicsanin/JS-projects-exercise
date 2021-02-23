const secondHand = document.querySelector('.second-hand');
    const minHand = document.querySelector('.min-hand');
    const hourHand = document.querySelector('.hour-hand');

    function setDate(){
      const now = new Date();

      //seconds
      const seconds = now.getSeconds();
      const secDegrees = ((seconds / 60) * 360) + 90;
      secondHand.style.transform = `rotate(${secDegrees}deg)`;
      //minutes
      const minutes = now.getMinutes();
      const minDegrees = ((minutes / 60) * 360) + 90;
      minHand.style.transform = `rotate(${minDegrees}deg)`;
      
      //hours
      const hours = now.getHours();
      const hourDegrees = ((hours / 12) * 360) + 90;
      hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    }
  
    setInterval(setDate, 1000);
