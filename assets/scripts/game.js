/* Define an object to hold the game's current state.
For now, it only contains the 'score' key set to 0. */
let game = {
    score: 0,
};

/*Export the game object using module.exports so it can be imported in the test file.
We use curly braces because we'll be exporting multiple things from this file later. */
module.exports = { game };