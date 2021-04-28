import React from "react";
import ErrorImg from "../Assets/ErrorImg.svg";

function ErrorPage() {
  return (
    <div>
      <img src={ErrorImg} alt="ErrorImg" style={{width:"100%",height:"44em"}}/>
    </div>
  );
}

export default ErrorPage;
