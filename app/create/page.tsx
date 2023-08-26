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

  const validAmount = (amount: number, availableAmount: number) => {
    return amount > 0 && amount <= availableAmount;
  };

  async function onSubmit() {}

  const handleSelect = (value: string) => {
    if (value === "Others" && !otherVisible) {
      setOtherVisible(true);
    } else {
      setOtherVisible(false);
      setCreateObj({ ...createObj, serviceName: value });
    }
    setServiceInput(value);
  };

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
          onChange={(e) => {
            if (validAmount(e.target.valueAsNumber, availableAmount)) {
              setCreateObj({
                ...createObj,
                [e.target.name]: e.target.valueAsNumber,
              });
            }
          }}
          required
        />
        <select
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
          />
        )}
        <button type="submit">Create new payment</button>
      </form>
    </div>
  );
}
