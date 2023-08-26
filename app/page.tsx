"use client"
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [Login_Username, set_Login_Username] = useState(localStorage.getItem('Login_Username')) //Get the Login Username. will be null if not logged in
  
  function Logout (event: any) {
    localStorage.removeItem('Login_Username') //remove Login_Username from localstorage so client is no longer logged in
    window.location.reload(); //reload the page
  }
  if (!Login_Username) { //if Login_Username is null, means user is not logged in
    //reroute to login page
    window.location.href = '/Login';
  } else {

    return (
      <div>
        <h1>Hello {localStorage.getItem('Login_Username')}!</h1> <br />

        <button onClick={Logout}>Logout</button>
      </div>
    );
  }
}
