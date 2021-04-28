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
import { addDonorProfile } from "../Action";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import CityData from "../Data/CityData";
import StateData from "../Data/StateData";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: "flex",
  //   flexWrap: "wrap",
  // },
  // textField: {
  //   marginLeft: theme.spacing(1),
  //   marginRight: theme.spacing(1),
  //   width: "4ch",
  // },
}));

function PostDonor(props) {
  const auth = useSelector((state) => state.auth);
  const category = useSelector((state) => state.category);
  const [name, setname] = useState("");
  const [contactnumber, setcontactnumber] = useState("");
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");
  const [bloodgrp, setbloodgrp] = useState([]);
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [landmark, setlandmark] = useState("");
  const [address, setaddress] = useState("");
  const [note, setnote] = useState("");
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
    mainError: "",
  });
  const handleGenderChange = (event) => {
    setgender(event.target.value);
  };

  const handleBloodChange = (event) => {
    setbloodgrp([...bloodgrp, event.target.value]);
  };

  const handleChange = (event) => {
    let newArray = [...bloodgrp, event.target.name];
    if (bloodgrp.includes(event.target.name)) {
      newArray = newArray.filter((bld) => bld !== event.target.name);
    }
    setbloodgrp(newArray);
  };
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getBloods());
  }, []);

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

  const donorCreated = (e) => {
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

    const donorform = {
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
    };

    if (name === "") {
      setError({ ...Error, nameError: `Name ${Rqrd}` });
    } else if (contactnumber === "") {
      setError({ ...Error, contactnumberError: `Contact Number ${Rqrd}` });
    } else if (age === "" && auth.user.role !== "donororganizaton") {
      setError({ ...Error, ageError: `Age ${Rqrd}` });
    } else if (gender === "" && auth.user.role !== "donororganizaton") {
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
    } else if (note === "") {
      setError({ ...Error, noteError: `Your Description ${Rqrd}` });
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        dispatch(addDonorProfile(donorform))
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
      }, 2000);
    }
  };

  return (
    <div className="mainDonorForm">
      <div className="PostDonorForm">
        <h1 style={{ textAlign: "center", marginBottom: ".5em" }}>
          Donate Plasma
        </h1>
        <TextField
          label="Name"
          id="outlined-margin-dense"
          placeholder="Enter Name"
          // className={classes.textField}
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
        {auth.user.role === "donororganizaton" ? null : (
          <>
            <TextField
              label="Age"
              id="outlined-margin-dense"
              placeholder="Age"
              className={classes.textField}
              // helperText="Some important text"
              error={Error.ageError ? true : false}
              margin="dense"
              variant="outlined"
              value={age}
              type="number"
              onChange={(e) => setage(e.target.value)}
            />
            <div>
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
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </>
        )}
        {auth.user.role === "donororganizaton" ? (
          <>
            <FormLabel component="legend" style={{ marginTop: ".5em" }}>
              Choose Blood Groups
            </FormLabel>
            {category.blood.map((option) => (
              <FormControlLabel
                key={option._id}
                control={
                  <GreenCheckbox
                    onChange={handleChange}
                    name={option._id}
                    value={option.name}
                  />
                }
                label={option.name}
              />
            ))}
          </>
        ) : (
          <div className="bloodOpt">
            <FormControl
              component="fieldset"
              className={classes.formControl}
              error={Error.bloodgrpError ? true : false}
              variant="outlined"
            >
              <TextField
                id="standard-select-bloodgrp"
                select
                label="Blood Group"
                value={bloodgrp}
                onChange={handleBloodChange}
                variant="outlined"
                helperText="Select Your Blood Group"
              >
                {category.blood.map((option) => (
                  <MenuItem key={option._id} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </div>
        )}
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
          helperText="Did you have any disease like diabetes or blood pressure or Did you get infected with covid in past few weeks?"
          margin="dense"
          variant="outlined"
          multiline
          rows={4}
          value={note}
          onChange={(e) => setnote(e.target.value)}
          error={Error.noteError ? true : false}
          inputProps={{ maxLength: 25 }}
        />
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={donorCreated}
          style={{ marginTop: "1em", marginBottom: "1em" }}
        >
          {Loading ? (
            <CircularProgress
              color="secondary"
              style={{ marginRight: "1em", color: "white" }}
              size={20}
            />
          ) : null}
          Post Donor Profile
        </Button>
      </div>
    </div>
  );
}

export default PostDonor;
