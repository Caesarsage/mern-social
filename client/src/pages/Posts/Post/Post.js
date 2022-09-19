import React, { useState } from "react";

import useStyles from "./style";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
  Chip,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/post";
import { useHistory } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };

  const handleProfile = () => {
    if (post) {
      const id = post.creator;
      history.push(`/user/profile/${id}`);
    }
  };

  // likes
  const Likes = () => {
    if (post?.likes?.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?.id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} ${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length}
          {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />

      <div className={classes.overlay}>
        <Typography
          variant="h6"
          onClick={handleProfile}
          style={{ cursor: "pointer" }}
        >
          {post.name}
        </Typography>
        <Chip label={post.isPrivate ? "Private" : "Public"} size='small' />   
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
             
      </div>
      <div className={classes.overlay2}>
        {user?.result.googleId === post ||
          (user?.result?.id === post?.creator && (
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => {
                history.push(`/post/${post._id}/edit`);
              }}
            >
              <EditIcon fontSize="medium" />
            </Button>
          ))}
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography variant="h5" className={classes.title}>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message.slice(0, 50)}{" "}
          {post.message.length > 50 && (
            <ButtonBase className={classes.cardActions} onClick={openPost}>
              <MoreHorizIcon />
            </ButtonBase>
          )}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={openPost}>
          Read <ArrowForwardIosIcon />
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => {
            dispatch(likePost(post._id));
          }}
          disabled={!user?.result}
        >
          <Likes />
        </Button>
        {user?.result.googleId === post ||
          (user?.result?.id === post?.creator && (
            <Button
              size="small"
              color="primary"
              onClick={() => {
                dispatch(deletePost(post._id));
              }}
            >
              <DeleteIcon fontSize="small" /> Delete
            </Button>
          ))}
      </CardActions>
    </Card>
  );
};

export default Post;