import {
  Button,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getPost, getPostsBySearch } from "../../actions/post";

import useStyles from "./styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";


import { Comments } from "./Comments";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
      dispatch(
        getPostsBySearch({
          search: "none",
          tags: post?.data?.tags.join(","),
        })
      );
  }, []);

  if (!post) return null;
  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({_id}) => _id !== post.data._id);

  const openPost = (_id) => {
    history.push(`/posts/${_id}`);
  };
  const back = () => {
    history.push('/posts')
  };

  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">
            {post.data.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.data.tags.map((tag) => `#${tag}`)}
          </Typography>
          <Divider />
          <Typography gutterBottom variant="body1" component="p">
            {post.data.message}
          </Typography>
          <Divider />
          <i variant="body1">Created by: {post.data.name}</i>
          <Typography>{moment(post.data.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: "20px 0" }} />
          <Button>Send Crypto - Appreciate Memory</Button>
          <Divider style={{ margin: "20px 0" }} />
          <Typography variant="body1">
            <Comments post={post} />
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
        </div>
        <div className={classes.imageSection}>
          <Button size="small" color="primary" onClick={back}>
            <ArrowBackIosIcon size="small" /> Back
          </Button>
          <img
            className={classes.media}
            src={post.data.selectedFile}
            alt={post.data.title}
          />
        </div>
      </div>

      {/* RECOMMENDED POSTS */}
      {recommendedPosts?.length ? (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">
            You may also like :
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, message, name, likes, selectedFile, _id }) => {
                return (
                  <div
                    style={{ margin: "20px", cursor: "pointer" }}
                    onClick={() => openPost(_id)}
                    key={_id}
                  >
                    <Typography gutterButtom variant="h6">
                      {title}
                    </Typography>
                    <Typography gutterButtom variant="subtitle2">
                      {name}
                    </Typography>
                    <Typography gutterButtom variant="subtitle2">
                      {message}
                    </Typography>
                    <Typography gutterButtom variant="subtitle1">
                      Likes: {likes.length}
                    </Typography>
                    <img src={selectedFile} width="200px" alt="" />
                  </div>
                );
              }
            )}
          </div> 
        </div> 
      ): ' '}
    </Paper>
  );
};

export default PostDetails;
