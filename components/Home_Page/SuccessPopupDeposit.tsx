import "./home.modules.css";

export default function SuccessPopupDeposit(props: any) {
  return (
    <div className="bg-white fixed top-10 left-1/2 -translate-x-1/2 px-8 py-3 rounded-lg shadow-md text-primary-color text-2xl popup flex items-center justify-between gap-5">
      <img src="/icons/icon_tick.svg" alt="Success" width={30} />
      <h1>
        Successfully deposited{" "}
        <span className="font-bold text-sec-color">{`$${props.item}`}</span>
      </h1>
    </div>
  );
}
