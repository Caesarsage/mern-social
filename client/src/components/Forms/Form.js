import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core";
import FileBase from "react-file-base64";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/post";
import { useHistory } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Alert } from "@material-ui/lab";

export default function Form({ currentId, setCurrentId }) {
  const { error } = useSelector((state) => state.posts);

  const classes = useStyles();
  const [postData, setPostData] = useState({});

  const modules = {
    toolbar: [
      [{ container: "#toolbar" }],
      [{ header: [1, 2, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const user = JSON.parse(localStorage.getItem("profile"));

  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );

  const history = useHistory();

  useEffect(() => {
    if (post) {
      setPostData({
        title: post.title,
        message: post.message,
        tags: post.tags,
        isPrivate: '' ,
        selectedFile: post.selectedFile,
      });
    }
  }, [post]);

  console.log(postData)

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    history.push("/");
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      isPrivate: false,
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          You need to sign in
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} raised elevation={6}>
      {error && <Alert severity="error">{error}</Alert>}
      <form
        autoComplete="off"
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing Memory" : "Creating Memory"}
        </Typography>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            required
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          required
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <div style={{ display: "block", width: "100vw" }}>
          <FormLabel>Enter your Memory</FormLabel>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={postData.message || ""}
            onChange={(e) => {
              setPostData({ ...postData, message: e });
            }}
          />
        </div>
        <TextField
          name="tag"
          variant="outlined"
          required
          label="Tag(maximum 3 and comma separated)"
          style={{ marginTop: "5em" }}
          fullWidth
          value={postData?.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div style={{ display: "block" }}>
          <FormLabel id="memory-visibility">Memory Visibility</FormLabel>
          <RadioGroup
            required
            row
            aria-labelledby="memory-visibility"
            name="memory-visibility"
            value={postData.isPrivate === false ? "false" : "true"}
            onChange={(e) =>
              setPostData({
                ...postData,
                isPrivate: e.target.value === "false" ? false : true,
              })
            }
          >
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="Public"
            />
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Private"
            />
          </RadioGroup>
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button variant="contained" color="secondary" onClick={clear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
}
