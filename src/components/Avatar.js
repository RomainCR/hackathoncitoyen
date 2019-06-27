import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom'
const useStyles = makeStyles({
  avatar: {
    margin: 10,

    right : '0',
    top : '10'
    
  },
 
});

 function ImgAvatar(props) {
  const classes = useStyles();
  const { history } = props
  return (
    <Grid container justify="flex-end" >
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" onClick={() => {history.push('/Profile')}} className={classes.avatar} />
     
    </Grid>
  );
}

export default withRouter(ImgAvatar)