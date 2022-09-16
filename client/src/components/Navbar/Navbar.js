import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography} from '@material-ui/core'

import memories from '../../images/memories.jpg'

import useStyles from './styles'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import decode from 'jwt-decode'

export const Navbar = () => {

  const classes = useStyles()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const logout = ()=>{
    dispatch({type: 'LOGOUT'})

    history.push('/')

    setUser(null)
  }
  
  useEffect(()=>{
    const token = user?.token

    // JWT Expiry
    if(token){
      const tokenDecoded = decode(token)

      if(tokenDecoded.exp * 1000 < new Date().getTime()){
        logout()
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h6"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="30"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              component={Link}
              to="/user/profile"
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
              style={{ cursor: "pointer"}}
            >
              {user.result.name}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              welcome {user.result.name.split(" ")[0]}
            </Typography>

            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Log out
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
