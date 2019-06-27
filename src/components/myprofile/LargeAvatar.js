import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({

  bigAvatar: {
    margin: 10,
    width: 150,
    height: 150,
    marginTop: 20,
  },
});

export default function ImageAvatars({ img }) {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
     
      <Avatar alt="Remy Sharp" src={img} className={classes.bigAvatar} />
    </Grid>
  );
}

