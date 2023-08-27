"use client";
import CreateNav from "@/components/Create_Page/CreateNav";
import LinkingForm from "@/components/Link_page/LinkingForm";
export default function Link() {
  const USERNAME = localStorage.getItem("Login_Username");

  return (
    <div className="formContainer grid place-items-center h-screen">
      <CreateNav />
      <LinkingForm username={USERNAME} />
    </div>
  );
}
