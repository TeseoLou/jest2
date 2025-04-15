// Define the game object to hold all current state information.
let game = {
  // Stores the sequence of moves generated by the computer.
  currentGame: [],

  // Stores the sequence of moves input by the player.
  playerMoves: [],

  // Tracks the player's score.
  score: 0,

  // Tracks the turn number.
  turnNumber: 0,

  // Array of available button IDs representing the game inputs
  choices: ["button1", "button2", "button3", "button4"],
};

// Function to start a new game
function newGame() {
  // Reset the computer's sequence
  game.currentGame = [];

  // Reset the player's move history
  game.playerMoves = [];

  // Reset the score
  game.score = 0;

  // Loop through all elements with the class "circle" (the game buttons)
  for (let circle of document.getElementsByClassName("circle")) {
    // Check if this button hasn't already been set to listen for clicks
    if (circle.getAttribute("data-listener") !== "true") {
      // Add a click event listener to handle player input
      circle.addEventListener("click", (e) => {
        // Get the ID of the clicked button (e.g. "button1")
        let move = e.target.getAttribute("id");

        // Light up the button that was clicked
        lightsOn(move);

        // Record the move in the player's sequence
        game.playerMoves.push(move);

        // Check if the player's move matches the game sequence
        playerTurn();
      });

      // Mark this element as already listening to prevent duplicate listeners
      circle.setAttribute("data-listener", "true");
    }
  }

  // Update the DOM to reflect the reset score
  showScore();

  // Start the first round by adding a random turn
  addTurn();
}

// Function to add a new move to the currentGame sequence
function addTurn() {
  // Clear any existing player moves
  game.playerMoves = [];

  // Select a random choice from the game.choices array and add it to currentGame
  game.currentGame.push(game.choices[Math.floor(Math.random() * 4)]);

  // Show the sequence visually
  showTurns();
}

// Function to visually light up a button in the DOM
function lightsOn(circ) {
  // Add the "light" class to the selected button to visually highlight it
  document.getElementById(circ).classList.add("light");

  // After 400ms, remove the "light" class to turn off the highlight
  setTimeout(() => {
    document.getElementById(circ).classList.remove("light");
  }, 400);
}

// Function to update the score display in the DOM
function showScore() {
  document.getElementById("score").innerText = String(game.score);
};

// Function to play back the computer's sequence of moves one at a time
function showTurns() {
  // Reset the turn number to start from the beginning of the sequence
  game.turnNumber = 0;

  // Use setInterval to play through each move in the currentGame array
  let turns = setInterval(() => {
    // Light up the current button in the sequence
    lightsOn(game.currentGame[game.turnNumber]);

    // Move to the next item in the sequence
    game.turnNumber++;

    // If we've shown all the moves, stop the interval
    if (game.turnNumber >= game.currentGame.length) {
      clearInterval(turns);
    }
  }, 800); // Delay of 800ms between each move
};

function playerTurn() {
    // Get the index of the player's most recent move
    let i = game.playerMoves.length - 1;

    // Check if the player's move matches the expected move in the sequence
    if (game.currentGame[i] === game.playerMoves[i]) {
        
        // If the player has completed the full sequence correctly
        if (game.currentGame.length === game.playerMoves.length) {
            game.score++;      // Increase the score
            showScore();       // Update the score in the DOM
            addTurn();         // Add a new move and begin the next round
        };

    } else {
        // If the move was incorrect, alert the player
        alert("Wrong move!");

        // Restart the game from scratch
        newGame();
    };
};

// Export all necessary functions and state for testing and interaction
module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };
