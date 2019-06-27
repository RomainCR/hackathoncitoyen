import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  avatar: {
    margin: 10,
    right : '0',
    top : '10'
    
  },
 
});

export default function ImgAvatar({ userInfo, position }) {
  const classes = useStyles();

  return (
    <Grid container justify={position && position}>
      <p>{userInfo && userInfo.credits}</p>
      <img className="money" style={{ width: '5%', height: '5%', marginRight: '5%', marginTop: '4%', marginLeft: '1%'}} src='https://i.ibb.co/SnyPLSx/money.png' alt="money" />
    </Grid>
  );
}

