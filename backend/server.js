// backend.js
import express from "express";

const app = express();
const PORT = 3000;

// Example API endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
