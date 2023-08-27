"use client";
import LinkingForm from "@/components/Link_page/LinkingForm";
export default function Link() {
  const USERNAME = localStorage.getItem("Login_Username");

  return (
    <div className="formContainer">
      <LinkingForm username={USERNAME} />
    </div>
  );
}
