// const seedTag = require("./seedFunction/seedTag");
// const seedProject = require("./seedFunction/seedProject");
// const seedTeam = require("./seedFunction/seedTeam");
// const seedUser = require("./seedFunction/seedUser");
// const seedTask = require("./seedFunction/seedTask");
const {initializeDatabase} = require("./db/db.connect");
initializeDatabase();
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
const Signup = require("./routes/signup.routes");
const Login = require("./routes/login.routes");
const Tasks = require("./routes/task.routes")


// seedTag();
// seedProject();
// seedTeam();
// seedUser();
// seedTask();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/favicon.ico", (req, res) => res.status(204).end());
app.use("/auth", Signup);
app.use("/auth", Login);
app.use("/tasks", Tasks)



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});