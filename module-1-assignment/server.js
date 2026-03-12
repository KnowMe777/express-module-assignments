import express from "express";

const app = express();
const PORT = 3000;

// home page
app.get("/", (req, res) => {
  res.send("Welcome To Home Page");
});

//about page
app.get("/about", (req, res) => {
  res.send("You Are Currently Viewing About Page");
});

//contact page
app.get("/contact", (req, res) => {
  res.send("You Are Currently Viewing Contact Page");
});

//help page
app.get("/help", (req, res) => {
  res.send("You Are Currently Viewing Help Page");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Timestamp: ", new Date().toString());
});
