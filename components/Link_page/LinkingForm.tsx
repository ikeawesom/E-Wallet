"use client";
import { useRef, useState } from "react";
import { paymentDatabase } from "@/supabase/database";

export default function LinkingForm(props: any) {
  const USERNAME = props.username;
  const [emptyPrompt, setEmptyPrompt] = useState(false);
  const [bankAcc, setBankAcc] = useState(
    props.bank_account ? props.bank_account : ""
  );

  async function onSubmit(event: any) {
    event.preventDefault();
    if (bankAcc !== "") {
      const { data, error } = await paymentDatabase.linkBank(
        USERNAME,
        Number.parseInt(bankAcc)
      );
      if (!error) {
        window.alert("Successfully modified bank account number!");
        window.location.href = "/";
      } else {
        console.log(error);
      }
    } else {
      setEmptyPrompt(true);
      return;
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={USERNAME} name="username" disabled />
      <input
        type="text"
        value={bankAcc}
        name="bankAcc"
        onChange={(e) => {
          setBankAcc(e.target.value);
        }}
      />
      {emptyPrompt && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">Empty bank details!</span>Please enter
          your bank account number
        </p>
      )}
      <button type="submit">Modify changes</button>
    </form>
  );
}
