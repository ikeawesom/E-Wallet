import bcrypt from "bcryptjs";

export function handlePassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);

  return { hashed, salt };
}

export function handleKeys() {
  const charactersLength = 6;
  let key_list = [];

  for (let i = 0; i++; i < 9) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let counter = 0;

    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    key_list.push(result);
  }

  return key_list;
}
