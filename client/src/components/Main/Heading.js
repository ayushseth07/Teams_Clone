import React from "react";
import {
  AppBar,
  Typography,
  Button,
  Toolbar,
  Container
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    fontFamily: "'Pacifico', cursive",
    fontSize: "2.2rem",
    color: "#B3B3B3"
  },
  main: {
    backgroundColor: "#282828",
    borderRadius: "15px",
    padding: "10px"
  },
  button: {
    backgroundColor: "#404040",
    color: "#B3B3B3",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1.1rem",
    borderRadius: "10px",
    textTransform: "none",
    marginLeft: "15px"
  },
  meetingID: {
    color: "#FFFFFFF",
    marginLeft: "14px",
    fontFamily: "'Ubuntu', sans-serif",
    fontSize: "1rem",
    marginRight: "14px"
  }
}));

function Heading(props) {
  const classes = useStyles();
  return (
    <Container>
      <AppBar position="static" className={classes.main}>
        <Toolbar>
          <span
            className="fas fa-icons fa-3x"
            style={{
              color: "#B0B3B8",
              marginLeft: "10px",
              marginRight: "15px"
            }}
          ></span>
          <Typography variant="h6" className={classes.title}>
            VideoPrism.io
          </Typography>
          {props.meeting ? (
            <Typography variant="h6" className={classes.meetingID}>
              Your RoomID :
              <Button size="large" className={classes.button}>
                {props.room}
              </Button>
            </Typography>
          ) : (
            <Typography variant="h6" className={classes.meetingID}>
              <Button size="large" className={classes.button} display="inline">
                A VideoChat WebApp for Everyone !!
              </Button>
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </Container>
  );
}

export default Heading;
