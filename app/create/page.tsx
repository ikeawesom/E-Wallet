"use client";
import "./create.modules.css";
import { useState, useEffect, useRef } from "react";
import { paymentDatabase, userDatabase } from "@/supabase/database";
import CreateNav from "@/components/Create_Page/CreateNav";

export default function Create() {
  const DEFAULT_OBJECT = {
    labelName: "",
    amount: 0,
    serviceName: "Disney+",
  };
  const MonthRef = useRef<number>(0);
  const [curPayments, setCurPayments] = useState<object[]>([]);
  const [serviceInput, setServiceInput] = useState<string>("Select service");
  const [createObj, setCreateObj] = useState(DEFAULT_OBJECT);
  const [otherVisible, setOtherVisible] = useState(false);
  const [amountPromptVisible, setAmountPromptVisible] = useState(false);

  const loginUsername = localStorage.getItem("Login_Username");

  const validAmount = (amount: number) => {
    return amount > 0;
  };

  async function onSubmit(event: any) {
    event.preventDefault();
    // check if amount if invalid.
    if (!validAmount(createObj.amount)) {
      setAmountPromptVisible(true);
      return;
    }

    MonthRef.current = MonthRef.current + createObj.amount;
    var toinsert = [];
    if (curPayments) {
      toinsert = [...curPayments, createObj];
    } else {
      toinsert = [createObj];
    }
    //setCreateObj(DEFAULT_OBJECT);
    console.log(curPayments);
    await paymentDatabase.setPayments(
      localStorage.getItem("Login_Username"),
      toinsert
    );
    await paymentDatabase.setMonthlyPayments(
      localStorage.getItem("Login_Username"),
      MonthRef.current
    );
    
    localStorage.setItem("add-item", createObj.labelName);
    if (event.target[3].checked) {
      const RealOTP = await userDatabase.GetOTP(loginUsername)
      await fetch('/API/?OTP=' + RealOTP, {
        method: 'GET'
      })
      window.location.href = '/OTPVERIFY'
    } else {
      window.location.reload()
    }
  }

  const handleSelect = (value: string) => {
    if (value === "Others" && !otherVisible) {
      setOtherVisible(true);
    } else {
      setOtherVisible(false);
      setCreateObj({ ...createObj, serviceName: value });
    }
    setServiceInput(value);
  };
  async function GetData() {
    const { data, error } = await paymentDatabase.getPaymentDetails(
      localStorage.getItem("Login_Username")
    );
    if (error) {
      console.log("Error connecting to db");
    } else if (data !== null) {
      setCurPayments(data[0].payments);
      MonthRef.current = data[0].monthly_payments;
      console.log(MonthRef.current, data[0].monthly_payments);
    }
  }
  useEffect(() => {
    GetData();
  }, []);

  if (!loginUsername) {
    window.location.href = "/login";
  } else if (loginUsername) {
    return (
      <div className="w-full h-screen grid place-items-center bg-grey">
        <CreateNav />
        <form
          onSubmit={onSubmit}
          className="w-1/4 shadow-md p-10 bg-white rounded-md"
        >
          <h1 className="text-2xl font-bold text-primary-color">
            Add a <span className="text-sec-color">recurring payment</span>
          </h1>
          <input
            name="labelName"
            id="labelName"
            type="text"
            placeholder="Enter label name"
            onChange={(e) =>
              setCreateObj({ ...createObj, [e.target.name]: e.target.value })
            }
            required
          />
          <input
            name="amount"
            id="amountInput"
            type="number"
            placeholder="Enter amount to deposit monthly"
            onClick={(e) => setAmountPromptVisible(false)}
            onChange={(e) => {
              setCreateObj({
                ...createObj,
                [e.target.name]: e.target.valueAsNumber,
              });
            }}
            required
          />
          {amountPromptVisible && (
            <p className="text-red-500">Invalid amount entered!</p>
          )}
          <select
            className="w-full"
            value={serviceInput}
            name="serviceName"
            onChange={(e) => handleSelect(e.target.value)}
          >
            <option value="Disney+">Disney+</option>
            <option value="Netflix">Netflix</option>
            <option value="Youtube">Youtube</option>
            <option value="TikTok">Tiktok</option>
            <option value="Twitch">Twitch</option>
            <option value="Spotify">Spotify</option>
            <option value="AmazonPrime">Amazon Prime</option>
            <option value="Apple">Apple payment</option>
            <option value="Samsung">Samsung payment</option>
            <option value="Others">Others</option>
          </select>
          {otherVisible && (
            <input
              name="otherLabelName"
              id="otherLabelName"
              type="text"
              placeholder="Enter custom service name"
              onChange={(e) => {
                setCreateObj({ ...createObj, serviceName: e.target.value });
              }}
            />
          )}
          <input type='checkbox' /> Would you like to instantly draw funds for this new subscription?
          <button
            className="bg-primary-color text-grey py-3 w-full rounded-md hover:bg-sec-color duration-200"
            type="submit"
          >
            Create new payment
          </button>
        </form>
      </div>
    );
  }
}
