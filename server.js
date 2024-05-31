const express = require("express");
const app = express();

require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const userRoute = require("./routes/usersRoute");
const quizRoute = require("./routes/quizRoute")

app.use("/api/users", userRoute);
app.use("/api/quizzes",quizRoute);

const port = process.env.PORT || 5000;


app.listen(port, () => {
  console.log(`Node JS Server is running on port ${port}`);
});
