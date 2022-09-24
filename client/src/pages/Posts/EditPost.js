import React from "react";
import { useState, useEffect } from "react";
import Form from "../../components/Forms/Form";
import { Button } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const EditPost = () => {
  const { id } = useParams()
  
  const [currentId, setCurrentId] = useState(id);
 

  return (
    <div>
      <Button size="small" color="primary" component={Link} to="/posts">
        <ArrowBackIosIcon size="small" /> Back
      </Button>
      <Form currentId={currentId} setCurrentId={setCurrentId} />
    </div>
  );
};

export default EditPost;
