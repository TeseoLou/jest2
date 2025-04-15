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
  playerTurn,
} = require("../game");
// Import the necessary game functions and state object from the game module.

// Mock the window.alert function to prevent actual alerts during tests and allow us to track if it's called
jest.spyOn(window, "alert").mockImplementation(() => {});

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

  // Test to ensure that all circle buttons are set to listen for user input after newGame runs
  test("expect data-listener to be true", () => {
    // Select all elements with the class 'circle' (i.e. the game buttons)
    const elements = document.getElementsByClassName("circle");

    // Loop through each button to check its data-listener attribute
    for (let element of elements) {
      // Expect the data-listener attribute to be set to "true"
      // This allows the buttons to register clicks during gameplay
      expect(element.getAttribute("data-listener")).toEqual("true");
    }
  });

  test("playerTurn detects incorrect move", () => {
    // Simulate a known game sequence
    game.currentGame = ["button1"];

    // Simulate the player making the wrong move
    game.playerMoves = ["button2"];

    // Call the function to test
    playerTurn();

    // Expect the game to detect failure — customize this as needed
    // Example: expect the score not to increase, or expect an alert
    // For now, we'll expect score to remain 0 (assuming no point awarded on wrong move)
    expect(game.score).toBe(0);
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

  // Test to confirm that the score increases if the player's turn matches the game sequence
  test("should increment the score if the turn is correct", () => {
    // Simulate the player making a correct move by copying the first item from currentGame
    game.playerMoves.push(game.currentGame[0]);

    // Call the function that checks if the player's move is correct
    playerTurn();

    // Expect the score to increase by 1 after a correct full sequence
    expect(game.score).toBe(1);
  });

  // Test to ensure an alert is triggered if the player makes an incorrect move
  test("should call an alert if the move is wrong", () => {
    // Simulate an incorrect move by adding a wrong button ID to playerMoves
    game.playerMoves.push("wrong");

    // Call the function that checks the player's move
    playerTurn();

    // Check that the alert function was called with the expected message
    expect(window.alert).toBeCalledWith("Wrong move!");
  });
});
