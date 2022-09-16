import { Container, Divider, Grid, Typography } from '@material-ui/core'
import React, { useState } from 'react'

export default function Profile({user}) {
  const [profile, setProfile] = useState()

  return (
    <Container>
      <div>
        <div>
          <Typography>Details</Typography>
          <img src="" alt="profile pic" />
          <Divider />
          <div>socials</div>
          <div>followers</div>
        </div>
        <div>
          <Typography gutterBottom variant="body1" component="h6">
            Full name:
          </Typography>
          <Typography gutterBottom variant="body1" component="h6">
            Gender:
          </Typography>
          <Typography gutterBottom variant="body1" component="p"></Typography>
        </div>
      </div>
      <Divider />
      <Grid></Grid>
      <Grid>
        <Typography>User Public Memories</Typography>

        <Typography>Private Memories</Typography>
      </Grid>
    </Container>
  );
}
