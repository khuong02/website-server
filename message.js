const Models = require("./models/message.models");
const User = require("./models/user.models");
const moment = require("moment");
const users = [];

const formatMess = (name, text) => {
  return {
    name,
    text,
    time: moment().format("h:mm a"),
  };
};

const checkMess = async (io) => {
  const room = await Models.room.find();

  const check = room.filter((item) => item.mess.length !== 0);

  if (!check || check.length === 0) return;

  const optionFind = check.map((item) => item.uuid);

  const userMess = await User.find({
    _id: {
      $in: optionFind,
    },
  });

  io.emit("listMsg", { userMess });
};

const sendMessage = (io) => {};

// const getUser = async (id) => await Models.room.find({ uuid: id });

const getDataInRoom = async (id, io, name) => {
  const dataRoom = await Models.room.findOne({ uuid: id });

  if (!dataRoom) {
    return io.emit(`dataRoom`, []);
  }

  if (dataRoom.mess.length === 0) {
    dataRoom.mess.push(formatMess("admin", `Welcome to my project ${name}`));
  }
  return io.emit(`dataRoom`, dataRoom);
};

const saveMess = async (id, mess, io, name) => {
  const dataRoom = await Models.room.find({ uuid: id });

  const lastMess = dataRoom[0].mess;

  const update = [...lastMess, formatMess(name, mess)];

  await Models.room.findOneAndUpdate({ uuid: id }, { mess: update });

  io.emit(`${id}`, formatMess(name, mess));

  if (dataRoom[0].mess.length === 0) checkMess(io);
};

module.exports = { checkMess, sendMessage, getDataInRoom, saveMess };
