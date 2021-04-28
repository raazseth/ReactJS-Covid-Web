import React, { useEffect, useState } from "react";
import "./PostDonor.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { useDispatch, useSelector } from "react-redux";
import { getBloods } from "../Action/categoryAction";
import {
  Button,
  CircularProgress,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import { addPatientDonorProfile } from "../Action";
import CityData from "../Data/CityData";
import StateData from "../Data/StateData";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: "flex",
  //   flexWrap: "wrap",
  // },
  // textField: {
  //   marginLeft: theme.spacing(1),
  //   marginRight: theme.spacing(1),
  //   width: "45ch",
  // },
}));

function PatientDonor(props) {
  const category = useSelector((state) => state.category);
  const [name, setname] = useState("");
  const [contactnumber, setcontactnumber] = useState("");
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");
  const [bloodgrp, setbloodgrp] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [landmark, setlandmark] = useState("");
  const [address, setaddress] = useState("");
  const [note, setnote] = useState("");
  const [hospital, sethospital] = useState("");
  const [disease, setdisease] = useState("");
  const [casesheet, setcasesheet] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Error, setError] = useState({
    nameError: "",
    contactnumberError: "",
    ageError: "",
    genderError: "",
    bloodgrpError: "",
    cityError: "",
    stateError: "",
    landmarkError: "",
    addressError: "",
    noteError: "",
    hospitalError: "",
    diseaseError: "",
    casesheetError: "",
    mainError: "",
  });
  const handleStateChange = (event) => {
    setstate(event.target.value);
  };
  const handleGenderChange = (event) => {
    setgender(event.target.value);
  };

  const handleCaseSheetChange = (event) => {
    setcasesheet(event.target.value);
  };

  const handleBloodChange = (event) => {
    setbloodgrp(event.target.value);
  };

  const CheckStateCity = () => {
    return CityData.filter((opt) => opt.state.includes(state));
  };
  const newCity = CheckStateCity();

  const handleCityChange = (event) => {
    setcity(event.target.value);
  };
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getBloods());
  }, []);
  const Rqrd = "is required";

  const donorPatientCreated = (e) => {
    e.preventDefault();

    const patientform = {
      name,
      contactnumber,
      age,
      gender,
      bloodgrp,
      city,
      state,
      landmark,
      address,
      note,
      hospital,
      disease,
      casesheet,
    };

    if (name === "") {
      setError({ ...Error, nameError: `Name ${Rqrd}` });
    } else if (contactnumber === "") {
      setError({ ...Error, contactnumberError: `Contact Number ${Rqrd}` });
    } else if (age === "") {
      setError({ ...Error, ageError: `Age ${Rqrd}` });
    } else if (gender === "") {
      setError({ ...Error, genderError: `Gender ${Rqrd}` });
    } else if (bloodgrp === "") {
      setError({ ...Error, bloodgrpError: `Blood ${Rqrd}` });
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
    } else if (disease === "") {
      setError({ ...Error, disableElevation: `Disease ${Rqrd}` });
    } else if (casesheet === "") {
      setError({ ...Error, casesheetError: `CaseSheet Provided ${Rqrd}` });
    } else if (note === "") {
      setError({ ...Error, noteError: `Your Description ${Rqrd}` });
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        dispatch(addPatientDonorProfile(patientform))
          .then((res) => console.log(res))
          .catch((error) => console.log(error));
        props.history.push(`/`);
        setname("");
        setcontactnumber("");
        setage("");
        setbloodgrp("");
        setgender("");
        setcity("");
        setstate("");
        setlandmark("");
        setaddress("");
        setnote("");
        sethospital("");
        setdisease("");
        setcasesheet("");
      }, 1000);
    }
  };
  return (
    <div className="mainDonorForm">
      <div className="PostDonorForm">
        <h1 style={{ textAlign: "center", marginBottom: ".5em" }}>
          Request For Plasma
        </h1>
        <TextField
          label="Name"
          id="outlined-margin-dense"
          placeholder="Enter Your Name"
          className={classes.textField}
          // helperText="Some important text"
          margin="dense"
          variant="outlined"
          value={name}
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
          onChange={(e) => setcontactnumber(e.target.value)}
        />
        <TextField
          label="Age"
          id="outlined-margin-dense"
          placeholder="Age"
          className={classes.textField}
          // helperText="Some important text"
          margin="dense"
          variant="outlined"
          value={age}
          onChange={(e) => setage(e.target.value)}
        />
        <div className="bloodOpt">
          <FormControl
            component="fieldset"
            error={Error.genderError ? true : false}
          >
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={gender}
              onChange={handleGenderChange}
            >
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="bloodOpt">
          <FormControl
            component="fieldset"
            className={classes.formControl}
            error={Error.bloodgrpError ? true : false}
          >
            <TextField
              id="standard-select-bloodgrp"
              select
              label="Blood Group"
              value={bloodgrp}
              variant="outlined"
              onChange={handleBloodChange}
              helperText="Select Your Blood Group"
            >
              {category.blood.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>{" "}
          </FormControl>
        </div>
        <FormControl
          variant="outlined"
          error={Error.stateError ? true : false}
          className={classes.formControl}
          variant="outlined"
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
          label="Hospital"
          id="outlined-margin-dense"
          placeholder="Enter Your Hospital Name"
          className={classes.textField}
          // helperText="Some important text"
          margin="dense"
          variant="outlined"
          value={hospital}
          onChange={(e) => sethospital(e.target.value)}
          error={Error.hospitalError ? true : false}
        />{" "}
        <TextField
          label="Disease"
          id="outlined-margin-dense"
          placeholder="Enter Your Disease"
          className={classes.textField}
          // helperText="Some important text"
          margin="dense"
          variant="outlined"
          value={disease}
          onChange={(e) => setdisease(e.target.value)}
          error={Error.diseaseError ? true : false}
        />{" "}
        <div className="bloodOpt ">
          <FormControl
            component="fieldset"
            className={classes.formControl}
            error={Error.bloodgrpError ? true : false}
          >
            <FormLabel component="legend">CaseSheet</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={casesheet}
              onChange={handleCaseSheetChange}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </div>
        <TextField
          label="Note"
          id="outlined-margin-dense"
          placeholder="Note"
          className={classes.textField}
          helperText="Did you get infected with covid in past few weeks? Explain your clinical situation "
          margin="dense"
          variant="outlined"
          multiline
          rows={4}
          value={note}
          onChange={(e) => setnote(e.target.value)}
          inputProps={{ maxLength: 25 }}
          error={Error.noteError ? true : false}
        />
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={donorPatientCreated}
          style={{ marginTop: "1em", marginBottom: "1em" }}
        >
          {Loading ? (
            <CircularProgress
              color="secondary"
              style={{ marginRight: "1em", color: "white" }}
              size={20}
            />
          ) : null}
          Post Request
        </Button>
      </div>
    </div>
  );
}

export default PatientDonor;
