"use client";

import { Line } from "rc-progress";

export default function StatsBar(props: any) {
  const balance = props.data.balance;
  const total_payments = props.data.monthly_payments;
  var progress = null;
  if (total_payments !== 0) {
    progress = (balance / total_payments) * 100;
  } else {
    progress = 0;
  }

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let currentDate = `${day}-${month}-${year}`;

  const services_list = [
    { name: "Connect bank", link: "/link", icon: "bank" },
    { name: "Add payment", link: "/create", icon: "add-card" },
    { name: "Top up manually", link: "", icon: "add-wallet" },
  ];

  return (
    <div className="flex flex-col gap-7 w-full md:w-1/4 text-center items-center">
      <div className="flex flex-col gap-3">
        <p className="text-font-para">Your balance</p>
        <h1 className="text-primary-color text-5xl">
          ${balance} / {total_payments}
        </h1>
        <p className="text-font-para">Last updated: {currentDate}</p>
      </div>

      {progress && (
        <Line
          percent={progress}
          strokeWidth={10}
          trailWidth={10}
          trailColor="var(--grey)"
          strokeLinecap="round"
          className="drop-shadow-sm"
          strokeColor="var(--sec-color)"
        />
      )}

      <img src="/images/card.svg" alt="card" width={200} />

      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-xl">Services</h1>
        <ul className="flex gap-2 services-list flex-wrap justify-center">
          {services_list.map((item, i) => (
            <a
              href={item.link}
              key={i}
              className="bg-white px-5 py-2 rounded-md shadow-md hover:brightness-95"
            >
              <li className="flex items-center justify-between gap-3">
                {item.name}
                <img src={`/icons/icon_${item.icon}.svg`} alt="" width={20} />
              </li>
            </a>
          ))}
        </ul>
      </div>
    </div>
  );
}
