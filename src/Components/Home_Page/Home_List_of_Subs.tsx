"use client";
import { useState, useEffect, useRef } from "react";

//Component imports
import Subscription from "./Subscription";

//Backend imports
const { userDatabase, paymentDatabase } = require('../../../supabase/database');

export default function Home_List_of_Subs(props: any) {
  const [Subs, setSubs] = useState<object[]>([]);
  const BalanceRef = useRef(0);
  const Username = props.Username;

  useEffect(() => {
    Get_List_of_Subs(Username);
  }, []);

  async function Get_List_of_Subs(Username: string) {
    //call backend API to get the list of subscriptions under this user
    const result = await paymentDatabase.getPaymentDetails(Username)

    if (result.error) {
      console.log(result.error) //console log the erro if there is an error
    } else if (!result.error) {
      console.log(result.data)
      BalanceRef.current = result.data[0].balance
      setSubs(result.data[0].payments) //if no error, set Subs to be the array of payments returned in the query
    }
  }
  return (
    <div>
      {Subs.length == 0 ?
        <div>
          there are no Payments
        </div>
      :
      <div>
        <h1>List of Payments:</h1>
        <div>{BalanceRef.current}</div>
        {Subs.map((Sub) => (
          <div key={Sub.labelName}>
            <Subscription Sub={Sub} />
          </div>
        ))}
      </div>
      }
    </div>
  );
}
