import React from "react";
import "./FetchDonor.css";
import {
  FaAward,
  FaFemale,
  FaMale,
  FaMapMarkerAlt,
  FaTransgender,
} from "react-icons/fa";
import moment from "moment";
import { Tooltip } from "@material-ui/core";
import { MdCall } from "react-icons/md";

function FetchDonor({ donor }) {
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
    <div className="mainDonorCard">
      <div className="donorCardHead">
        <h2 className="donorCardName">
          {donor.name}
          {donor.createdBy.role === "donororganizaton" ? (
            <span className="donorCardOrg">
              Organization <FaAward />
            </span>
          ) : null}
        </h2>
        <p className="donorCardTime">
          Posted On {moment(donor.createdAt).fromNow(true)} ago
        </p>
        <div className="donorCardRight">
          <div className="donorCardCntr">
            {donor.age ? <h4 className="donorAge">{donor.age} Years</h4> : null}
            {donor.gender ? checkGender() : null}
            <h4
              className={
                !donor.age && !donor.gender
                  ? "donorUseBloodName"
                  : "donorBloodName"
              }
            >
              {donor.bloodgrp.map((bld,i) => (
                <span key={i}>
                  {bld.name} <span>{""}</span>
                </span>
              ))}
            </h4>{" "}
          </div>
          <div className="donorCardSecond">
            <p className="donorCardnoteTxt">
              <span className="donorCardNote">Note : </span>
              {donor.note.length > 28
                ? donor.note.substring(0, 28)
                : donor.note}
            </p>
            <p className="donorCardStateCity">
              <FaMapMarkerAlt className="donorCardStateCityIcon" />
              {donor.state},{donor.city}
            </p>
            <p className="donorCardAdrs">{donor.address}</p>
          </div>
          <div className="callBtn">
            <Tooltip title="Call Now" placement="top">
              <button className="contactBtn">
                <a
                  href={`tel:${+donor.contactnumber}`}
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
                  />
                  Contact
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

export default FetchDonor;
