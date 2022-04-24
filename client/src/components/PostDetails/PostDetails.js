import { Button, CircularProgress, Divider, Paper, Typography } from '@material-ui/core';
import moment from 'moment';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { getPost } from '../../actions/post';

import useStyles from './styles'

const PostDetails = () => {
  const {post, posts, isLoading } = useSelector((state)=> state.posts);
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const {id} = useParams()

  useEffect(()=>{
    dispatch(getPost(id))
  },[id])

  if(!post) return null
  if(isLoading){
    return <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size="7em"m/>
    </Paper>
  }
  return (
    <Paper style={{ padding: '20px', borderRadius: '15px'}} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color='textSecondary' component='h2'>
            {post.title}
          </Typography>
          <Typography gutterBottom variant="body" component='p'>
            {post.message}
          </Typography>
          <Typography variant="h6">
            Created by: 
          </Typography>
          <Typography>
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider style={{margin: '20px 0'}} />
          <Button>
            Send Crypto - Appreciate Post 
          </Button>
          <Divider style={{margin: '20px 0'}} />
          <Typography variant="body1">
            comments
          </Typography>
          <Divider style={{margin: '20px 0'}} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile} alt={post.title} />
        </div>
      </div>
      {/* logic for recommended memory */}
    </Paper>
  )
}

export default PostDetails