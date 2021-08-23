const mongoose = require("mongoose");

// const messageSchema = new mongoose.Schema({
//   idAdmin: {
//     type: String,
//     required: true,
//   },
//   idUser: {
//     type: String,
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
// });

const roomSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  mess: {
    type: Array,
  },
});

// const mess = mongoose.model("Message", messageSchema, "message");

const room = mongoose.model("Room", roomSchema, "roomMess");

const Models = {
  //   mess,
  room,
};

module.exports = Models;
