
const express = require('express');
const app = express();
const PORT = 3000;

// In-memory tasks list (same as Python server)
const tasks = [
  "Write a diary entry from the future",
  "Create a time machine from a cardboard box",
  "Plan a trip to the dinosaurs",
  "Draw a futuristic city",
  "List items to bring on a time-travel adventure"
];

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/tasks', (req, res) => {
  res.json({ tasks });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
