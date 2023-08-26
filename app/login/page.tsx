import "./login.modules.css";
import LoginForm from "@/src/components/login-page/LoginForm";

export default function Page() {
  return (
    // <div className="grid place-items-center">
    <div className="flex flex-wrap h-screen">
      <div className="flex-1 sm:relative h-screen fixed grid place-items-center max-[640px]:w-full px-10 sm:px-8">
        <div className="flex flex-col gap-y-6 bg-white p-10 sm:p-0 rounded-md shadow-lg sm:shadow-none sm:w-3/4">
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-medium text-font-primary">
              Welcome to <span className="font-extrabold">WhatTheWallet</span>
            </h1>
            <p className="text-lg font-light text-font-para">Let's begin!</p>
          </div>

          <LoginForm />
        </div>
      </div>
      <div className="flex-1 bg-login bg-center bg-cover h-screen"></div>
    </div>
    // </div>
  );
}
