"use client";
import { FormEvent, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements, Elements } from "@stripe/react-stripe-js";

import { stripePay } from "@/stripe/payments";
import CreateNav from "@/components/Create_Page/CreateNav";
import CheckoutForm from "@/components/Manual/CheckoutForm";
import { paymentDatabase } from "@/supabase/database";

// }

export default function Page(props: any) {
  const username = localStorage.getItem("Login_Username");
  const [clientSecret, setClientSecret] = useState<any>();
  const [stripePromise, setPromise] = useState<any>();
  const [deposit, setDeposit] = useState(0);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const { data, error } = await paymentDatabase.getPaymentDetails(username);

    if (data) {
      const balance = data[0].balance;
      const res = await paymentDatabase.setBalance(username, balance + deposit);
      if (res.data) {
        localStorage.setItem("deposit", deposit.toString());
        window.location.href = "/";
      }
    }
  }
  useEffect(() => {
    const API_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_TEST;

    if (API_KEY) setPromise(loadStripe(API_KEY));

    async function clientSetup() {
      const res = await stripePay.manual(100);
      if (res) setClientSecret(res.clientSecret);
    }
    clientSetup();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
  };

  return (
    <div className="grid place-items-center w-full h-screen">
      <CreateNav />

      {/* {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )} */}

      <form className="w-1/4 flex flex-col gap-5" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-center text-primary-color">
          Deposit Manually
        </h1>
        <input
          type="number"
          className="w-full"
          value={deposit}
          placeholder="Enter an amount to deposit"
          onChange={(e) => setDeposit(Number.parseInt(e.target.value))}
        />
        <button
          type="submit"
          className="w-full py-3 bg-primary-color hover:bg-sec-color duration-200 rounded-md text-white"
        >
          Submit
        </button>
        <p className="text-sm text-font-para">
          Note: Since this is a manual deposit directly from your account, there
          will be extra layers of security to prevent fraud.
        </p>
      </form>
    </div>
  );
}
