import React, { useState } from "react";

import useStyles from "./style";

import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  CardHeader,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Fade,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../../../actions/post";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";

const Post = ({ post, setCurrentId }) => {
  const { error } = useSelector((state) => state.auth);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
  const Likes = ({post}) => {
    console.log(post);
    if (post?.likes?.length > 0) {
      return post.likes.find(
        (like) => like._id === (user?.result?.googleId || user?.result?.id)
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
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;
      </>
    );
  };
  

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Card
        sx={{ maxWidth: 345 }}
        className={classes.card}
        raised
        elevation={6}
      >
        <CardHeader
          className={classes.title}
          avatar={
            <Avatar
              aria-label="creator"
              style={{ cursor: "pointer" }}
              onClick={handleProfile}
            >
              {post?.name[0]}
            </Avatar>
          }
          action={
            user?.result.googleId === post ||
            (user?.result?.id === post?.creator && (
              <IconButton
                aria-label="settings"
                id="fade-button"
                aria-controls={open ? "fade-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
            ))
          }
          title={post?.title}
          subheader={moment(post?.createdAt).fromNow()}
        />
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
          <MenuItem
            onClick={() => {
              history.push(`/post/${post._id}/edit`);
              setAnchorEl(null);
            }}
          >
            <EditIcon fontSize="medium" /> Edit
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              dispatch(deletePost(post._id));
              setAnchorEl(null);
            }}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </MenuItem>
        </Menu>
        <CardMedia
          component="img"
          height="194"
          image={post?.selectedFile}
          alt={post?.title}
          style={{ cursor: "pointer" }}
          onClick={openPost}
        />
        <CardContent className={classes.details}>
          <Typography variant="body2" color="text.secondary">
            {/* {parse(post?.message.trim().toLowerCase())} */}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {post?.tags.map((tag) => `#${tag} `)}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Chip label={post.isPrivate ? "Private" : "Public"} size="small" />
          <IconButton
            aria-label="add to favorites"
            size="small"
            color="primary"
            onClick={() => {
              console.log(post._id);
              dispatch(likePost(post._id));
            }}
            disabled={!user?.result}
          >
            <Likes post={post} />
          </IconButton>
          <IconButton
            aria-label="share"
            style={{ cursor: "pointer" }}
            onClick={openPost}
          >
            <MoreHorizIcon />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
