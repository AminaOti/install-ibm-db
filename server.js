const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT | 3000;
const { WHITE_LIST_URL, SESSION_KEY } = process.env;
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: WHITE_LIST_URL,
    credentials: true,
  })
);

app.use(
  session({
    secret: "SESSION_KEY", // a secret string used to sign the session ID cookie
    resave: false, // don't save session if unmodified
    saveUninitialized: true, // don't create session until something stored
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: "true",
    message: "Congratulations, you have hit the endpoint for the chatbotApi",
  });
});

app.get("/health/ping", (req, res) => {
  res.status(200).json({
    success: "true",
    message: "Health check, chatbotAPI",
  });
});

app.post("/setSessionName", async (req, res) => {
  try {
    console.log(req.body.name);
    req.session.name = req.body.name;
    res.send({ message: "saved" }).status(201);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`White listed URL ${WHITE_LIST_URL}`);
});
