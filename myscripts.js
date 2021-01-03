/** 
 * Coded by Phong, December 26th 2020 
 * Simple console JavaScript Rock, Paper, and Scissors game 
 * in the process of learning problem solving skill
 * following the principal of freeCodeCamp and The Odin Project
 * */

// ====== DOM elements and constants
const CHOICES = ["ROCK", "PAPER", "SCISSORS"]
const SCORE = "Score: ";
const weapons = Array.from(document.querySelectorAll('.weapon'));
//Audio sounds
const weaponAudio = document.querySelector('.weapon-sound');
const cheerAudio = document.querySelector('.win-sound');
const sadAudio = document.querySelector('.lose-sound');
const refreshButton = document.querySelector('.refresh');


let topMessage = document.querySelector('.message');
let playerScoreText = document.querySelector('.player-score');
let robotScoreText = document.querySelector('.robot-score');

let playerScoreNumber = 0;
let robotScoreNumber = 0;


/** 
 * 1. computerPlay will randomly return Rock, Paper, or Scissors 
 * @return String result of the computer play
 * */
function computerPlay() {
    // array of choices have index from 0 to 2
    const computerChoice = CHOICES[Math.floor(Math.random() * (CHOICES.length))];
    return computerChoice;
}

/**
 * 2. playRound function represent one round of play
 * @param playerSelection
 * @param computerSelection
 */
function playRound(playerSelection, computerSelection, weapon) {
    // logic for 1 round game
    console.log("Human: " + playerSelection + " --- Robot: " + computerSelection);
    //win = 1, lose = 2, even = 3
    let result = 3;
    let messageForResult = '';

    if (isGameOver()) {
        finalMessageAndSound();
        return;
    }
    weaponClicked(weapon);
    if (playerSelection !== computerSelection) {
        switch (playerSelection) {
            case "ROCK":
                if (computerSelection === "PAPER") {
                    result = 2;
                    messageForResult = "Paper beats Rock"
                } else if (computerSelection === "SCISSORS") {
                    result = 1;
                    messageForResult = "Rock beats Scissors"
                }
                break;
            case "PAPER":
                if (computerSelection === "ROCK") {
                    result = 1;
                    messageForResult = "Paper beats Rock"
                } else if (computerSelection === "SCISSORS") {
                    result = 2;
                    messageForResult = "Scissors beats Paper"
                }
                break;
            case "SCISSORS":
                if (computerSelection === "PAPER") {
                    result = 1;
                    messageForResult = "Scissors beats Paper"
                } else if (computerSelection === "ROCK") {
                    result = 2;
                    messageForResult = "Rock beats Scissors"
                }
                break;
        }
    } else {
        result = 3;
    }
    changeMessageAndScore(result, messageForResult);
}

/**
 * 4. making a oneGame() function play one round a change the oneRound result message and color
 * evaluating the result and setting 
 */
function changeMessageAndScore(result, messageForResult) {
    switch (result) {
        case 1:
            topMessage.textContent = "You Win ! " + messageForResult;
            topMessage.style.color = "#28df99";
            playerScoreNumber++;
            playerScoreText.textContent = SCORE + playerScoreNumber;
            break;
        case 2:
            topMessage.textContent = "You Lost ! " + messageForResult;
            topMessage.style.color = "#ef4f4f";
            robotScoreNumber++;
            robotScoreText.textContent = SCORE + robotScoreNumber;
            break;
        default:
            topMessage.style.color = "#f0e2d0";
            topMessage.textContent = "It's a Tie !";
            break;
    }
}
//========== LISTENER ============
// Adding event listener to each weapon buttons and the function playRound will be called for each one on this event
weapons.forEach((weapon) => weapon.addEventListener('click', (e) => {
    const playerSelected = weapon.querySelector('p').textContent.toUpperCase();
    const robotSelected = computerPlay();
    weaponAudio.currentTime = 0;
    weaponAudio.play()
    //call game
    playRound(playerSelected, robotSelected, weapon);
}));

// reload button listener
refreshButton.addEventListener('click', () => {
    window.location.reload()
});


// check if game is over with 5 games
function isGameOver() {
    return playerScoreNumber === 5 || robotScoreNumber === 5;
}

//setting game over message
function finalMessageAndSound() {
    if (playerScoreNumber > robotScoreNumber) {
        topMessage.textContent = "Game over! You Won, Click again button to play again ...";
        topMessage.style.color = "#28df99";
        cheerAudio.play();
    } else {
        topMessage.textContent = "Game over! You Lost, Click again button to play again ...";
        topMessage.style.color = "#ef4f4f";
        sadAudio.play();
    }
}

//wepon button was clicked will be changed color by adding the class
function weaponClicked(weaponClicked) {
    weapons.forEach((weapon) => {
        weapon.classList.remove("weapon-clicked");
    });
    weaponClicked.classList.add("weapon-clicked");
}