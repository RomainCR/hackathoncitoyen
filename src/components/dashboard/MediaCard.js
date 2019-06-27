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
    height: 250,
    width: 260,
    border: '2px solid black'
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  const putImage = (thématique) => {
    console.log(thématique)
    if(thématique === "Nature et jardinage") {
      return 'https://image.noelshack.com/fichiers/2019/26/4/1561616382-capture-da-ei-cran-2019-06-26-ai-20-07-34.png'
    }
    if (thématique === "Ecologie et nettoyage"){
    return 'https://image.noelshack.com/fichiers/2019/26/4/1561616382-picto01.png'}
    if (thématique === "Loisir et divertissement") {
        return 'https://image.noelshack.com/fichiers/2019/26/4/1561616382-picto04.png'
    }
    if (thématique === "Aide à la personne") {
return 'https://image.noelshack.com/fichiers/2019/26/4/1561616382-picto05.png'
    }
    if (thématique === "Réparation et bricolage") {
return 'https://image.noelshack.com/fichiers/2019/26/4/1561616382-picto02.png'
    }
    if (thématique === "Education") {
      return 'https://cdn.discordapp.com/attachments/593438579821248535/593691635422986250/picto15.png'
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
         
        />
      </CardActionArea>
    </Card>
    </Grid>
  );
}