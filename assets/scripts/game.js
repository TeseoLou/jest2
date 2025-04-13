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

/*Export the game object using module.exports so it can be imported in the test file.
We use curly braces because we'll be exporting multiple things from this file later. */
module.exports = { game };