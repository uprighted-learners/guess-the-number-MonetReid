// Imports readline and allows ut to do input in and out
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

// Ask function that takes in text and returns and resolves a promise
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
// run file in terminal with: node fileName.js
// ! DO NOT TOUCH CODE ABOVE THIS LINE

// Async start function being invoked
start();

// The function that starts the whole game
async function start() {
  // Game intro message
  console.log("\n-------------------------");
  console.log("Welcome to number picker!");
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );
  console.log("-------------------------");

  //  have user pick the ceiling number
  async function pickHighNum() {
    // Set lowest num
    let minNum = 1;
    // Asking the user for highest number
    let pickMaxNum = await ask(
      `\n Now let's pick the highest number.\n Please choose a number greater than ${minNum}: `
    );
    // Grab the value of user input
    let highNum = parseInt(pickMaxNum);
    // Confirmation message to print
    console.log(`\nYou set ${highNum} as the highest value.`);
    // Intro game text
    let secretNumber = await ask(
      `Now pick a number between ${minNum} and ${highNum} \nI won't peek, I promise...\n`
    );
    // parse means make number into string
    let computerNumber = parseInt(secretNumber);
    console.log("You entered: " + computerNumber);
    console.log("Okay, Let's start the game... chump");
    // Now try and complete the program.

    let randomNumber = Math.floor((minNum + highNum) / 2);

    // Example async await function to ask for a highest number.

    theGame();

    // begin game function
    async function theGame() {
      // this is using the high and low number and picking the middle number every time to make game go faster.
      randomNumber = Math.floor((minNum + highNum) / 2);
      // Make a while statement and nest your if/else inside of it.
      let guess = await ask(
        `Is your secret number ${randomNumber} ? yes or no?`
      );
      // if the computer guesses your number then...
      if (guess == "yes" && randomNumber == computerNumber) {
        console.log(`Congratulations! My secret number was ${computerNumber}!`);
        // option to play game again
        let playAgain = await ask("Would you like to play again? yes or no?");
        if (playAgain == "yes") {
          return pickHighNum();
        } else {
          process.exit("Thanks for playing!");
        }
      }
      // if person is lying about their number
      else if (guess == "yes" && randomNumber !== computerNumber) {
        console.log("No cheating! How could you?! This is a family game...");
        return theGame();
      }
      // send to next round if guess is wrong
      else if (guess == "no" || guess == "n") {
        console.log("Ope!");
        return nextRound();
      }
      // pretty much the catch in case they aren't making sense.
      else {
        console.log(
          "What are you talking about? I think this game is too hard for you..."
        );
        return theGame();
      }
    }

    nextRound();
    // this is the function to continue the game if computer guesses the wrong number.
    // this will continue until game is over
    async function nextRound() {
      let guessAgain = await ask(
        `Is your number lower or higher than ${randomNumber}?`
      );
      if (guessAgain == "lower") {
        // fixing the ceiling for the computer to guess the right number
        highNum = randomNumber;
        theGame();
      } else if (guessAgain == "higher") {
        // fixing the floor for the computer to guess the right number
        minNum = randomNumber;
        theGame();
      } else {
        // catch
        ("You're losing your mind, man... try a real answer please!");
      }
      nextRound();
    }
  }
  pickHighNum();
}
