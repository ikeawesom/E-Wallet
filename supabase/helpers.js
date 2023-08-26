import bcrypt from "bcryptjs";

export function handlePassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hashed = bcrypt.hashSync(password, salt);

  return { hashed, salt };
}
