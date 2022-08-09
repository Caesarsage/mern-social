import React, { useEffect, useState } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/post'
import { useHistory } from 'react-router-dom'

export default function Form({currentId, setCurrentId}) {
  const classes = useStyles()
  const [postData, setPostData] = useState({
    title:"", message:"", tags:"", selectedFile:""
  })
  const user = JSON.parse(localStorage.getItem("profile"))

  const post = useSelector((state)=> currentId ? state.posts.posts.find((p)=> p._id === currentId) : null)

  const history = useHistory()

  useEffect(()=>{
    if(post) setPostData(post)
  }, [post])

  const dispatch = useDispatch()

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(currentId){
      dispatch(updatePost(currentId, {...postData, name : user?.result?.name }))
    }else{
      dispatch(createPost({...postData, name: user?.result?.name }))
    }
    history.push('/')
    clear()
  }

  const clear = ()=>{
    setCurrentId(null)
    setPostData({
       title:"", message:"", tags:"", selectedFile: ""
    })
  }

  if(!user?.result?.name){
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align="center">
          You need to sign in
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper}  raised elevation={6}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant='h6'>{currentId ? 'Editing Memory' : 'Creating Memory'}</Typography>
          <TextField 
          name="title" 
          variant='outlined' 
          label='Title' 
          fullWidth
          value={postData.title}
          onChange={(e)=> setPostData({...postData, title: e.target.value}) }
          />
          <TextField 
          name="message" 
          variant='outlined' 
          label='Message' 
          fullWidth
          value={postData.message}
          onChange={(e)=> setPostData({...postData, message: e.target.value}) }
          />
          <TextField 
          name="tag" 
          variant='outlined' 
          label='Tag' 
          fullWidth
          value={postData.tags}
          onChange={(e)=> setPostData({...postData, tags: e.target.value.split(',')}) }
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              multiple={false}
              onDone = {({base64}) => setPostData({ ...postData, selectedFile: base64})}
            />
          </div>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
          <Button variant="contained" color="secondary" onClick={clear} fullWidth>
            Clear
          </Button>
      </form>
    </Paper>
  )
}
