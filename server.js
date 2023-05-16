// console.log("working server.js");
console.log("how are you u bro");

const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("public"));
io.on("connection", (socket) => {
  // console.log(socket);
  console.log("User connected:", socket.id);

  socket.on("chat message", (data) => {
    console.log("message to everyone", data.msg);
    io.emit("chat message", data);
  });

  socket.on("new-user", (user) => {
    console.log("hello new user", user);
    io.emit("new-user", user);
  });

  socket.on("user-exit", (user) => {
    console.log(user + "-okay");
    io.emit("user-exit", user);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
