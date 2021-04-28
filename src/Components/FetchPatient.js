import React from "react";
import "./FetchDonor.css";
import {
  FaFemale,
  FaFileMedicalAlt,
  FaHospitalAlt,
  FaHospitalSymbol,
  FaMale,
  FaMapMarkerAlt,
  FaSearch,
  FaTransgender,
} from "react-icons/fa";
import moment from "moment";
import { Tooltip } from "@material-ui/core";
import { MdCall } from "react-icons/md";

export default function FetchPatient({ donor }) {
  const checkGender = () => {
    if (donor.gender === "Male") {
      return (
        <div className="genderList">
          <FaMale className="genderListIcon" />
          <h4>M</h4>
        </div>
      );
    } else if (donor.gender === "Female") {
      return (
        <div className="genderList">
          <FaFemale className="genderListIcon" />
          <h4>F</h4>
        </div>
      );
    } else if (donor.gender === "Other") {
      return (
        <div className="genderList">
          <FaTransgender className="genderListIcon" />
          <h4>O</h4>
        </div>
      );
    }
  };
  return (
    <div className="mainPatntCard">
      <div className="donorCardHead">
        <h2 className="donorCardName">{donor.name}</h2>
        <p className="donorCardTime">
          Posted On {moment(donor.createdAt).fromNow(true)} ago
        </p>
        <div className="donorCardRight">
          <div className="donorCardCntr">
            <h4 className="donorAge">{donor.age} Years</h4>
            {checkGender()}
            <h4
              className={
                donor.bloodgrp.name === "AB-" && "AB+"
                  ? "donorUseBloodName"
                  : "donorBloodName"
              }
              style={{ marginRight: "auto" }}
            >
              <FaSearch /> {donor.bloodgrp.name}
            </h4>{" "}
            <h4>
              <FaFileMedicalAlt /> {donor.casesheet}
            </h4>
          </div>
          <div className="donorCardSecond">
            <p className="donorCardnoteTxt">
              <span className="donorCardNote">Note : </span>
              {donor.note.length > 50
                ? donor.note.substring(0, 50)
                : donor.note}
            </p>
            <p className="donorCardStateCity">
              <FaMapMarkerAlt className="donorCardStateCityIcon" />
              {donor.state},{donor.city}
            </p>
            <p className="donorCardAdrs">{donor.address}</p>
            <p className="donorCardStateCity">
              <FaHospitalAlt className="donorCardStateCityIcon" />
              {donor.hospital}
            </p>
            <p className="donorCardStateCity">
              <FaHospitalSymbol className="donorCardStateCityIcon" />
              {donor.disease}
            </p>
          </div>
          <div className="callBtn">
            <Tooltip title="Call Now" placement="top">
              <button className="contactPatientBtn">
                <a
                  href={`tel:${donor.contactnumber}`}
                  style={{
                    color: "white",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <MdCall
                    style={{
                      marginRight: "4px",
                    }}
                  />{" "}
                  Contact Urgently
                </a>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
}
