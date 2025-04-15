/**
 * @jest-environment jsdom
 */
// Instructs Jest to run this test file in a browser-like environment using jsdom.

const {
  game,
  newGame,
  showScore,
  addTurn,
  lightsOn,
  showTurns,
} = require("../game");
// Import the necessary game functions and state object from the game module.

beforeAll(() => {
  // Load the HTML structure into jsdom before all tests run.
  let fs = require("fs"); // Import Node's file system module
  let fileContents = fs.readFileSync("index.html", "utf-8"); // Read the HTML file as a string
  document.open(); // Clear any existing document content
  document.write(fileContents); // Write the HTML content to the mock DOM
  document.close(); // Finalize writing to the document
});

// Group of tests to confirm the game object contains the expected structure
describe("game object contains correct keys", () => {
  // Test that 'score' key exists in the game object
  test("score key exists", () => {
    expect("score" in game).toBe(true);
  });

  // Test that 'currentGame' key exists in the game object
  test("currentGame key exists", () => {
    expect("currentGame" in game).toBe(true);
  });

  // Test that 'playerMoves' key exists in the game object
  test("playerMoves key exists", () => {
    expect("playerMoves" in game).toBe(true);
  });

  // Test that 'choices' key exists in the game object
  test("choices key exists", () => {
    expect("choices" in game).toBe(true);
  });

  // Test that the 'choices' array has the expected button IDs
  test("choices contain correct ids", () => {
    expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
  });

  // Test to verify that the game object includes a key named 'turnNumber'
  test("turnNumber key exists", () => {
    // Use the 'in' operator to check if 'turnNumber' is a property of the game object
    // This ensures the game can track progress when showing the turn sequence
    expect("turnNumber" in game).toBe(true);
  });
});

// Group of tests to verify that the newGame function resets and sets up the game properly
describe("newGame works correctly", () => {
  // Setup a mock in-progress game state before this block runs
  beforeAll(() => {
    game.score = 42; // Set a fake score
    game.playerMoves = ["button1", "button2"]; // Simulate some player inputs
    game.currentGame = ["button1", "button2"]; // Simulate an active sequence
    document.getElementById("score").innerText = "42"; // Fake score in the DOM
    newGame(); // Run the function we're testing
  });

  // Test that the score is reset to 0
  test("should set game score to zero", () => {
    expect(game.score).toEqual(0);
  });

  // Test that the DOM element with id="score" also displays "0"
  test("should display 0 for the element with id of score", () => {
    expect(document.getElementById("score").innerText).toEqual("0");
  });

  // Test that playerMoves array is cleared
  test("should clear the player moves array", () => {
    expect(game.playerMoves.length).toBe(0);
  });

  // Test that currentGame has one new move added after newGame
  test("should add one move to the computer's game array", () => {
    expect(game.currentGame.length).toBe(1);
  });
});

// Group of tests related to game functionality during play
describe("gameplay works correctly", () => {
  // Reset game state and add a starting move before each test
  beforeEach(() => {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    addTurn(); // Simulate game starting with one move
  });

  // Clear game state after each test to ensure test isolation
  afterEach(() => {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
  });

  // Confirm that calling addTurn again appends a second move
  test("addTurn adds a new turn to the game", () => {
    addTurn(); // Add a second move
    expect(game.currentGame.length).toBe(2);
  });

  // Test to ensure the lightsOn function correctly applies the "light" class to the active button
  test("should add correct class to light up the buttons", () => {
    // Get the DOM element representing the button specified in the currentGame sequence
    let button = document.getElementById(game.currentGame[0]);

    // Call lightsOn with the button's ID to apply the "light" class
    lightsOn(game.currentGame[0]);

    // Verify that the "light" class was added to the button's classList
    expect(button.classList).toContain("light");
  });

  // Test to check that the showTurns function resets the game's turn counter
  test("showTurns should update game.turnNumber", () => {
    // Manually set turnNumber to a non-zero value to simulate an in-progress state
    game.turnNumber = 42;

    // Call the function that should reset the turn number
    showTurns();

    // Check if the turn number has been correctly reset to 0
    expect(game.turnNumber).toBe(0);
  });
});
