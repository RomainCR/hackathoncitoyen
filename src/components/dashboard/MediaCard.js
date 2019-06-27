import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  card: {
    maxWidth: '12%',

    display: "inline",
    
  },
  media: {
    height: 180,
    width: 260,
    border: '1px solid black',
    backgroundColor: '#347B98',
  },

  
});

export default function MediaCard(props) {
  const classes = useStyles();
  const putImage = (thematique) => {
    console.log(thematique)
    if (thematique === "Nature et jardinage") {
      return  'https://i.ibb.co/gRxQRNC/nature.png'
    }
    if (thematique === "Ecologie et nettoyage"){
    return 'https://i.ibb.co/q1KScvP/ecologie.png'}

    if (thematique === "Loisir et divertissement") {
        return 'https://i.ibb.co/p2gd20D/loisir.png'
    }
    if (thematique === "Aide à la personne") {
return  'https://i.ibb.co/55sdLQw/aide.png'
    }
    if (thematique === "Réparation et bricolage") {
return 'https://i.ibb.co/9YqWPBC/brico.png'
    }
    if (thematique === "Education") {
      return 'https://i.ibb.co/NWmx5KC/ducation.png'
    }
  }
  return (
    <Grid item xs={6} >
    <Card className={classes.card}>
    {console.log(props)}
      <CardActionArea onClick={() => { props.onChoice(props.category)}}>
        <CardMedia
          className={classes.media}
          image={putImage(props.category)}
          style={{ width: '100%' }}
        />
      </CardActionArea>
    </Card>
    </Grid>
  );
}