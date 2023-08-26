"use client";
import "./create.modules.css";
import { useState, useEffect } from "react";

export default function Create() {
  const [serviceInput, setServiceInput] = useState("Select service");
  const [createObj, setCreateObj] = useState({
    labelName: "",
    amount: 0,
    serviceName: "Disney+",
  });
  const [availableAmount, setAvailableAmount] = useState(1000);
  const [otherVisible, setOtherVisible] = useState(false);
  const [amountPromptVisible, setAmountPromptVisible] = useState(false);

  localStorage.setItem("Login_Username", "dong");
  const loginUsername = localStorage.getItem("Login_Username");

  const validAmount = (amount: number, availableAmount: number) => {
    return amount > 0 && amount <= availableAmount;
  };

  async function onSubmit(event: any) {
    event.preventDefault();
    // check if amount if invalid.
    if (!validAmount(createObj.amount, availableAmount)) {
      setAmountPromptVisible(true);
      return;
    }
    window.alert("Success!");
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
  if (!loginUsername) {
    window.location.href = "/login";
  } else if (loginUsername) {
    return (
      <div className="createPage">
        <form onSubmit={onSubmit}>
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
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            type="submit"
          >
            Create new payment
          </button>
        </form>
      </div>
    );
  }
}
