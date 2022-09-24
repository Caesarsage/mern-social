import React, { useState } from "react";
import {
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  CircularProgress,
} from "@material-ui/core";

import useStyles from "../../components/Forms/styles";

import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { Input } from "../../components/shared/Input";
import { useEffect } from "react";
import { Alert } from "@material-ui/lab";
import { updateUser } from "../../actions/profile";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";

export const EditProfile = () => {
  const [formData, setFormData] = useState({});
  const { user, isLoading, error } = useSelector((state) => state.user);
  const {id} = useParams()

  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        about: user.about,
        gender: user.gender,
        linkedin: user?.socials?.linkedin,
        twitter: user?.socials?.twitter,
        github: user?.socials?.github,
        website: user?.socials?.website,
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(user?._id, formData));
    history.push(`/user/profile/${id}`)
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Container raised elevation={6}>
      {error && <Alert severity="error">{error}</Alert>}
      <Paper className={classes.paper} elevation={3}>
        <Button
          size="small"
          color="primary"
          component={Link}
          to={`/user/profile/${id}`}
        >
          <ArrowBackIos size="small" /> Back
        </Button>
        <Typography variant="h5">Edit Account</Typography>

        {user && (
          <form className={classes.form} onSubmit={handleSubmit}>
            <Typography>Personal Details</Typography>
            <Grid container spacing={2}>
              <Input
                name="name"
                label="Full Name"
                value={formData.name}
                handleChange={handleChange}
                autoFocus
              />
              <Input
                name="email"
                label="Email"
                handleChange={handleChange}
                type="email"
                value={formData.email}
                autoFocus
              />
              <Input
                name="about"
                label="About"
                multiline
                fullWidth
                handleChange={handleChange}
                type="about"
                value={formData.about}
                autoFocus
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
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
              </div>
            </Grid>
            <Typography>Socials Details</Typography>
            <Grid container spacing={2}>
              <Input
                name="twitter"
                label="Enter Twitter URL"
                handleChange={handleChange}
                type="text"
                autoFocus
                value={formData.twitter}
              />
              <Input
                name="github"
                label="Enter Github URL"
                handleChange={handleChange}
                type="text"
                autoFocus
                value={formData.github}
              />
              <Input
                name="linkedin"
                label="Enter Linkedin URL"
                handleChange={handleChange}
                type="text"
                autoFocus
                value={formData.linkedin}
              />
              <Input
                name="website"
                label="Enter Website URL"
                handleChange={handleChange}
                type="text"
                autoFocus
                value={formData.website}
              />
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        )}
      </Paper>
    </Container>
  );
};
