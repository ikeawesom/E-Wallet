"use client"
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [Login_Username, set_Login_Username] = useState(localStorage.getItem('Login_Username')) //Get the Login Username. will be null if not logged in
  if (!Login_Username) { //if Login_Username is null, means user is not logged in
    //reroute to login page
  } else {
    return (
      <h1>
          Hello {localStorage.getItem('Login_Username')}!
      </h1>
    );
  }
}
