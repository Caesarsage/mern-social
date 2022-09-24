import React from "react"
import { BrowserRouter, Route,Redirect, Switch} from "react-router-dom"

import {Container} from '@material-ui/core'

import { Navbar } from "./components/Navbar/Navbar"
import { Memory } from "./pages/Memory/Memory"
import { Auth } from "./components/Auth/Auth"
import PostDetails from "./pages/PostDetails/PostDetails"
import CreatePost from "./pages/Posts/CreatePost"
import Profile from "./pages/Profile/Profile"
import EditPost from "./pages/Posts/EditPost"
import { Home } from "./pages/Home/Home"
import { EditProfile } from "./pages/Profile/EditProfile"
import { Error } from "./pages/Error"

function App() {
  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth="xl">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/posts" exact component={Memory} />
          <Route path="/posts/search" exact component={Memory} />
          <Route path="/post/create" exact component={CreatePost} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/post/:id/edit" exact component={EditPost} />
          <Route path="/user/profile/:id" exact component={Profile} />
          <Route path="/user/profile/:id/edit" exact component={EditProfile} />
          <Route
            path="/auth"
            exact
            component={() => (!user ? <Auth /> : <Redirect to="/posts" />)}
          />
          <Route path="*" exact component={Error} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
