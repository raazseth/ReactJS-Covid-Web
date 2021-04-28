import React, { useEffect, useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDonorProfile,
  getAllPatientDonorProfile,
  getCovidOverall,
  getOxygen,
} from "../Action";
import Header from "../Components/Header";
import FetchDonor from "../Components/FetchDonor";
import FetchPatient from "../Components/FetchPatient";
import { Link } from "react-router-dom";
import BloodDonation from "../Assets/BloodDonation.svg";
import Footer from "../Components/Footer";
import FetchOxygen from "../Components/FetchOxygen";

export default function Home() {
  const auth = useSelector((state) => state.auth);
  const donor = useSelector((state) => state.donor);
  const covid = useSelector((state) => state.covid);
  const oxygen = useSelector((state) => state.oxygen);
  const [data, setdata] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDonorProfile());
    dispatch(getAllPatientDonorProfile());
    dispatch(getCovidOverall());
    dispatch(getOxygen());
  }, []);

  useEffect(() => {
    // fetch("https://api.covid19india.org/state_district_wise.json")
    // fetch("https://covidtracking.com/api/states")
    fetch("https://api.covid19india.org/data.json")
      .then((res) => res.json())
      .then((data) => setdata(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <div className="homeUpperHead">
        <Header />
        <div className="mainHome">
          <div className="homeHead">
            <h1>SAVE LIVES WITH PLASMA</h1>
            <div className="innerHomeHead">
              <p>Plasma from recovered COVID-19 patients can help save lives</p>
              <p style={{ fontSize: "12px", marginTop: "4px" }}>
                *Plasma therapy is an experimental COVID therapy. Before you
                register, please consult your doctor if this is required. Only
                patients with a case sheet from the doctor on duty will be
                matched.
              </p>
            </div>

            <img src={BloodDonation} alt="Doctor" className="mainHomeImg" />
          </div>{" "}
        </div>{" "}
      </div>
      <div className="homeSectionTwo">
        <div className="homeSectionTwoCntnt">
          <h1>PLEASE LET US KNOW</h1>
          <div className="homeSectionTwoCntntMain">
            <div className="homeSectionTwoC1">
              <h2>WANT TO DONATE PLASMA</h2>
              <p>
                Recovered or quarantined patients of COVID-19 who are willing to
                donate
              </p>

              <Link to={auth.authenticate ? "postasdonor" : "/register"}>
                <button className="homeReg">Register Here</button>
              </Link>
            </div>
            <div className="homeSectionTwoC2">
              <h2>LOOKING FOR PLASMA</h2>
              <p>If you are looking out for a donor, register here</p>
              <Link to={auth.authenticate ? "/postaspatient" : "/register"}>
                <button className="homeReg">Register Here</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="homeSectionCovidMain">
        <h2 className="donorTxt">Covid Stats</h2>
        <h4>Stay Safe, Stay Home</h4>
        {covid.overall.cases_time_series.length>0
          ? covid.overall.cases_time_series.slice(-1).map((casess, i) => (
              <div key={i} className="homeSectionCovid">
                <div className="homeSectionCovidOne">
                  <h3 className="dailyconfirmed">
                    {casess.dailyconfirmed}
                    <span className="dailySpan">Daily Confirmed</span>
                  </h3>
                  <h3 className="dailydeceased">
                    {casess.dailydeceased}
                    <span className="dailySpan">Daily Decreased</span>
                  </h3>
                  <h3 className="dailyrecovered">
                    {casess.dailyrecovered}
                    <span className="dailySpan">Daily Recovered</span>
                  </h3>
                </div>
                <div className="homeSectionCovidTwo">
                  <h3 className="totalconfirmed">
                    {casess.totalconfirmed}
                    <span className="dailySpan">Total Confirmed</span>
                  </h3>
                  <h3 className="totaldeceased">
                    {casess.totaldeceased}
                    <span className="dailySpan">Total Decreased</span>
                  </h3>
                  <h3 className="totalrecovered">
                    {casess.totalrecovered}
                    <span className="dailySpan">Total Recovered</span>
                  </h3>
                </div>
              </div>
            ))
          : null}
        <a href="/covid">View More</a>
      </div> */}

      <div className="homeSectionThree">
        <h1 className="donorTxt">Donors</h1>
        <div className="donorList">
          {donor.donor.length > 0
            ? donor.donor
                .slice(0)
                .reverse()
                .map((donor) => <FetchDonor donor={donor} key={donor._id} />)
            : null}
        </div>
        {/* <a href="/donors" className="showMore">
          View More
        </a> */}
        <h1 className="donorTxt">Patient Requests</h1>
        <div className="donorList">
          {donor.patient.length > 0
            ? donor.patient
                .slice(0)
                .reverse()
                .map((donor) => <FetchPatient donor={donor} key={donor._id} />)
            : null}
        </div>
        {/* <a href="/requests" className="showMore">
          View More
        </a> */}
      </div>
      <div className="homeSectionThree">
        <h1 className="donorTxt">Oxygen Cylinders</h1>
        <div className="donorList">
          {oxygen.oxygen.length > 0
            ? oxygen.oxygen.slice(0).reverse()
            .map((oxygen) => <FetchOxygen oxygen={oxygen} key={oxygen._id} />)
             : null}
        </div>{" "}
      </div>

      <div className="homeSectionLast">
        <Footer />
      </div>
    </div>
  );
}
