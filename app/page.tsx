"use client";
import HomeBody from "@/components/Home_Page/Home_Body";
import NavBar from "@/components/Home_Page/Home_NavBar";
import StatsBar from "@/components/Home_Page/Home_StatsBar";
import SuccessPopup from "@/components/Home_Page/SuccessPopup";
import { paymentDatabase } from "@/supabase/database";
import { useState, useEffect } from "react";

export default function Home() {
  const [added, setAdded] = useState(false);
  const Login_Username = localStorage.getItem("Login_Username");
  const new_item = localStorage.getItem("add-item");

  //Get the Login Username. will be null if not logged in

  function Logout(event: any) {
    localStorage.removeItem("Login_Username"); //remove Login_Username from localstorage so client is no longer logged in
    window.location.reload(); //reload the page
  }

  function createNotif() {
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      localStorage.removeItem("add-item");
    }, 3000);
  }

  if (!Login_Username) {
    //if Login_Username is null, means user is not logged in
    //reroute to login page
    window.location.href = "/login";
  } else {
    const [paymentData, setPaymentData] = useState<any>();
    const [newUser, setNewUser] = useState(false);

    useEffect(() => {
      if (new_item !== null) {
        createNotif();
      }

      async function getList() {
        const { data, error } = await paymentDatabase.getPaymentDetails(
          localStorage.getItem("Login_Username")
        );
        if (error) console.log(error);

        if (data) {
          setPaymentData(data[0]);
          if (!data[0].payments) {
            setNewUser(true);
          }
        }
      }
      getList();
    }, []);

    if (paymentData)
      return (
        <div className="px-10 py-5 bg-white h-screen">
          <NavBar Logout={Logout} />

          <div className="flex w-full justify-between py-3 gap-10 md:flex-row flex-col-reverse">
            <HomeBody data={paymentData} newUser={newUser} />
            <StatsBar data={paymentData} />
          </div>

          {/* <Home_List_of_Subs Username={Login_Username} /> */}
          <h1 className="text-font-para bg-transparent text-center">
            Copyright &copy; 2023 whoami. All Rights Reserved.
          </h1>

          {added && <SuccessPopup item={new_item} />}
        </div>
      );
    return <h1>Loading...</h1>;
  }
}
