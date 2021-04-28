import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Action";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import "./Header.css";
import { AiOutlineMenu } from "react-icons/ai";
function Header() {
  const auth = useSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <div className="mainHeader">
      <div>
        <h3 className="headerLogo">
          <a href="/">Covid Service</a>
        </h3>
      </div>
      <div className="hdrRight">
        {auth.authenticate ? (
          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              style={{ color: "white", fontSize: "18px" }}
            >
              <AiOutlineMenu className="menuIcon" /> Menu
            </Button>
            <Menu
              id="simple-menuBtm"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>
                <a href={"/covid"}>Covid</a>
              </MenuItem>
              <MenuItem>
                <a href={"/requests"}>Requests</a>
              </MenuItem>
              <MenuItem>
                <a href="/donors">Donors</a>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logoutUser();
                  handleClose();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <Link to={"/login"}>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              style={{ color: "white", fontSize: "18px" }}
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
