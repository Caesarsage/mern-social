import React, { useEffect, useState, MouseEvent } from "react";
import {
  AppBar,
  Avatar,
  Button,
  Divider,
  Fade,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";

import memories from "../../images/memories.jpg";

import useStyles from "./styles";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import decode from "jwt-decode";
import { getUser } from "../../actions/profile.js";
import MoreHoriz from "@material-ui/icons/MoreHoriz";

export const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    if (user) {
      const id = user.result.id;
      history.push(`/user/profile/${id}`);
      setAnchorEl(null)
    }    
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
    setUser(null);
    history.push("/");
  };

  useEffect(() => {
    const token = user?.token;

    // JWT Expiry
    if (token) {
      const tokenDecoded = decode(token);
      if (tokenDecoded.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <header className={ `${classes.brandContainer} site-header`}>
        <div className="header-shape header-shape-2">
          <svg
            width="128"
            height="128"
            viewBox="0 0 128 128"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: "hidden" }}
          >
            <defs>
              <linearGradient
                x1="93.05%"
                y1="19.767%"
                x2="15.034%"
                y2="85.765%"
                id="header-shape-2"
              >
                <stop stopColor="#FF3058" offset="0%" />
                <stop stopColor="#FF6381" offset="100%" />
              </linearGradient>
            </defs>
            <circle
              cx="64"
              cy="64"
              r="64"
              fill="url(#header-shape-2)"
              fillRule="evenodd"
            />
          </svg>
        </div>
        <div className="container">
          <div className="site-header-inner">
            <div className="brand header-brand">
              <h1 className="m-0">
                <a href="/">
                  <svg
                    width="32"
                    height="32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>MemCAM</title>
                    <defs>
                      <linearGradient
                        x1="114.674%"
                        y1="39.507%"
                        x2="-52.998%"
                        y2="39.507%"
                        id="logo-a"
                      >
                        <stop stopColor="#8D92FA" offset="0%" />
                        <stop
                          stopColor="#8D92FA"
                          stopOpacity="0"
                          offset="100%"
                        />
                      </linearGradient>
                      <linearGradient
                        x1="93.05%"
                        y1="19.767%"
                        x2="15.034%"
                        y2="85.765%"
                        id="logo-b"
                      >
                        <stop stopColor="#FF3058" offset="0%" />
                        <stop stopColor="#FF6381" offset="100%" />
                      </linearGradient>
                      <linearGradient
                        x1="32.716%"
                        y1="-20.176%"
                        x2="32.716%"
                        y2="148.747%"
                        id="logo-c"
                      >
                        <stop stopColor="#FF97AA" offset="0%" />
                        <stop
                          stopColor="#FF97AA"
                          stopOpacity="0"
                          offset="100%"
                        />
                      </linearGradient>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                      <path
                        d="M31.12 7.482C28.327 19.146 19.147 28.326 7.483 31.121A12.04 12.04 0 0 1 .88 24.518C3.674 12.854 12.854 3.674 24.518.879a12.04 12.04 0 0 1 6.603 6.603z"
                        fill="#312ECA"
                      />
                      <path
                        d="M28.874 3.922l-24.91 24.99a12.026 12.026 0 0 1-3.085-4.394C3.674 12.854 12.854 3.674 24.518.879a12.025 12.025 0 0 1 4.356 3.043z"
                        fill="url(#logo-a)"
                      />
                      <g opacity=".88">
                        <path
                          d="M31.12 24.518a12.04 12.04 0 0 1-6.602 6.603C12.854 28.326 3.674 19.146.879 7.482A12.04 12.04 0 0 1 7.482.88c11.664 2.795 20.844 11.975 23.639 23.639z"
                          fill="url(#logo-b)"
                        />
                        <path
                          d="M24.518 31.12C12.854 28.327 3.674 19.147.879 7.483A12.015 12.015 0 0 1 3.46 3.57L28.47 28.5a12.016 12.016 0 0 1-3.951 2.62z"
                          fill="url(#logo-c)"
                        />
                      </g>
                    </g>
                  </svg>
                </a>
              </h1>
            </div>
          </div>
        </div>
      </header>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <div>
              <Avatar
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                alt={user.result.name}
                src={user.result.imageUrl}
                style={{ cursor: "pointer" }}
              >
                {user.result.name[0].toUpperCase()}
              </Avatar>
              <Menu
                id="fade-menu"
                MenuListProps={{
                  "aria-labelledby": "fade-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                <br /> <br />
                <MenuItem onClick={handleProfile}>My Account</MenuItem>
                <Divider />
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
            <Typography className={classes.userName} variant="h6">
              welcome {user.result.name.split(" ")[0]}
            </Typography>
          </div>
        ) : (
          <Button variant="contained" color="primary">
            <Link style={{ color: "white", textDecoration: "none" }} to="/auth">
              Get Started
            </Link>
          </Button>
        )}
        <Button
          onClick={() => {
            history.push("/posts");
          }}
          variant="contained"
          color="primary"
        >
          Explore
        </Button>
      </Toolbar>
    </AppBar>
  );
};
