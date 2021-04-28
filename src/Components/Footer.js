import React from "react";
import { useSelector } from "react-redux";
import "./Footer.css";

function Footer() {
  const auth = useSelector((state) => state.auth);

  return (
    <div className="mainFooter">
      <a href="/">Covid Service</a>
      <div className="footerRight">
        <a href="mailto:covidservice21@gmail.com">Contact Us</a>
        <a href={auth.authenticate ? "/postasdonor" : "/register"}>
          Register As Donor
        </a>
        <a href={auth.authenticate ? "/postaspatient" : "/register"}>
          Register As Patient
        </a>
        <a href={auth.authenticate ? "/addoxygen" : "/register"}>
          Register As Oxygen Supplier
        </a>
        <a href="/">Faqs</a>
      </div>
    </div>
  );
}

export default Footer;
