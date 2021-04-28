import React, { useEffect } from "react";
import FetchDonor from "../Components/FetchDonor";
import Header from "../Components/Header";
import "./ListStyle.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllDonorProfile } from "../Action";

function DonorList() {
  const donor = useSelector((state) => state.donor);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDonorProfile());
  }, []);
  return (
    <div>
      <div className="listPageHeader">
        <Header />
      </div>
      <div>
        <div className="donorList">
          {donor.donor.length > 0
            ? donor.donor
                .slice(0)
                .reverse()
                .map((donor) => <FetchDonor donor={donor} />)
            : null}
        </div>
      </div>
    </div>
  );
}

export default DonorList;
