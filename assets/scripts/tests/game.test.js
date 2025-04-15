/**
 * @jest-environment jsdom
 */
// Ensures that Jest uses a mock browser environment (JSDOM), enabling access to the DOM.

// Import both the game object and the newGame function from game.js
const { game, newGame, showScore } = require("../game");

beforeAll(() => {
    // Import the built-in Node.js file system module to read files from disk.
    let fs = require("fs");
    // Read the contents of index.html as a UTF-8 string.
    let fileContents = fs.readFileSync("index.html", "utf-8");
    // Open the mock document to prepare for writing HTML into it.
    document.open();
    // Write the entire HTML content into the mock DOM environment.
    document.write(fileContents);
    // Close the document to complete the DOM initialization.
    document.close();
});

// Group of related tests to check the structure of the game object.
describe("game object contains correct keys", () => {
    // Test to verify that the game object includes a key named 'score'.
    test("score key exists", () => {
        /* Use the 'in' operator to check if 'score' is a property of the game object.
        This will initially fail if the 'game' object or 'score' key doesn't exist yet */
        expect("score" in game).toBe(true);
    });
    // Test to verify that the game object includes a key named 'currentGame'.
    test("currentGame key exists", () => {
        /* Use the 'in' operator to check if 'currentGame' is a property of the game object.
        This will initially fail if the 'game' object or 'currentGame' key doesn't exist yet */
        expect("currentGame" in game).toBe(true);
    });
    // Test to verify that the game object includes a key named 'playerMoves'.
    test("playerMoves key exists", () => {
        /* Use the 'in' operator to check if 'playerMoves' is a property of the game object.
        This will initially fail since 'playerMoves' hasn't been added yet. */
        expect("playerMoves" in game).toBe(true);
    });
    // Test to verify that the game object includes a key named 'choices'.
    test("choices key exists", () => {
        /* Use the 'in' operator to check if 'choices' is a property of the game object.
        This will initially fail since 'choices' hasn't been added yet. */
        expect("choices" in game).toBe(true);
    });
    // Test to check that the 'choices' array in the game object contains the correct button IDs.
    test("choices contain correct ids", () => {
        /* Use toEqual to compare the array's content with the expected values.
        This test will fail if any of the elements or the order is incorrect. */
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
});

// Group of tests that check if the newGame function works as expected.
describe("newGame works correctly", () => {
    // This setup runs once before all tests in this describe block.
    beforeAll(() => {
        // Simulate an existing score to ensure newGame resets it properly.
        game.score = 42;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        // Set the score in the DOM to a non-zero string
        document.getElementById("score").innerText = "42";
        // Call the newGame function, which should reset the game state.
        newGame();
    });
    // Test to check that newGame resets the score to 0.
    test("should set the game score to zero", () => {
        // After calling newGame (in beforeAll), check that the score was reset.
        expect(game.score).toEqual(0);
    });
    // Test that calling newGame adds one turn to the currentGame array
    test("should add one move to the currentGame array", () => {
        // After calling newGame in beforeAll, currentGame should contain one element
        expect(game.currentGame.length).toBe(1);
    });
    // Test to check if playerMoves is reset to an empty array
    test("should clear the playerMoves array", () => {
        // Simulate existing player moves
        game.playerMoves = ["button2"];
        // Call newGame to reset the game state
        newGame();
        // Check that playerMoves is now empty
        expect(game.playerMoves.length).toEqual(0);
    });
    // Test that the DOM score is reset to "0"
    test("should display 0 with the element with the id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    })
});