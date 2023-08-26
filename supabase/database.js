import supabase from "./config";
import { handlePassword } from "./helpers";

class userDB {
  async addUser(username, password) {
    const keys = handleKeys();
    const { hashed, salt } = handlePassword(password);
    const { data, error } = await supabase
      .from("users")
      .insert([
        { username: username, password: hashed, salt: salt, safekeys: keys },
      ])
      .select();

    return { data, error };
  }

  async loginUser(username, password) {
    const hashed = handlePassword(password);

    let { data: users, error } = await supabase
      .from("users")
      .select("password")
      .eq("username", username);

    return { data, error };
  }
}

export const userDatabase = new userDB();
