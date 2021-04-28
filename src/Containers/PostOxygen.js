import React, { useState } from "react";
import "./PostDonor.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import { addOxygen } from "../Action";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import CityData from "../Data/CityData";
import StateData from "../Data/StateData";

const useStyles = makeStyles((theme) => ({}));

function PostOxygen(props) {
  const auth = useSelector((state) => state.auth);
  const [name, setname] = useState("");
  const [contactnumber, setcontactnumber] = useState("");
  const [pricing, setpricing] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [landmark, setlandmark] = useState("");
  const [address, setaddress] = useState("");
  const [note, setnote] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState({
    nameError: "",
    contactnumberError: "",
    pricingError: "",
    cityError: "",
    stateError: "",
    landmarkError: "",
    addressError: "",
    noteError: "",
    mainError: "",
  });

  const dispatch = useDispatch();
  const classes = useStyles();

  const handleStateChange = (event) => {
    setstate(event.target.value);
  };

  const handleCityChange = (event) => {
    setcity(event.target.value);
  };
  const Rqrd = "is required";

  const CheckStateCity = () => {
    return CityData.filter((opt) => opt.state.includes(state));
  };
  const newCity = CheckStateCity();

  const oxygenCreated = (e) => {
    e.preventDefault();

    // const donorform = new FormData();
    // donorform.append("name", name);
    // donorform.append("contactnumber", contactnumber);
    // donorform.append("age", age);
    // donorform.append("gender", gender);
    // donorform.append("bloodgrp", bloodgrp);
    // donorform.append("city", city);
    // donorform.append("state", state);
    // donorform.append("landmark", landmark);
    // donorform.append("address", address);
    // donorform.append("note", note);

    const oxygenForm = {
      name,
      contactnumber,
      pricing,
      city,
      state,
      landmark,
      address,
      note,
    };

    if (name === "") {
      setError({ ...Error, nameError: `Name ${Rqrd}` });
    } else if (contactnumber === "") {
      setError({ ...Error, contactnumberError: `Contact Number ${Rqrd}` });
    } else if (pricing === "") {
      setError({ ...Error, pricingError: `Pricing ${Rqrd}` });
    } else if (city === "") {
      setError({ ...Error, cityError: `City ${Rqrd}` });
    } else if (state === "") {
      setError({ ...Error, stateError: `State ${Rqrd}` });
    } else if (landmark === "") {
      setError({
        ...Error,
        landmarkError: `Enter Nearby Famous Places`,
      });
    } else if (address === "") {
      setError({ ...Error, addressError: `Address ${Rqrd}` });
    } else if (note === "") {
      setError({ ...Error, noteError: `Your Description ${Rqrd}` });
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        dispatch(addOxygen(oxygenForm))
          .then((res) => console.log(res))
          .catch((error) => console.log(error));
        props.history.push(`/`);
        setname("");
        setcontactnumber("");
        setpricing("");
        setcity("");
        setstate("");
        setlandmark("");
        setaddress("");
        setnote("");
      }, 2000);
    }
  };

  return (
    <div className="mainDonorForm">
      <div className="PostDonorForm">
        <h1 style={{ textAlign: "center", marginBottom: ".5em" }}>
          Oxygen Cynlinder
        </h1>
        <TextField
          label="Name"
          id="outlined-margin-dense"
          placeholder="Enter Name"
          // helperText="Some important text"
          margin="dense"
          variant="outlined"
          value={name}
          error={Error.nameError ? true : false}
          onChange={(e) => setname(e.target.value)}
        />
        <TextField
          label="Contact Number"
          id="outlined-margin-dense"
          placeholder="Your Contact Number"
          className={classes.textField}
          // helperText="Some important text"
          margin="dense"
          variant="outlined"
          value={contactnumber}
          error={Error.contactnumberError ? true : false}
          onChange={(e) => setcontactnumber(e.target.value)}
          type="number"
          maxLength="10"
        />
        <TextField
          label="Pricing"
          id="outlined-margin-dense"
          placeholder="Enter Pricing"
          className={classes.textField}
          // helperText="Some important text"
          margin="dense"
          variant="outlined"
          value={pricing}
          error={Error.pricingError ? true : false}
          onChange={(e) => setpricing(e.target.value)}
          type="number"
          maxLength="5"
        />
        <FormControl
          variant="outlined"
          error={Error.stateError ? true : false}
          className={classes.formControl}
          style={{ marginTop: ".5em" }}
        >
          <InputLabel htmlFor="outlined-age-native-simple">State</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={state}
            onChange={handleStateChange}
            label="State"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {StateData.map((option, i) => (
              <MenuItem key={i} value={option.Name}>
                {option.Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          variant="outlined"
          error={Error.cityError ? true : false}
          className={classes.formControl}
          style={{ marginTop: ".5em" }}
        >
          <InputLabel htmlFor="outlined-age-native-simple">City</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={city}
            onChange={handleCityChange}
            label="City"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {newCity.map((option, i) => (
              <MenuItem key={i} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* <TextField
            label="City"
            id="outlined-margin-dense"
            placeholder="City"
            className={classes.textField}
            // helperText="Some important text"
            margin="dense"
            variant="outlined"
            value={city}
            onChange={(e) => setcity(e.target.value)}
            error={Error.cityError ? true : false}
          /> */}
        <TextField
          label="LandMark"
          id="outlined-margin-dense"
          placeholder="Nearby Famous Place..."
          className={classes.textField}
          // helperText="Some important text"
          margin="dense"
          variant="outlined"
          value={landmark}
          onChange={(e) => setlandmark(e.target.value)}
          error={Error.landmarkError ? true : false}
        />{" "}
        <TextField
          label="Address"
          id="outlined-margin-dense"
          placeholder="Detail Your Address"
          className={classes.textField}
          // helperText="Some important text"
          margin="dense"
          variant="outlined"
          value={address}
          onChange={(e) => setaddress(e.target.value)}
          error={Error.addressError ? true : false}
        />{" "}
        <TextField
          label="Note"
          id="outlined-margin-dense"
          placeholder="Note"
          className={classes.textField}
          helperText="Add some comments here, How would you like to contact customer or Would you like to give on rent?"
          margin="dense"
          variant="outlined"
          multiline
          rows={5}
          value={note}
          onChange={(e) => setnote(e.target.value)}
          error={Error.noteError ? true : false}
          inputProps={{ maxLength: 50 }}
        />
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={oxygenCreated}
          style={{ marginTop: "1em", marginBottom: "1em" }}
        >
          {Loading ? (
            <CircularProgress
              color="secondary"
              style={{ marginRight: "1em", color: "white" }}
              size={20}
            />
          ) : null}
          Post Oxygen Cynlinder
        </Button>
      </div>
    </div>
  );
}

export default PostOxygen;
