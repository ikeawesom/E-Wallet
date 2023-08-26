import bcrypt from "bcryptjs";

export function handlePassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);

  return { hashed, salt };
}

function randomizer(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let counter = 0;

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  return result;
}

export function handleKeys() {
  var key_list = [];

  for (var i = 0; i < 9; i++) {
    const charactersLength = 6;
    var result = "";

    while (key_list.includes(result) || result === "") {
      var result = randomizer(charactersLength);
    }
    key_list.push(result);
  }

  return key_list;
}
