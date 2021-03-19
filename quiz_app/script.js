const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionContainer = document.getElementById('q-container');
const answersCheckbox = document.getElementById('answers-container')
const questionElement = document.getElementById('question');
const scoreResult = document.getElementById('score');
let score = 0, questionIndex, inputChecked = 0, correctAnswer= [];


const labels = document.querySelectorAll('label'); 

startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', next);

//when start button is clicked
function startGame()
{
    questionContainer.classList.remove('hide');
    startBtn.classList.add('hide');
    scoreResult.innerText = `Your score is`;
    scoreResult.classList.add('hide');
    questionIndex = 0;
    score = 0;
    nextQuestion();
}

//when there is no more questions
function endGame(){
    questionContainer.classList.add('hide');
    startBtn.classList.remove('hide');
    scoreResult.innerText += ` ${score} points`;
    scoreResult.classList.remove('hide');
}

//when next button is clicked
function next(){
    const inputs = document.querySelectorAll('input');
    let sum = 0, isCorrectAnswer = 0;
    inputChecked = 0;
    inputs.forEach(input =>{
        if(input.checked == true)
        {
            inputChecked++;
            if(!correctAnswer.includes(input.parentElement.innerText))
            {
               sum++;
            }  
            else{
                isCorrectAnswer++;
            }
        }
    });
    // if incorrect answer is checked or no answer is checked
    if(sum > 0 || inputChecked <= 0){
        score -= 5;
    }
    else{
        //if all correct answers are checked
        if(correctAnswer.length == isCorrectAnswer){
            score += 15;   
        }
        else{
            score -=5;
        }
    }
    //if there is more questions
    if(questions.length > questionIndex)
    {
        nextQuestion();
    }
    else {
        endGame();
    }
}

//loading new question
function nextQuestion()
{
    resetQuestions();
    showQuestion(questions[questionIndex]);
    questionIndex++;
}

//removing question from body
function resetQuestions(){
    while(answersCheckbox.firstChild)
    {
        answersCheckbox.removeChild(answersCheckbox.firstChild);
    }
}

//adding question with answers on body
function showQuestion(Question)
{
    correctAnswer = [];
    questionElement.innerHTML = Question.question;
    Question.answers.forEach(answer => {
        const label = document.createElement('label');
        const input = document.createElement('INPUT');
        input.setAttribute("type", "checkbox");
        label.innerText = answer.text;
        label.insertBefore(input, label.childNodes[0]);
        label.classList.add('label');
        if(answer.correct === true)
        {
            correctAnswer.push(label.innerText);
        }
        answersCheckbox.appendChild(label);
    });
}

//list of questions
const questions= [
    { 
        question: "What is the size of the football pitch?",
        answers: [
            { text: '100m', correct: true},
            { text: '30m', correct: false},
            { text: '70m', correct: false},
            { text: '150m', correct: false}
        ]
    },
    {
        question: "What is the name of Bosnian football player Dzeko?",
        answers: [
            { text: 'Miralem', correct: false},
            { text: 'Emin', correct: false},
            { text: 'Edin', correct: true},
            { text: 'Samir', correct: false}
        ] 
    },
    {
        question: "Who won the World Cup 2014?",
        answers: [
            { text: 'England', correct: false},
            { text: 'Bosnia', correct: false},
            { text: 'Croatia', correct: false},
            { text: 'Germany', correct: true}
        ] 
    },{
        question: "Best club in BiH?",
        answers: [
            { text: 'Zrinjski', correct: false},
            { text: 'Sarajevo', correct: true},
            { text: 'Zeljeznicar', correct: false},
            { text: 'Velez', correct: false}
        ] 
    },{
        question: "How many players can be on basketball court at same time?",
        answers: [
            { text: '12', correct: false},
            { text: '10', correct: true},
            { text: '8', correct: false},
            { text: '5', correct: false}
        ] 
    },{
        question: "Sport that need ball?",
        answers: [
            { text: 'Cricket', correct: true},
            { text: 'Skiing', correct: false},
            { text: 'Football', correct: true},
            { text: 'Box', correct: false}
        ] 
    }
]