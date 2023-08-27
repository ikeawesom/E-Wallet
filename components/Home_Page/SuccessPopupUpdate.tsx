import "./home.modules.css";

export default function SuccessPopupUpdate(props: any) {
  return (
    <div className="bg-white fixed top-10 left-1/2 -translate-x-1/2 px-8 py-3 rounded-lg shadow-md text-primary-color text-2xl popup flex items-center justify-between gap-5">
      <img src="/icons/icon_tick.svg" alt="Success" width={30} />
      <h1>Successfully updated bank details.</h1>
    </div>
  );
}
