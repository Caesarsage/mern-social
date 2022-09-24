import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { GoogleLogin } from "react-google-login";

import useStyles from "./styles";
import { Input } from "../shared/Input";

import Icon from "./icon";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login, register } from "../../actions/auth";
import { Alert } from "@material-ui/lab";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  gender: "",
  about: "",
  password: "",
  confirmPassword: "",
};

export const Auth = () => {
  const { error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const switchMode = () => {
    setIsSignup((prev) => !prev);
    setShowPassword(false);
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(register(formData, history));
      
    } else {
      dispatch(login(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      history.push("/");
    } catch (error) {
      dispatch({ type: "ERROR", error: error.response.data.message });
    }
  };

  const googleFailure = () => {
    dispatch({ type: "ERROR", error: "ERROR SIGNING INTO GOOGLE" });
  };

  return (
    <Container raised elevation={6}>
      {error && (
        <Alert severity="error" onClose={() => {}}>
          {error}
        </Alert>
      )}
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign up" : "Sign in"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  required
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  required
                  half
                />
                <TextField 
                  fullWidth
                  rows={4}
                  variant="outlined"
                  multiline
                  name="about"
                  label="Profile"
                  handleChange={handleChange}
                  type="text"
                  autoFocus
                  required
                />
                <div style={{ display: "block", paddingLeft: "1em" }}>
                  <FormLabel id="gender">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="female"
                    />
                  </RadioGroup>
                </div>
              </>
            )}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
              autoFocus
              required
            />

            <Input
              name="password"
              label="password"
              required
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                required
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign up" : "Sign in"}
          </Button>

          <GoogleLogin
            clientId={process.env.clientId}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign in
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="center">
            <Grid item>
              <Button onClick={switchMode} size="small">
                {isSignup ? (
                  <>
                    Already have an account ?<strong>Sign in</strong>
                  </>
                ) : (
                  <>
                    Do'nt have an account ? <strong> Sign up </strong>{" "}
                  </>
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
