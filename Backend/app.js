const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const { createServer } = require("http");
const userRoute = require("./Routes/user.routes.js");
const roleRoute = require("./Routes/roles.routes.js");
const { checkAuthenticated } = require("./Middlewares/authentication.js");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.send("Hiddskpkpk...");
});

app.use("/api/v1", userRoute);
app.use("/api/v1", roleRoute);

module.exports = app;
