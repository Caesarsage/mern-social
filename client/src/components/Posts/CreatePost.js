import React from 'react'
import { useState } from 'react';
import Form from "../Forms/Form";
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const CreatePost = () => {
  const [currentId, setCurrentId] = useState(null)

  return (
    <div>
      <Button size="small" color="primary" component={Link} to="/posts">
        <ArrowBackIosIcon size="small" /> Back
      </Button>
      <Form currentId={currentId} setCurrentId={setCurrentId} />
    </div>
  );
}

export default CreatePost