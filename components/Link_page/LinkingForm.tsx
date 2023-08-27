"use client";
import { useRef, useState, useEffect } from "react";
import { paymentDatabase } from "@/supabase/database";

export default function LinkingForm(props: any) {
  const USERNAME = props.username;
  const [emptyPrompt, setEmptyPrompt] = useState(false);
  const [bankDetails, setbankDetails] = useState({
    card_num: "",
    cvv: "",
    date_of_expiry: "",
  });

  useEffect(() => {
    async function getDetails() {
      const { data, error } = await paymentDatabase.getBankDetails(USERNAME);
      if (data !== null) {
        if (data[0].bank_details !== null) {
          console.log(data[0]);
          setbankDetails(data[0].bank_details);
        }
      }
    }
    getDetails();
  }, []);

  console.log(bankDetails, props.bank_details);
  async function onSubmit(event: any) {
    event.preventDefault();
    if (
      bankDetails.cvv === "" ||
      bankDetails.card_num === "" ||
      bankDetails.date_of_expiry === ""
    ) {
      setEmptyPrompt(true);
      return;
    }
    const { data, error } = await paymentDatabase.linkBank(
      USERNAME,
      bankDetails
    );
    if (error) {
      console.log(error);
    } else {
      window.alert("Successfully modified bank details!");
      window.location.href = "/";
    }
  }
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 w-1/4">
      <h3>Username:</h3>
      <input
        type="text"
        value={USERNAME}
        name="username"
        readOnly
        className="w-full"
      />
      <h3>Card number</h3>
      <input
        className="w-full"
        type="text"
        value={bankDetails.card_num}
        name="card_num"
        onChange={(e) => {
          setbankDetails({
            ...bankDetails,
            [e.target.name]: e.target.value,
          });
          console.log(e.target.value);
        }}
      />
      <h3>CVV:</h3>
      <input
        className="w-full"
        type="number"
        value={bankDetails.cvv}
        name="cvv"
        onChange={(e) => {
          setbankDetails({
            ...bankDetails,
            [e.target.name]: e.target.valueAsNumber,
          });
        }}
      />
      <h3>Date of expiry</h3>
      <input
        className="w-full"
        type="text"
        value={bankDetails.date_of_expiry}
        name="date_of_expiry"
        onChange={(e) => {
          setbankDetails({ ...bankDetails, [e.target.name]: e.target.value });
        }}
      />
      {emptyPrompt && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">Empty bank number!</span>Please enter
          your bank account number
        </p>
      )}
      <button
        type="submit"
        className="bg-primary-color text-grey py-3 w-full rounded-md hover:bg-sec-color duration-200"
      >
        Modify changes
      </button>
    </form>
  );
}
