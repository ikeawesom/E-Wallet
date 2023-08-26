"use client";
import "./home.modules.css";

export default function NavBar(props: any) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-4xl font-extrabold">
        WhatThe<span className="text-sec-color">Wallet</span>?
      </h1>
      <button
        className="bg-primary-color px-4 py-2 rounded-lg text-white hover:bg-sec-color duration-200"
        onClick={props.Logout}
      >
        Logout
      </button>
    </div>
  );
}
