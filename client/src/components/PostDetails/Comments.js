import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import useStyle from "./styles";
import { commentPost } from "../../actions/post";

export const Comments = ({ post }) => {
  const [comments, setComments] = useState(post?.data.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  const classes = useStyle();
  const commentRef = useRef()

  const handleClick =  async () => {
    const value = `${user.result.name}: ${comment}`;
    const newComments = await dispatch(commentPost(post.data._id, { value }));
    setComments(newComments)

    setComment('')

    commentRef.current.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((c, index) => (
            <Typography key={index} gutterBottom variant="subtitle1">
              <strong>{c.split(":")[0]}</strong>
              {c.split(":")[1]}
            </Typography>
          ))}
        </div>
        <div style={{ width: "50%" }}>
          <Typography gutterBottom variant="h6">
            Write a comment
          </Typography>
          {user?.result?.name ? (
            <>
              <TextField
                fullWidth
                rows={4}
                variant="outlined"
                label="Comment"
                multiline
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <Button
                style={{ marginTop: "10px" }}
                fullWidth
                disabled={!comment}
                variant="contained"
                onClick={handleClick}
                color="primary"
              >
                Comment
              </Button>
            </>
          ) : (
            <Typography>Login to write a comment</Typography>
          )}
        </div>
      </div>
    </div>
  );
};
