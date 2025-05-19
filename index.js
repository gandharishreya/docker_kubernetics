const express = require("express");
const path = require("path");
const app = express();

let notes = [];

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

//app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send(`<html>
      <head>
        <title>Docker App</title>
      </head>
      <body style="font-family: Arial; text-align: center; margin-top: 50px; background:lightblue;">
        <h1>Hello from Dockerized Node.js App 🚀</h1>
        <p>This is served from inside a Docker container!</p>
        <img src="logo.png" alt="docker" style="width: 75px; height: 75px; margin-top:50px" />
      </body>
    </html>`);
});



app.use(express.static('public'));
app.use(express.json());

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Note text required' });

  const newNote = { id: Date.now(), text };
  notes.push(newNote);
  res.status(201).json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter(note => note.id !== id);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
