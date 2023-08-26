import supabase from "./config";
import { handlePassword, handleKeys, verifyLogin } from "./helpers";

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
    let { data, error } = await supabase
      .from("users")
      .select("password, salt")
      .eq("username", username);

    const valid = verifyLogin(data, password);

    return { data, error, valid };
  }
}

class paymentsDB {
  async getPaymentDetails(username) {
    let { data, error } = await supabase
      .from("user_payments")
      .select("balance, payments, monthly_payments")
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

  async setMonthlyPayments(username, value) {
    const { data, error } = await supabase
      .from("user_payments")
      .update({ monthly_payments: value })
      .eq("username", username)
      .select();

    return { data, error };
  }
}

export const userDatabase = new userDB();
export const paymentDatabase = new paymentsDB();
