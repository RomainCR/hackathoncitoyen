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
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
console.log(props)
  return (
    <Grid item xs={6} style={{ border: '1px solid black'}}>
    <Card className={classes.card}>

      <CardActionArea >
        <CardMedia
          className={classes.media}
          image="https://image.but.fr/is/image/but/ambiance-cuisine-osalite-1920x770?$cui_1920x770$"
        />
        <p>{props.item.prix}</p>
      </CardActionArea>
    </Card>
    </Grid>
  );
}