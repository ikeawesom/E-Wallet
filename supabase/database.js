import supabase from "./config";
import { handlePassword, handleKeys } from "./helpers";

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

class paymentsDB {
  async getPayments(username) {
    let { data, error } = await supabase
      .from("user_payments")
      .select("amount, payments")
      .eq("username", username);

    return { data, error };
  }

  async setPayments(username, list) {
    const { data, error } = await supabase
      .from("user_payments")
      .update({ payments: list })
      .eq("username", username)
      .select();

    return { data, error };
  }
}

export const userDatabase = new userDB();
export const paymentDatabase = new paymentsDB();
