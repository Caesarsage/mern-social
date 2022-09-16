import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    margin: "0 0 30px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 50px",  
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
    justifyContent: "flex-end",
    width: "400px",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  profile: {
    display: "flex",
    justifyContent: "space-between",
    width: "400px",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      marginTop: 20,
      justifyContent: "center",
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
      width: "50%",
    },
  },
  userName: {
    display: "flex",
    alignItems: "start",
    textAlign: "start",
    fontStyle: "italic",
    color: "grey",
    [theme.breakpoints.down("sm")]: {
      padding: "0 5px",
      fontSize: "small",
    },
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));