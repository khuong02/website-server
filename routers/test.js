const createUserA = {
  name: "a",
  uuid: "a",
};

const createUserB = {
  name: "b",
  uuid: "b",
};

// action user B search user A by uuid and add friend
const roomAB = {
  name: "ab",
  uuid: "ab",
};

// a join to box chat => keep connect socket => check mess => empty => return
// 1 out => disconnect
// a sent 'hi' to b => show ui a => mess by socket to server
const messA = {
  userUuid: "a",
  value: "hi",
  roomUuid: "ab",
};

const messA1 = {
  userUuid: "a",
  value: "hi",
  roomUuid: "ab",
};

// mess come to server
// show ui b
// and save mess

// load data form db
// a join to box chat => keep connect socket => check mess => one mess 'hi' ( a sent to ser uuid of room => get ) =>

// => a show b show mess
