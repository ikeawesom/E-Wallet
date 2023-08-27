"use client";
import LinkingForm from "@/components/Link_page/LinkingForm";
import { paymentDatabase } from "@/supabase/database";
import { useEffect, useState } from "react";

export default function Link() {
  const USERNAME = localStorage.getItem("Login_Username");
  const [bankDetails, setbankDetails] = useState(null);

  useEffect(() => {
    async function getDetails() {
      const { data, error } = await paymentDatabase.getBankDetails(USERNAME);
      if (data !== null) {
        setbankDetails(data[0].bank_details);
      }
    }
    getDetails();
  });

  return (
    <div className="formContainer">
      <LinkingForm username={USERNAME} bank_details={bankDetails} />
    </div>
  );
}
