import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  card: {
    maxWidth: '15%',

    display: "inline",

  },
  media: {
    height: 140,
    border: '2px solid black'
  },
});

export default function UntouchableCard(props) {
  const classes = useStyles();
  const { user } = props;
  return (
    <Grid item xs={12} >
      <Card className={classes.card}>


        <CardMedia
          className={classes.media}
          image=
          {user.url
            ? user.url
            : 'https://via.placeholder.com/200x100.png'
          }
        />
      </Card>
    </Grid>
  );
}