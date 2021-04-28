import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { isuserLoggedIn, login } from "../Action/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, FormControlLabel } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Error, setError] = useState({ emailError: "", passwordError: "" });
  const [Greeting, setGreeting] = useState({ Fail: "", Success: "" });
  const [ShowPass, setShowPass] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(isuserLoggedIn());
    }
  }, []);

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    if (email === "") {
      setError({ ...Error, emailError: "Enter Your Registered Email" });
    } else if (password === "") {
      setError({ ...Error, passwordError: "Enter Your Registered Passowrd" });
    } else {
      dispatch(login(user))
        .then((res) =>
          setGreeting({ ...Greeting, Success: "Logged In Sucessfully" })
        )
        .catch((error) =>
          setGreeting({
            ...Greeting,
            Fail: error.response.data.message,
          })
        );
    }
  };

  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  return (
    <div className="main_login_page">
      <form>
        <div className="registerField">
          <h1 style={{ textAlign: "center", marginBottom: ".5em" }}>
            Welcome Back
          </h1>
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
            type={ShowPass ? "text" : "password"}
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
                onClick={() => setShowPass(!ShowPass)}
              />
            }
            label="Show Password"
          />

          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={userLogin}
          >
            Login
          </Button>
          <span style={{ marginTop: ".5em" }}>
            New User?{" "}
            <a style={{ color: "blue" }} href="/register">
              Create Account
            </a>
          </span>
        </div>
      </form>
    </div>
  );
}
