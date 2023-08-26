"use client";
import Home_List_of_Subs from "@/src/components/Home_Page/Home_List_of_Subs";
import Nav_Bar from "@/src/components/Home_Page/Home_NavBar";
import { useState, useEffect, useRef } from "react";

//Component imports

export default function Home() {
  const [Login_Username, set_Login_Username] = useState(
    localStorage.getItem("Login_Username")
  ); //Get the Login Username. will be null if not logged in

  function Logout(event: any) {
    localStorage.removeItem("Login_Username"); //remove Login_Username from localstorage so client is no longer logged in
    window.location.reload(); //reload the page
  }
  if (!Login_Username) {
    //if Login_Username is null, means user is not logged in
    //reroute to login page
    window.location.href = "/login";
  } else {
    return (
      <div>
        <Nav_Bar Logout={Logout} />
        <br />
        <Home_List_of_Subs Username={Login_Username} />
      </div>
    );
  }
}
