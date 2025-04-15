/**
 * @jest-environment jsdom
 */
// Use jsdom to simulate a browser environment for DOM interaction in tests

// Import required Node modules
const fs = require("fs");
const path = require("path");

// Import the entire game module so we can spy on its functions and access its state
const gameModule = require("../game");

// Load the HTML content into the DOM before all tests run
beforeAll(() => {
  const fileContents = fs.readFileSync(path.resolve(__dirname, "../../index.html"), "utf-8");
  document.open();
  document.write(fileContents);
  document.close();
});

// Group of tests to check the structure of the game object
describe("game object contains correct keys", () => {
  test("score key exists", () => {
    expect("score" in gameModule.game).toBe(true);
  });

  test("currentGame key exists", () => {
    expect("currentGame" in gameModule.game).toBe(true);
  });

  test("playerMoves key exists", () => {
    expect("playerMoves" in gameModule.game).toBe(true);
  });

  test("choices key exists", () => {
    expect("choices" in gameModule.game).toBe(true);
  });

  test("choices contain correct ids", () => {
    expect(gameModule.game.choices).toEqual(["button1", "button2", "button3", "button4"]);
  });

  test("turnNumber key exists", () => {
    expect("turnNumber" in gameModule.game).toBe(true);
  });
});

// Tests to verify newGame function resets the game correctly
describe("newGame works correctly", () => {
  // Set up a fake game state before running this block of tests
  beforeAll(() => {
    gameModule.game.score = 42;
    gameModule.game.playerMoves = ["button1", "button2"];
    gameModule.game.currentGame = ["button1", "button2"];
    document.getElementById("score").innerText = "42";
    gameModule.newGame(); // Call the function to reset the game
  });

  test("should set game score to zero", () => {
    expect(gameModule.game.score).toEqual(0);
  });

  test("should display 0 for the element with id of score", () => {
    expect(document.getElementById("score").innerText).toEqual("0");
  });

  test("should clear the player moves array", () => {
    expect(gameModule.game.playerMoves.length).toBe(0);
  });

  test("should add one move to the computer's game array", () => {
    expect(gameModule.game.currentGame.length).toBe(1);
  });

  test("expect data-listener to be true", () => {
    const elements = document.getElementsByClassName("circle");
    for (let element of elements) {
      expect(element.getAttribute("data-listener")).toEqual("true");
    }
  });

  test("playerTurn detects incorrect move", () => {
    gameModule.game.currentGame = ["button1"];
    gameModule.game.playerMoves = ["button2"];
    gameModule.playerTurn(); // Should not increase score
    expect(gameModule.game.score).toBe(0);
  });
});

// Tests that cover actual gameplay mechanics
describe("gameplay works correctly", () => {
  // Reset game state before each test
  beforeEach(() => {
    gameModule.game.score = 0;
    gameModule.game.currentGame = [];
    gameModule.game.playerMoves = [];
    gameModule.addTurn(); // Start each test with one move in the sequence
  });

  // Clear game state after each test for isolation
  afterEach(() => {
    gameModule.game.score = 0;
    gameModule.game.currentGame = [];
    gameModule.game.playerMoves = [];
  });

  test("addTurn adds a new turn to the game", () => {
    gameModule.addTurn(); // Adds a second move
    expect(gameModule.game.currentGame.length).toBe(2);
  });

  test("should add correct class to light up the buttons", () => {
    const button = document.getElementById(gameModule.game.currentGame[0]);
    gameModule.lightsOn(gameModule.game.currentGame[0]);
    expect(button.classList).toContain("light");
  });

  test("showTurns should update game.turnNumber", () => {
    gameModule.game.turnNumber = 42; // Simulate old value
    gameModule.showTurns(); // Should reset it to 0
    expect(gameModule.game.turnNumber).toBe(0);
  });

  test("playerTurn continues game if move is correct but not complete", () => {
    gameModule.game.currentGame = ["button1", "button2"];
    gameModule.game.playerMoves = ["button1"];
    gameModule.playerTurn(); // Still in progress
    expect(gameModule.game.score).toBe(0); // No score yet
  });

  test("playerTurn completes the sequence correctly and advances the game", () => {
    // Setup a single correct move
    gameModule.game.currentGame = ["button1"];
    gameModule.game.playerMoves = ["button1"];

    // Spy on addTurn and showScore
    const addTurnMock = jest.spyOn(gameModule, "addTurn").mockImplementation(() => {});
    const showScoreMock = jest.spyOn(gameModule, "showScore").mockImplementation(() => {});

    // Run the function
    gameModule.playerTurn();

    // Check if score was incremented
    expect(gameModule.game.score).toBe(1);

    // Check if dependent functions were called
    expect(addTurnMock).toHaveBeenCalled();
    expect(showScoreMock).toHaveBeenCalled();

    // Restore original functions
    addTurnMock.mockRestore();
    showScoreMock.mockRestore();
  });
});
