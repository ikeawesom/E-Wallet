"use client"
import { useState, useEffect, useRef } from 'react';

//Component imports
import Subscription from './Subscription';

export default function Home_List_of_Subs(props: any) {
    const [Subs, setSubs] = useState<object[]>([])
    const Username = props.Username

    useEffect(() => {
      Get_List_of_Subs(Username)
    }, [])

    async function Get_List_of_Subs(Username: string) {
    //call backend API to get the list of subscriptions under this user
    //for now just put sample data and set the Subs state to that
      const TestSub1 = {
        SubID: 0,
        Name: 'Netflix',
        Cost: 10
      }
  
      const TestSub2 = {
        SubID: 1,
        Name: 'PHub',
        Cost: 12
      }

      setSubs([TestSub1, TestSub2])
    }
    return (
      <div>
        <h1>List of Payments:</h1>
        {Subs.map(Sub =>
          <div key={Sub.SubID}>
            <Subscription Sub={Sub} />
          </div>
        )}
      </div>
    );
}