/* Define an object to hold the game's current state.
For now, it only contains the 'score' key set to 0. */
let game = {
    // The player's score, starting at 0.
    score: 0,
    // An array to track the sequence of computer-generated moves.
    currentGame: [],
    // An array to track the moves entered by the player.
    playerMoves: [],
    // An array of available button IDs representing game choices.
    choices: ["button1", "button2", "button3", "button4"],
};

// Define a function that resets the game state for a new game.
function newGame() {
    // Reset the score to zero at the start of a new game.
    game.score = 0;
    // Clear the currentGame array
    game.currentGame = [];
}

// Export both the game object and the newGame function.
// This allows them to be used in the test file and elsewhere in the project.
module.exports = { game, newGame };