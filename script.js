let randomNumber = (parseInt(Math.random()*100+1)) 

const submit = document.querySelector('#subt')
const userInput = document.querySelector('#guessField')
const guessSlot = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult')
const lowOrHigh = document.querySelector('.lowOrHigh')
const startOver = document.querySelector('.resultParas')

const p = document.createElement('p')

let prevGuess = []
let numGuess = 1;

let playGame = true;

if(playGame)
{
    submit.addEventListener('click',function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value)
        validateGuess(guess);
    })
}

function validateGuess(guess){
    if(isNaN(guess))
    {
        alert('Please enter a valid Number')
    }
    else if(guess < 1)
    {
        alert('Pease enter a number more than 0')
    }
    else if(guess > 100)
    {
        alert('Please enter a number less than 100')
    }
    else
    {
        prevGuess.push(guess)
        if(numGuess === 11)
        {
            displayGuess(guess)
            displayMessage(`Game Over. random number was ${randomNumber}`)
            endGame();
        }
        else
        {
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess){
    if(guess === randomNumber)
    {
        displayMessage(`You won the game.`)
        endGame()
    }
    else if(guess < randomNumber)
    {
        displayMessage(`Number is low..`)
    }
    else if(guess > randomNumber)
    {
        displayMessage(`Number is high..`)
    }
}

function displayGuess(guess){
    userInput.value = ''
    guessSlot.innerHTML += `${guess}   `
    numGuess++;
    remaining.innerHTML = `${11-numGuess}`
}

function displayMessage(message){
    lowOrHigh.innerHTML = `<h4>${message}</h4>`
}

function newGame(){
    const newGameBtn = document.querySelector('#newGame')
    newGameBtn.addEventListener('click',function(e){
        randomNumber = (parseInt(Math.random()*100+1)) 
        prevGuess = []
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11-numGuess}`;
        userInput.removeAttribute(p);
        userInput.removeAttribute('disabled');
        startOver.removeChild(p)
        lowOrHigh.innerHTML = "";
        playGame=true
    })
}

function endGame(){
    userInput.value = ''
    userInput.setAttribute('disabled','')
    p.classList.add('button')
    p.innerHTML = '<button id="newGame">Start New Game</button>'
    startOver.appendChild(p)
    playGame=false;
    newGame()
}