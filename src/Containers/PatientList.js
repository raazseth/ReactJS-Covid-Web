import React, { useEffect } from "react";
import Header from "../Components/Header";
import "./ListStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllPatientDonorProfile } from "../Action";
import FetchPatient from "../Components/FetchPatient";

function PatientList() {
  const donor = useSelector((state) => state.donor);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPatientDonorProfile());
  }, []);

  return (
    <div>
      <div className="listPageHeader">
        <Header />
      </div>
      <div className="donorList">
        {donor.patient.length > 0
          ? donor.patient
              .slice(0)
              .reverse()
              .map((donor) => <FetchPatient donor={donor} />)
          : null}
      </div>
    </div>
  );
}

export default PatientList;
