import { Button, Container, Divider, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <Container className="container text-center">
      <Paper>
        <Typography variant="h1" component="h1">
          <strong>
            4 <span style={{ color: "red" }}>0</span> 4
          </strong>
        </Typography>
      </Paper>
      <Paper>
        <Typography variant="body1" component="p">
          Page Not Found!!!
        </Typography>
        <br /> <br/>
        <Button component={Link} to="/" color="secondary" variant="contained">
          RETURN HOME
        </Button>
        <br /> <br />
      </Paper>
    </Container>
  );
};
