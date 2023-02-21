
// Imports readline and allows ut to do input in and out
const readline = require('readline');
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
    console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.");
    console.log("-------------------------");
  
    
    async function pickHighNum() {
    // Set lowest num
    let minNum = 1;
    // Asking the user for highest number
    let pickMaxNum = await ask(`\n Now let's pick the highest number.\n Please choose a number greater than ${minNum}: `);
    // Grab the value of user input
    let highNum = parseInt(pickMaxNum);
    // Confirmation message to print
    console.log(`\nYou set ${highNum} as the highest value.`);
// Intro game text
    let secretNumber = await ask(`Now pick a number between ${minNum} and ${highNum} \nI won't peek, I promise...\n`);
    let computerNumber = parseInt(secretNumber)
    console.log('You entered: ' + computerNumber);
    console.log("Okay, Let's start the game... chump");
  // Now try and complete the program.
   
  let randomNumber = Math.floor((minNum + highNum) / 2);
  
  
  // Example async await function to ask for a highest number.
     

    theGame();


    async function theGame() {
      randomNumber = Math.floor((minNum + highNum) / 2);
    // Make a while statement and nest your if/else inside of it.
    let guess = await ask(`Is your secret number ${randomNumber} ? yes or no?`);
    if ( guess == "yes" && randomNumber == computerNumber) {
      console.log (`Congratulations! My secret number was ${computerNumber}!`)
       let playAgain= await ask("Would you like to play again? yes or no?")
       if (playAgain == "yes") {
        return pickHighNum ()} else {
          process.exit("Thanks for playing!")} }
       else if (guess == "yes" && randomNumber !== computerNumber) {
        console.log("No cheating! How could you?! This is a family game..."); return theGame() }
        else if (guess == "no" || guess == "n") {
        console.log ("Nope! You're going to have to try harder than that!")
        return nextRound()} 
        else { console.log("What are you talking about? I think this game is too hard for you...")
        return theGame()}
    }
    
    nextRound();
    async function nextRound() {
      let guessAgain = await ask(`Is your number lower or higher than ${randomNumber}?`);
      if (guessAgain == "lower") {
       highNum = randomNumber;
      theGame();
      } else if (guessAgain == "higher") {
       minNum = randomNumber;
      theGame();
      } else {"You're losing your mind, man... try a real answer please!"}
      nextRound();

    

}
     
} pickHighNum();
   



}


