const dotenv = require("dotenv");
const app = require("./app");
const { connectDB } = require("./config/database");

dotenv.config();

// connect database
connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`);
});
