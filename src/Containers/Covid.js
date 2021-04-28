import React, { useEffect, useState } from "react";
import Header from "../Components/Header";

function Covid() {
  const [data, setdata] = useState({});
  const [WholeData, setWholeData] = useState({});
  useEffect(() => {
    fetch("https://api.covid19india.org/state_district_wise.json")
      // fetch("https://covidtracking.com/api/states")
      // fetch("https://api.covid19india.org/data.json")
      .then((res) => res.json())
      .then((data) => setdata(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // fetch("https://covidtracking.com/api/states")
    fetch("https://api.covid19india.org/data.json")
      .then((res) => res.json())
      .then((data) => setWholeData(data))
      .catch((error) => console.log(error));
  }, []);

  console.log(data);
  console.log(WholeData);

  return (
    <div>
      <div className="listPageHeader">
        <Header />
      </div>
    </div>
  );
}

export default Covid;
