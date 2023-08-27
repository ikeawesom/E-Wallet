"use client";
import Home_List_of_Subs from "@/components/Home_Page/Home_List_of_Subs";
import "./home.modules.css";

export default function HomeBody(props: any) {
  const username = localStorage.getItem("Login_Username");
  const paymentData = props.data.payments;
  const newUser = props.newUser;

  return (
    <div className="flex flex-col gap-8 bg-light-sec-color p-10 rounded-lg w-full md:w-3/4 md:h-[80vh]">
      <h1 className="text-3xl">
        Welcome back,{" "}
        <span className="font-bold text-sec-color">{username}</span>! What shall
        we do today?
      </h1>

      {newUser && (
        <div className="rounded-lg bg-gradient-to-br from-primary-color to-sec-color p-8 flex justify-between items-center gap-10">
          <div>
            <h1 className="text-2xl text-grey font-light">
              <span className="font-bold">Fully automated</span> payment system
              designed just for you
            </h1>
          </div>
          <button className="px-4 py-2 border-2 border-white rounded-lg text-white font-bold text-lg hover:bg-white hover:text-sec-color duration-200">
            <a href="/link">Get started</a>
          </button>
        </div>
      )}

      <Home_List_of_Subs data={paymentData} />
    </div>
  );
}
