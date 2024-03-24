import React, {useState, useEffect } from "react";
import { useDispatch  } from "react-redux";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import {getPosts} from './actions/posts'
import download from './images/unnamed.png'
import useStyles from './style'


const App = () => {
  const classes=useStyles()
  const dispath=useDispatch()
  const [currentId,setCurrentId]=useState(null)
  useEffect(()=>{
    dispath(getPosts())
  },[dispath])
  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memo Stack
        </Typography>
        <img className={classes.image} src={download} alt="logo" height="60"  />
      </AppBar>
      
      <Grow in>
        <Container>
                 <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={7}>
                    <Posts setCurrentId={setCurrentId}></Posts>
                </Grid>
                <Grid item xs={12} sm={4}>
                  
                    <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
                </Grid>  
            </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
