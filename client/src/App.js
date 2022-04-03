import React, { useEffect, useState } from "react";
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core'
import { useDispatch } from "react-redux";

import memories from './images/memories.jpg'
import { Posts } from "./components/Posts/Posts";
import Form from "./components/Forms/Form";

import useStyles from './styles'

import {getPosts} from './actions/post'

function App() {
  const [currentId, setCurrentId] = useState(null)
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getPosts())
  },[dispatch, currentId])

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="memories" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container flexDirectio justifyContent="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
