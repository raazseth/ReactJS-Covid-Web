import React from "react";
import "./FetchOxygen.css";
import moment from "moment";
import { Tooltip } from "@material-ui/core";
import { MdCall } from "react-icons/md";
import { FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";

function FetchOxygen({ oxygen }) {
  return (
    <div className="mainOxygen">
      <p className="donorCardTime">
        Posted On {moment(oxygen.createdAt).fromNow(true)} ago
      </p>
      <div>
        <h1>{oxygen.name}</h1>
        <h4>
          <FaRupeeSign />
          {oxygen.pricing}
        </h4>
        <p>
          <span className="donorCardNote">Note : </span>
          {oxygen.note}
        </p>
      </div>
      <div>
        <p className="donorCardStateCity">
          <FaMapMarkerAlt className="donorCardStateCityIcon" />
          {oxygen.state},{oxygen.city}
        </p>
        <p className="donorCardAdrs">{oxygen.address}</p>{" "}
        <p className="donorCardAdrs">{oxygen.landmark}</p>
      </div>

      <div className="callBtn">
        <Tooltip title="Call Now" placement="top">
          <button className="oxygenBtn">
            <a
              href={`tel:${oxygen.contactnumber}`}
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
              Contact
            </a>
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export default FetchOxygen;
