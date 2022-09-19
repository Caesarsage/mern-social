import {
  Container,
  Divider,
  Grid,
  Paper,
  CircularProgress,
  Typography,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import FileBase from "react-file-base64";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { followUser, getUser } from "../../actions/profile";
import Post from "../Posts/Post/Post";

import useStyles from "./styles";

import igr from "../../images/memories.jpg";
import Edit from "@material-ui/icons/Edit";
export default function Profile() {
  const { id } = useParams();

  const { user, isLoading } = useSelector((state) => state.user);
  const [loggedin, setLoggedin] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const [isFollow, setIsFollow] = useState();
  const [currentId, setCurrentId] = useState(id);

  const dispatch = useDispatch();
  const classes = useStyles();

  const following = async () => {
    if (user?.followers?.length > 0) {
      user?.followers?.find((id) => {
        setIsFollow(id === loggedin?.result?.id);
      });
    }
  };

  useEffect(() => {
    dispatch(getUser(id));
    following();
  }, []);

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
        (follow) => follow === loggedin?.result?.id
      ) ? (
        <>
          {user.followers.length > 2 ? (
            <>
              <strong>You and {user.followers.length - 1}</strong> Followers
            </>
          ) : (
            <strong>
              {user.followers.length} ${user.followers.length > 1 ? "s" : ""}
            </strong>
          )}
        </>
      ) : (
        <>
          <strong>{user.followers.length}</strong>
          {user.followers.length === 1 ? " Follower" : " Followers"}
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

  return (
    <>
      <Container>
        {loggedin?.result?.id !== user?._id && (
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => {
              // dispatch(followUser(user?._id));
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
                src={user?.imageUrl || igr}
                alt="profile pic"
              />
              <div className={classes.editImage}>
                <Edit color="white" />
                <span className={classes.imgIcon}>
                  <FileBase
                    type="file"
                    multiple={false}
                    // onDone={({ base64 }) =>
                    //   // setPostData({ ...postData, selectedFile: base64 }
                    //   )}
                  />
                </span>
              </div>
            </div>
            {loggedin?.result.id !== user?._id && (
              <Button
                size="small"
                color="primary"
                variant="contained"
                style={{ marginBottom: "3px", display: "flex" }}
                onClick={() => {
                  following();
                  dispatch(followUser(user?._id));
                  // following()
                }}
                disabled={!loggedin}
              >
                {/* <Following /> */}
                {isFollow ? "UnFollow" : "UnFollow"}
              </Button>
            )}
            <Divider />
          </div>

          {user?.socials && (
            <div className={classes.socials}>
              {!user?.socials?.linkedin && (
                <a
                  className={classes.socialsItem}
                  href={user?.socials?.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  Linkedin
                </a>
              )}
              {!user?.socials?.twitter && (
                <a
                  className={classes.socialsItem}
                  href={user?.socials?.twitter}
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitter
                </a>
              )}
              {!user?.socials?.github && (
                <a
                  className={classes.socialsItem}
                  href={user?.socials?.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
              )}
              {!user?.socials?.website && (
                <a
                  className={classes.socialsItem}
                  href={user?.socials?.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  website
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

              <Typography gutterBottom variant="p" component="body1">
                <div>
                  <strong>About Me:</strong>
                </div>
                {"software OG"}
              </Typography>
              <Typography gutterBottom variant="body1" component="h6">
                {user?.gender} Male
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
                {loggedin ? "YOUR " : `${user?.name} PUBLIC `} MEMORIES{" "}
              </strong>
            </Typography>
            <Grid
              className={classes.mainContainer}
              container
              alignItem="stretch"
              spacing={3}
            >
              {!user?.isPrivate &&
                !loggedin &&
                user.memories.map((u) => (
                  <Grid key={u._id} item xs={12} sm={12} md={6} lg={3}>
                    <Post post={u} setCurrentId={setCurrentId} />
                  </Grid>
                ))}

              {user?.memories &&
                loggedin &&
                user.memories.map((u) => (
                  <Grid key={u._id} item xs={12} sm={12} md={6} lg={3}>
                    <Post post={u} setCurrentId={setCurrentId} />
                  </Grid>
                ))}
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
