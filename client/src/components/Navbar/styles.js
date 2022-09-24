import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    overflow: "hidden",
    margin: "0 0 30px 0",
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0px",
    height: "200px"
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    fontSize: "1em",
    fontWeight: 300,
  },
  image: {
    marginLeft: "10px",
    marginTop: "5px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  profile: {
    display: "flex",
    width: "400px",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      marginTop: 20,
    },
  },

  btn: {
    textTransform: "upper",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
    },
  },

  logout: {
    marginLeft: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  userName: {
    display: "flex",
    alignItems: "start",
    textAlign: "start",
    fontStyle: "italic",
    color: "grey",
    padding: "5px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "small",
    },
  },
  brandContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));