import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
const drawerWidth = 2400;

export default makeStyles((theme) => ({
  appBar: {
    // overflow: "hidden",
    // margin: "0 0 30px 0",
    // display: "flex",
    // justifyContent: "space-between",
    // padding: "10px 0px",
    // height: "200px",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
  },
  // profile: {
  //   display: "flex",
  //   width: "400px",
  //   [theme.breakpoints.down("sm")]: {
  //     width: "auto",
  //     marginTop: 20,
  //   },
  // },

  // btn: {
  //   textTransform: "upper",
  //   [theme.breakpoints.down("sm")]: {
  //     width: "50%",
  //   },
  // },

  // logout: {
  //   marginLeft: "10px",
  //   [theme.breakpoints.down("sm")]: {
  //     width: "90%",
  //   },
  // },
  // userName: {
  //   display: "flex",
  //   alignItems: "start",
  //   textAlign: "start",
  //   fontStyle: "italic",
  //   color: "grey",
  //   padding: "5px",
  //   [theme.breakpoints.down("sm")]: {
  //     fontSize: "small",
  //   },
  // },
  brandContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  root: {
    display: "flex",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },  
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));