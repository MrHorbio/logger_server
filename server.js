// --- Imports ---
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");

// --- Express App ---
const app = express();
app.use(bodyParser.json({ extended: true }));

// Log file path
const LOG_FILE = "log.txt";

// --- Home Page: Display Logged Messages ---
app.get("/", (req, res) => {
    try {
        const contents = fs.readFileSync(LOG_FILE, "utf8");

        // Convert newlines → <br>
        const formatted = contents.replace(/\n/g, "<br>");

        res.send(`
            <h1>Message Log</h1>
            <p>${formatted}</p>
        `);
    } catch {
        res.send("<h1>No messages logged yet.</h1>");
    }
});

// --- POST Endpoint: Receive New Messages ---
app.post("/", (req, res) => {
    console.log("POST received:", req.body);

    const message = req.body.message;

    if (!message) {
        return res.status(400).send("Missing 'message' field.");
    }

    // Append to log
    fs.appendFileSync(LOG_FILE, message + "\n");

    res.send("Message logged.");
});

// --- Start Server ---
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
