import React from "react";
import Post from "./Post/Post";

import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import useStyles from "./styles.js";

export const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) return "No Memory";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignitem="stretch"
      spacing={3}
    >
      {posts.map(
        (post) =>
          post.isPrivate === false && (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          )
      )}
    </Grid>
  );
};
