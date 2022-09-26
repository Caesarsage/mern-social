import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import PeopleIcon from "@material-ui/icons/People";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";
import FeedbackIcon from "@material-ui/icons/Feedback";

import { useStyles } from "./styles";
import { Avatar, Fade, Menu, MenuItem } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import decode from "jwt-decode";

export default function MiniDrawer() {
  const classes = useStyles();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const openProfile = Boolean(anchorEl);

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
      setAnchorEl(null);
      handleDrawerClose()
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.clear();
    setUser(null);
    history.push("/");
    handleDrawerClose()
    window.location.reload()
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fix"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <header>
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
                  <Typography
                    variant="h6"
                    component="h6"
                    style={{ color: "white" }}
                  >
                    MemCAM
                  </Typography>
                </div>
              </div>
            </header>
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {user && (
            <ListItem button>
              <ListItemIcon>
                <Avatar
                  sizes="small"
                  id="fade-button"
                  aria-controls={openProfile ? "fade-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openProfile ? "true" : undefined}
                  onClick={handleClick}
                  alt={user.result.name}
                  src={user.result.imageUrl}
                >
                  {user.result.name[0].toUpperCase()}
                </Avatar>
                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    "aria-labelledby": "fade-button",
                  }}
                  anchorEl={anchorEl}
                  open={openProfile}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <br /> <br />
                  <MenuItem onClick={handleProfile}>My Account</MenuItem>
                  <Divider />
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
              </ListItemIcon>
              <ListItemText
                primary={`welcome ${user.result.name.split(" ")[0]}`}
              />
            </ListItem>
          )}
          <ListItem
            button
            onClick={() => {
              history.push("/");
              handleDrawerClose();
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              history.push("/posts");
              handleDrawerClose();
            }}
          >
            <ListItemIcon>
              <ExploreIcon />
            </ListItemIcon>
            <ListItemText primary={"Explore"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={"About"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FeedbackIcon />
            </ListItemIcon>
            <ListItemText primary={"Testimonies"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {user ? (
            <ListItem button onClick={logout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout"></ListItemText>
            </ListItem>
          ) : (
            <ListItem
              button
              onClick={() => {
                history.push("/auth");
                handleDrawerClose();
              }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Get Started"></ListItemText>
            </ListItem>
          )}
          <ListItem button>
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
            <ListItemText primary={"Contact"} />
          </ListItem>
        </List>
      </Drawer>   
    </div>
  );
}
