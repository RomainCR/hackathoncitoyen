import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import withFirebaseContext from '../Firebase/withFirebaseContext';

const useStyles = makeStyles({
  avatar: {
    margin: 10,

    right: '0',
    top: '10',

  },

});

function ImgAvatar(props) {
  const classes = useStyles();
  const { history, userInfo } = props;


  return (
    <Grid container justify="flex-end">
      {userInfo && <Avatar alt="Remy Sharp" src={userInfo.url} onClick={() => { history.push('/Profile'); }} className={classes.avatar} />
      }
    </Grid>
  );
}

export default withFirebaseContext(withRouter(ImgAvatar));
