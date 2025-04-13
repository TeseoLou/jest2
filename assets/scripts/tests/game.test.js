/**
 * @jest-environment jsdom
 */
// Ensures that Jest uses a mock browser environment (JSDOM), enabling access to the DOM.

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
});