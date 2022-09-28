import {
  Container,
  Divider,
  Grid,
  Paper,
  CircularProgress,
  Typography,
  Button,
  Tooltip,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import LanguageIcon from "@material-ui/icons/Language";
import GitHubIcon from "@material-ui/icons/GitHub";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { followUser, getUser, updateUser } from "../../actions/profile";
import Post from "../Posts/Post/Post";

import useStyles from "./styles";

import Edit from "@material-ui/icons/Edit";
import { Alert } from "@material-ui/lab";

export default function Profile() {
  const { id } = useParams();
  const { user, isLoading, error } = useSelector((state) => state.user);

  const [loggedin, setLoggedin] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getUser(id));
  }, []);




  const handleImageUpload = (e) => {
    dispatch(updateUser(user?._id, { imageUrl: e.base64 }));    
    // window.location.reload();
  };

   console.log(user);

  if (!user) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  // follow
  const Follow = () => {
    if (user?.followers?.length > 0) {
      // check if curr follow or not
      return user.followers.find(
        (follow) =>
          follow._id === user?.result?.googleId || loggedin?.result?.id
      ) ? (
        <>
          {user.followers.length > 2 ? (
            <>
              <strong>You and {user.followers.length - 1}</strong> Followers
            </>
          ) : (
            <strong>
              {user.followers.length} Follower{" "}
              {user.followers.length > 1 ? "s" : ""}
            </strong>
          )}
        </>
      ) : (
        <>
          <strong>{user?.followers?.length}</strong>
          {user?.followers?.length === 1 ? " Follower" : " Followers"}
        </>
      );
    }

    return (
      <>
        <strong>{user?.followers?.length}</strong>
        {" Follower"}
      </>
    );
  };

  // follow toggle
  const FollowToggle = () => {
    // check if curr follow or not
    return user?.followers?.find(
      (follow) => follow._id === loggedin?.result?.id
    ) ? (
      <>UnFollow</>
    ) : (
      <>Follow</>
    );
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Container>
        {loggedin?.result?.id === user?._id && (
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => {
              history.push(`/user/profile/${user._id}/edit`);
            }}
          >
            Edit
          </Button>
        )}
        <div className={classes.mainSection}>
          <div>
            <div style={{ position: "relative" }}>
              <img
                className={classes.image}
                src={user?.imageUrl}
                alt="profile pic"
              />
              {loggedin?.result.id === user?._id && (
                <Tooltip title="upload image">
                  <div className={classes.editImage}>
                    <Edit />
                    <span className={classes.imgIcon}>
                      <FileBase
                        type="file"
                        required
                        multiple={false}
                        onDone={handleImageUpload}
                      />
                    </span>
                  </div>
                </Tooltip>
              )}
            </div>
            {loggedin?.result.id !== user?._id && (
              <Button
                size="small"
                color="primary"
                variant="contained"
                style={{
                  marginBottom: "1em",
                  display: "flex",
                  fontSize: "xx-small",
                }}
                onClick={() => {
                  dispatch(followUser(user?._id));
                }}
                disabled={!loggedin}
              >
                <FollowToggle />
              </Button>
            )}
            <Divider />
          </div>

          {user?.socials && (
            <div className={classes.socials}>
              {user?.socials?.linkedin && (
                <a
                  className={classes.socialsItem}
                  href={user?.socials?.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedInIcon />
                </a>
              )}
              {user?.socials?.twitter && (
                <a
                  className={classes.socialsItem}
                  href={user?.socials?.twitter}
                  target="_blank"
                  rel="noreferrer"
                >
                  <TwitterIcon />
                </a>
              )}
              {user?.socials?.github && (
                <a
                  className={classes.socialsItem}
                  href={user?.socials?.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitHubIcon />
                </a>
              )}
              {user?.socials?.website && (
                <a
                  className={classes.socialsItem}
                  href={user?.socials?.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  <LanguageIcon />
                </a>
              )}
            </div>
          )}

          <div style={{ fontSize: "13px" }}>
            <Follow /> | <strong> {user?.following?.length} </strong> Following
          </div>
        </div>
        <div className={classes.details}>
          <Divider />
          {loggedin ? (
            <>
              <Typography gutterBottom variant="h4" component="h4">
                {user?.name}
              </Typography>

              <Typography gutterBottom variant="body1" component="body1">
                <div>
                  <strong>About</strong>
                </div>
                {user.about}
              </Typography>
              <Typography gutterBottom variant="body1" component="h6">
                {user?.gender}
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                Email: {user?.email}
              </Typography>
            </>
          ) : (
            ""
          )}
        </div>
        <Divider />
        {user?.memories?.length > 0 ? (
          <div className={classes.section}>
            <Typography variant="h6" gutterBottom component="h6" align="center">
              <strong>
                {loggedin?.result.id === user?._id
                  ? "YOUR "
                  : `${user?.name} PUBLIC `}
                MEMORIES
              </strong>
            </Typography>
            <Grid
              className={classes.mainContainer}
              container
              alignitem="stretch"
              spacing={3}
            >
              {user?.memories?.map((u) =>
                loggedin?.result?.id === user?._id ? (
                  <Grid key={u._id} item xs={12} sm={12} md={6} lg={3}>
                    <Post post={u} setCurrentId={setCurrentId} />
                  </Grid>
                ) : (
                  u.isPrivate === false && (
                    <Grid key={u._id} item xs={12} sm={12} md={6} lg={3}>
                      <Post post={u} setCurrentId={setCurrentId} />
                    </Grid>
                  )
                )
              )}
            </Grid>
          </div>
        ) : (
          <Typography variant="h6" gutterBottom component="h6" align="center">
            <strong>NO PUBLIC MEMORIES </strong>
          </Typography>
        )}
      </Container>
    </>
  );
}
