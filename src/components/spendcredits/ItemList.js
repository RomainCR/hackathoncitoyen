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
    backgroundColor: '#347B98',
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  return (
    <Grid item xs={6} style={{ border: '1px solid black'}}>
    <Card className={classes.card}>

      <CardActionArea style={{ backgroundColor: '#347B98' }} >
        <CardMedia
          className={classes.media}
          image= { props.item.image}
         
        />
        <p style={{ fontSize: '12px'}}>{props.item.nom}</p>
        <p style={{ fontSize: '15px'}}>{props.item.prix}</p>
      </CardActionArea>
    </Card>
    </Grid>
  );
}