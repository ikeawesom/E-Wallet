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

  async GetOTP(username) {
    let ts = Date.now();

    let date_time = new Date(ts);
    let date = date_time.getDate();
    let month = date_time.getMonth() + 1;
    let year = date_time.getFullYear();
    let hour = date_time.getHours();
    let minute = date_time.getMinutes();

    let { data, error } = await supabase
      .from("users")
      .select("OTP-counter")
      .eq("username", username);
    const OTP = Make_OTP(year, month, date, hour, minute, username, data[0]['OTP-counter'])

    return OTP
  }

  async VerifyOTP(username, inputOTP) {
    const OTP = await this.GetOTP(username)
    if (OTP == inputOTP) {
      let { data1, error1 } = await supabase
      .from("users")
      .select("OTP-counter")
      .eq("username", username);

      const { data2, error2 } = await supabase
      .from("users")
      .update({ 'OTP-counter':  15})
      .eq("username", username)
      .select();

      return true
    } else {
      return false
    }
  }
}

function Make_OTP(year, month, date, hour, minute, username, OTP_counter) {
  var usernum = 0;
  for (let i=0; i<username.length; i++) {
    usernum += username.charCodeAt(i)
  }
  const OTP = ((year + month + date) * hour * minute * OTP_counter) * usernum
  console.log(OTP)

  return OTP;
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

  async setBalance(username, value) {
    const { data, error } = await supabase
      .from("user_payments")
      .update({ balance: value })
      .eq("username", username)
      .select();

    return { data, error };
  }
}

export const userDatabase = new userDB();
export const paymentDatabase = new paymentsDB();
