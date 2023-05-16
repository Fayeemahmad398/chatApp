const socket = io();
let btn = document.getElementById("btn");
let msgSendBtn = document.getElementById("msgSendBtn");
var sentTone = new Audio(`sent.mp3`);
var receivedTone = new Audio(`received.mp3`);
// console.log(btn2);
document.getElementById(
  "time"
).innerText = `Started chating at Time:${new Date().toLocaleTimeString()}`;

setInterval(() => {
  document.getElementById("currtime").innerText = `${new Date()}`;
}, 1000);

document.getElementById("currtime").innerText = `${new Date()}`;

let readyToChat = document.getElementById("readyToChat");
let chatroom = document.getElementById("chatroom");
let inputUser = document.getElementById("username");
// --------------------------------------------------------------
btn.addEventListener("click", function (e) {
  e.preventDefault();
  if (inputUser.value.trim() != "") {
    readyToChat.style.display = "none";
    chatroom.style.display = "block";

    socket.emit("new-user", inputUser.value);

    // socket.emit(`Username Entered`);

    document.getElementById(
      "chat"
    ).innerText = `Person inside Chatroom : ${inputUser.value}`;

    document.createElement("h4").innerText = `${inputUser.value}`;
  } else {
    alert("Please fill the Username first");
    return;
  }
});

// -------------------------------------------------------------------------
// button to exit from chatroom
document.getElementById("exit_btn").addEventListener("click", () => {
  readyToChat.style.display = "block";
  chatroom.style.display = "none";
  socket.emit("user-exit", inputUser.value);
});

// ---------------------------------------------------------------------
msgSendBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (document.getElementById("msgInput").value != "") {
    var data = {
      username: inputUser.value,
      msg: document.getElementById("msgInput").value,
    };

    socket.emit("chat message", data);
    addMsg(data, true);

    document.getElementById("msgInput").value = "";
  } else {
    alert("please,Enter message first ");
  }
});
socket.on("chat message", (data) => {
  if (data.username !== inputUser.value) {
    console.log(data.username, username);
    // console.log(data.username);
    addMsg(data, false);
  }
});

socket.on("new-user", (data) => {
  if (data !== inputUser.value) {
    let notification = document.createElement("h4");

    notification.classList.add("notification");
    notification.innerText = `${data} recently joined chatroom at ${new Date().toLocaleTimeString()}`;

    document.querySelector(".msg-container").appendChild(notification);
  }
});

// socket.emit("user-exit", inputUser.value);
socket.on("user-exit", (data) => {
  if (data !== inputUser.value) {
    let notification = document.createElement("h4");

    notification.classList.add("notification");
    notification.innerText = `${data} recently left chatroom at ${new Date().toLocaleTimeString()}`;

    document.querySelector(".msg-container").appendChild(notification);
  }
});

function addMsg(data, sender) {
  let msgDiv = document.createElement("Div");

  msgDiv.innerHTML = ` <span class="user">${data.username}~</span>
  <span>${data.msg}</span>`;
  let sent = "sent";
  let received = "received";

  if (sender) {
    msgDiv.setAttribute("class", `message ${sent}`);
    sentTone.play();
  } else {
    msgDiv.setAttribute("class", `message ${received}`);
    receivedTone.play();
  }
  document.querySelector(".msg-container").appendChild(msgDiv);
}
