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
    backgroundColor: '#C0DF81',
  },

  
});

export default function MediaCard(props) {
  const classes = useStyles();
  const putImage = (thématique) => {
    console.log(thématique)
    if (thématique === "Nature et jardinage") {
      return  'https://i.ibb.co/VpJjRmK/picto00.png'
    }
    if (thématique === "Ecologie et nettoyage"){
    return 'https://i.ibb.co/QjPXXFw/picto02.png'}

    if (thématique === "Loisir et divertissement") {
        return 'https://i.ibb.co/N97WymJ/picto04.png'
    }
    if (thématique === "Aide à la personne") {
return  'https://i.ibb.co/M2cQ6S3/picto05.png'
    }
    if (thématique === "Réparation et bricolage") {
return 'https://i.ibb.co/JvXZHR5/picto.png'
    }
    if (thématique === "Education") {
      return 'https://i.ibb.co/kJ95cSp/picto15.png'
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