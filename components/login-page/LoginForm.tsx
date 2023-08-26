"use client";

import { useEffect, useState } from "react";
import { paymentDatabase, userDatabase } from "@/supabase/database";

export default function LoginForm() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [newUser, setNew] = useState(false);
  const [errorText, setErrorText] = useState<string | undefined>();

  useEffect(() => {
    if (localStorage.getItem("Login_Username")) window.location.href = "/";
  }, []);

  const handleChange = (e: any) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleErrors = (code: any, message: any) => {
    if (code === "23505") message = "Username taken. Select another username.";
    setErrorText(`ERROR: ${message}`);
  };

  function setLocals(data: any) {
    localStorage.setItem("Login_Username", user.username);
    localStorage.setItem("safekeys", data[0].safekeys);
    window.location.href = "/";
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (newUser) {
      // Sign up
      const { data, error } = await userDatabase.addUser(
        user.username,
        user.password
      );

      if (error) handleErrors(error.code, error.message);
      else {
        setLocals(data);
      }
    } else {
      // Sign in
      const { data, error, valid } = await userDatabase.loginUser(
        user.username,
        user.password
      );

      if (error) handleErrors(error.code, error.message);
      else {
        if (!valid)
          handleErrors(0, "Invalid username/password. Please try again.");
        if (valid) setLocals(data);
      }
    }
  };

  if (!newUser)
    return (
      <form className="flex flex-col gap-3 fade-down" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
        />
        {errorText && <h1 className="text-red-500">{errorText}</h1>}
        <button type="submit" className="submit-button">
          Log in
        </button>
        <p>
          New to WhatTheWallet?{" "}
          <span
            className="text-primary-color cursor-pointer"
            onClick={() => setNew(!newUser)}
          >
            Sign up.
          </span>
        </p>
      </form>
    );

  return (
    <form className="flex flex-col gap-3 fade-down" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Enter a username"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Enter a password"
        onChange={handleChange}
      />
      {errorText && <h1 className="text-red-500">{errorText}</h1>}
      <button type="submit" className="submit-button hover:opacity-70">
        Sign up
      </button>
      <p>
        Already have an account?{" "}
        <span
          className="text-primary-color cursor-pointer"
          onClick={() => setNew(!newUser)}
        >
          Log in.
        </span>
      </p>
    </form>
  );
}
