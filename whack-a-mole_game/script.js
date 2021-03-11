
  const holes = document.querySelectorAll('.hole');
  const scoreBoard = document.querySelector('.score');
  const moles = document.querySelectorAll('.mole');
  const startBtn = document.querySelector('.startBtn');
  const tbodyRef = document.querySelector('.scoreTable').getElementsByTagName('tbody')[0];
  let lastHole;
  let timeUp = false;
  let score = 0;
  let leaderScore;

  function randomTime(min, max){
    return Math.round(Math.random() * (max-min) + min);
  }

  function randomHole(holes){
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if(lastHole === hole){
      return randomHole(holes);
    }
    
    lastHole = hole;
    return hole;
  }

  function peep()
  {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    //console.log(time, hole);
    hole.classList.add('up');  
    setTimeout(() => {
      hole.classList.remove('up');  
      if(!timeUp)
      {
        peep();
      }
    }, time)
  }


  function startGame()
  {
    var nick = prompt('Unesite nickname: ', 'Mujo Mujic');
    score = 0;
    scoreBoard.textContent = score;
    timeUp = false;

    peep();
    setTimeout(() => {
        timeUp = true;
        //adding new row in table
        var newRow = tbodyRef.insertRow();
        //adding two cells (nickname, score)
        var cell1 = newRow.insertCell();
        var cell2 = newRow.insertCell();
        //making textnode from variables
        var NICK = document.createTextNode(nick);
        var SCORE = document.createTextNode(scoreBoard.textContent);
        //appending into the cells
        cell1.appendChild(NICK);
        cell2.appendChild(SCORE);
    }, 10000);
  }

  function bonk(e){
    if(!e.isTrusted) return; //cheater
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
  }

  moles.forEach(mole => mole.addEventListener('click', bonk));


function compareValues(a, b){
  return (a<b) ? -1 : (a>b) ? 1 : 0;
}
function compareScore(a, b){
  return (a<b) ? 1 : (a>b) ? -1 : 0;
}

function sortTable(col)
{
  let rows = Array.from(tbodyRef.querySelectorAll('tr'));

  let qs = `td:nth-child(${col+1})`;
  console.log(qs);
  rows.sort((r1, r2) =>{
    let t1 = r1.querySelector(qs);
    let t2 = r2.querySelector(qs);
    
    if(qs == 'td:nth-child(2)'){
      return compareScore(t1.textContent.toLowerCase(), t2.textContent.toLowerCase());
    }
    else{
      return compareValues(t1.textContent.toLowerCase(), t2.textContent.toLowerCase());
    }
    
  });

  rows.forEach(row => tbodyRef.appendChild(row));
}