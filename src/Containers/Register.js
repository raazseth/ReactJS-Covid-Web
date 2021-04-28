import React, { useState } from "react";
import "./Register.css";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import { signup } from "../Action/userActions";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

function Register(props) {
  const auth = useSelector((state) => state.auth);
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("");
  const [visiblePass, setvisiblePass] = useState(false);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [Greeting, setGreeting] = useState({ Fail: "", Success: "" });
  const [Error, setError] = useState({
    emailError: "",
    nameError: "",
    passwordError: "",
    roleError: "",
  });

  const handleChange = (event) => {
    setrole(event.target.value);
  };

  const registerNow = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
      role,
    };

    if (role === "") {
      setError({ ...Error, roleError: "Role is required" });
    } else if (email === "") {
      setError({ ...Error, emailError: "Email is required" });
    } else if (name === "") {
      setError({ ...Error, nameError: "Name is required" });
    } else if (password === "") {
      setError({ ...Error, passwordError: "Password is required" });
    } else if (password.length < 6) {
      setError({
        ...Error,
        passwordLengthError: "Password must be longer than 6 characters",
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        dispatch(signup(user))
          .then((res) =>
            setGreeting({ ...Greeting, Success: "Logged In Sucessfully" })
          )
          .catch((error) =>
            setGreeting({
              ...Greeting,
              Fail: error.response.data.message,
            })
          );
        setLoading(false);
      }, 1000);
    }
  };

  const CheckingUser = () => {
    if (auth.authenticate && role === "donor") {
      props.history.push("/postasdonor");
    } else if (auth.authenticate && role === "patient") {
      props.history.push("/postaspatient");
    } else if (auth.authenticate && role === "donororganizaton") {
      props.history.push("/postasdonor");
    } else if (auth.authenticate) {
      props.history.push("/");
    }
  };
  CheckingUser();
  console.log(role);
  return (
    <div>
      <form noValidate autoComplete="off" className="regForm">
        <h1 style={{ textAlign: "center", marginBottom: ".5em" }}>
          Create Account
        </h1>
        <div className="registerField">
          <FormControl
            variant="outlined"
            error={Error.roleError ? true : false}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Role Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={role}
              onChange={handleChange}
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"patient"}>I am Looking for Plasma</MenuItem>
              <MenuItem value={"donor"}>I want to donate Plasma</MenuItem>
              <MenuItem value={"donororganizaton"}>
                We are Organizaton & We want to list as blood bank
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="outlined-basic"
            label="Full Name"
            variant="outlined"
            value={name}
            type="text"
            margin="dense"
            error={Error.nameError ? true : false}
            onChange={(e) => setname(e.target.value)}
          />

          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            value={email}
            margin="dense"
            type="email"
            error={Error.emailError ? true : false}
            onChange={(e) => setemail(e.target.value)}
          />

          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={password}
            margin="dense"
            error={Error.nameError ? true : false}
            type={visiblePass ? "text" : "password"}
            onChange={(e) => setpassword(e.target.value)}
          />
          {Greeting.Fail ? (
            <span className="ErrorStyle">{Greeting.Fail}</span>
          ) : null}
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
                onClick={() => setvisiblePass(!visiblePass)}
              />
            }
            label="Show Password"
          />
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={registerNow}
          >
            Register
          </Button>
          <span style={{ marginTop: ".5em" }}>
            Already A User?{" "}
            <a style={{ color: "blue" }} href="/login">
              Login Now
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Register;
