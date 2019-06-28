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
    border: '2px solid black'
  },
});



export default function UntouchableCard(props) {
  const classes = useStyles();
  const { annonce } = props;

  const putImage = (theannonce) => {
    if (theannonce.thematique === "Nature et jardinage") {
      return 'https://i.ibb.co/gRxQRNC/nature.png'
    }
    if (theannonce.thematique === "Ecologie et nettoyage") {
      return 'https://i.ibb.co/q1KScvP/ecologie.png'
    }

    if (theannonce.thematique === "Loisir et divertissement") {
      return 'https://i.ibb.co/p2gd20D/loisir.png'
    }
    if (theannonce.thematique === "Aide à la personne") {
      return 'https://i.ibb.co/55sdLQw/aide.png'
    }
    if (theannonce.thematique === "Réparation et bricolage") {
      return 'https://i.ibb.co/9YqWPBC/brico.png'
    }
    if (theannonce.thematique === "Education") {
      return 'https://i.ibb.co/NWmx5KC/ducation.png'
    }
  };

  return (
    <Grid item xs={12}>

      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image=
          {annonce.url
            ? annonce.url
            : putImage(annonce)
          }
        />
      </Card>
    </Grid>
  );
}