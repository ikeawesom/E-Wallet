export default function CreateNav() {
  return (
    <nav className="fixed top-0 left-0 w-full p-5 shadow-md bg-white">
      <a
        className="flex gap-3 hover:opacity-70 duration-200 text-primary-color w-fit"
        href="/"
      >
        <img src="/icons/icon_left.svg" alt="Back" width={20} />
        Back to Dashboard
      </a>
    </nav>
  );
}
