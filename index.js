require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const socket = require("socket.io");
const http = require("http");
const {
  sendMessage,
  checkMess,
  getDataInRoom,
  saveMess,
} = require("./message");
const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

//router
app.use("/", require("./routers/main.router"));
app.use("/user", require("./routers/user.router"));
app.use("/posts", require("./routers/posts"));

const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to mongodb");
  }
);

io.on("connection", (socket) => {
  socket.on("join", ({ name, room, role }, callBack) => {
    if (role === "admin") {
      checkMess(io);
    }
    getDataInRoom(room, io, name);

    socket.join(room);

    callBack();
  });

  //   socket.on("getData", ({ id }, callback) => {

  //     callBack();
  //   });

  socket.on(`sendMessage`, ({ message, room, name }, callBack) => {
    saveMess(room, message, io, name);

    callBack();
  });

  socket.on("disconnect", () => {
    console.log("User had left");
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
