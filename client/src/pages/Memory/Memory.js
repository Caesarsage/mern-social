import React ,{ useState }from 'react'
import { Posts } from "../Posts/Posts";
import {Container,  Grow, Grid, Paper, AppBar,TextField, Button} from '@material-ui/core'
import {getPosts ,getPostsBySearch} from '../../actions/post'
import { useDispatch, useSelector } from "react-redux";
import { Paginate } from '../../components/Paginations/Pagination';
import { Link, useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'

import useStyles from './styles'
import { Alert } from '@material-ui/lab';

function useQuery(){
  return new URLSearchParams(useLocation().search)
}

export const Memory = () => {
  const { error } = useSelector((state) => state.auth);

  const [currentId, setCurrentId] = useState(null)
  const dispatch = useDispatch()
  const classes = useStyles()
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])

  const query = useQuery()
  const history = useHistory()
  const page = query.get('page') || 1
  const searchQuery = query.get('searchQuery')

  const searchPost = ()=>{
    if(tags){
      // dispatch to fetch
      dispatch(getPostsBySearch({search, tags: tags.join(',')}))
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    }else{
      history.push('/')
    }
  }

  const handleKeyPress = (e)=>{
    if(e.keyCode === 13){
      searchPost()
    }
  }

  const handleAdd = (tag)=>{
    setTags([...tags, tag])
  }

  const handleDelete = (tagToDelete)=>{
    setTags(tags.filter((tag)=> tag !== tagToDelete))
  }


  return (
    <Grow in>
      <Container maxWidth="xl">
        {error && <Alert severity="error">{error}</Alert>}
        <Grid container justifyContent="space-between">
          <Button
            component={Link}
            to="/post/create"
            size="small"
            variant="contained"
            color="primary"
            style={{ margin: "5px" }}
          >
            Create Memory
          </Button>
          <AppBar
            className={classes.appBarSearch}
            position="static"
            color="inherit"
          >
            <TextField
              name="search"
              variant="outlined"
              label="Search Public Memories"
              fullWidth
              value={search}
              onKeyPress={handleKeyPress}
              onChange={(e) => setSearch(e.target.value)}
            />
            <ChipInput
              style={{ margin: "10px 0" }}
              value={tags}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label="Search tags"
              variant="outlined"
            />
            <Button
              onClick={searchPost}
              className={classes.searchButton}
              color="primary"
              variant="contained"
            >
              Search
            </Button>
          </AppBar>
          <Grid item xs={12} sm={9} md={12}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {!searchQuery && !tags.length && (
            <Paper elevation={6} className={classes.pagination}>
              <Paginate page={page} />
            </Paper>
          )}
        </Grid>
      </Container>
    </Grow>
  );
}
