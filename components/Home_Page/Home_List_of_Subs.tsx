"use client";

export default function Home_List_of_Subs(props: any) {
  var Subs = props.data;

  if (Subs)
    return (
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-semibold text-font-primary">
          Your monthly payments
        </h1>
        <div className="bg-grey rounded-md shadow-inner overflow-hidden">
          <div className="overflow-y-scroll">
            <ul>
              {Subs.map((item: any, key: number) => (
                <li
                  className="flex items-center justify-between px-3 py-4 hover:bg-gray-200"
                  key={key}
                >
                  <div>
                    <a href="/" className="text-xl font-bold text-sec-color">
                      {item.labelName}
                    </a>
                    <p className="text-font-para">{item.serviceName}</p>
                  </div>
                  <h1 className="text-xl font-medium text-primary-color">
                    ${item.amount}
                  </h1>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  return (
    <div className="h-full w-full grid place-items-cente p-10">
      <div className="flex items-center justify-center gap-3 flex-col">
        <img src="/images/empty.svg" alt="Nothing found" width={150} />
        Oops, nothing found here! Try creating a new payment.
      </div>
    </div>
  );
}
