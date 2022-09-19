import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  loadingPaper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    height: "39vh",
  },
  mainSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  socials: {
    display: "flex",
  },
  socialsItem: {
    textDecoration: "none",
    padding: "5px",
  },
  details: {
    marginTop: "5em",
  },
  image: {
    height: "225px",
    width: "225px",
    borderRadius: "50%",
  },
  editImage: {
    border: "1px solid #3f51b5",
    color: "white",
    background: "#3f51b5",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    alignItems: "center",
    textAlign: "center",
    display: "flex",
    flexDirection: "rowReverse",
    justifyContent: "center",
    position: "absolute",
    top: "0",
    right: "27px",
  },
  imgIcon: {
    position: "absolute",
    left: "-7px",
    // opacity: 0,
    background: "transparent",
    color: "transparent",
    cursor: "pointer",
  },
}));
