"use client";
import LinkingForm from "@/components/Link_page/LinkingForm";
import { paymentDatabase } from "@/supabase/database";
import { useEffect, useState } from "react";

export default function Link() {
  const USERNAME = localStorage.getItem("Login_Username");
  const [bankNum, setbankNum] = useState(null);

  useEffect(() => {
    async function getDetails() {
      const { data, error } = await paymentDatabase.getBankDetails(USERNAME);
      if (data !== null) {
        setbankNum(data[0].bank_account);
      }
    }
    getDetails();
  });

  return (
    <div className="formContainer">
      <LinkingForm username={USERNAME} bank_account={bankNum} />
    </div>
  );
}
