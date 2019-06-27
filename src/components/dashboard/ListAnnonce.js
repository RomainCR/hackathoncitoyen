import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/CardActionArea'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import { withRouter } from 'react-router-dom'
const ListAnnonce = props => {

 const redirectToAnnounce = () => {
    const { history } = props
    history.push(`annonce/${props.annonce.id}`)
  }

  const putImage = (annonce) => {
    console.log(annonce)
    if(annonce.data.thématique === "Nature et jardinage") {
      return 'https://i.ibb.co/VpJjRmK/picto00.png'
    }
    if (annonce.data.thématique === "Ecologie et nettoyage"){
    return 'https://i.ibb.co/QjPXXFw/picto02.png'}

    if (annonce.data.thématique === "Loisir et divertissement") {
        return 'https://i.ibb.co/N97WymJ/picto04.png'
    }
    if (annonce.data.thématique === "Aide à la personne") {
return 'https://i.ibb.co/M2cQ6S3/picto05.png'
    }
    if (annonce.data.thématique === "Réparation et bricolage") {
return 'https://i.ibb.co/JvXZHR5/picto.png'
    }
    if (annonce.data.thématique === "Education") {
      return 'https://i.ibb.co/kJ95cSp/picto15.png'
    }
  }
  
  return (
    <>
      <Grid item xs={6}>
      <Card> 
        <CardActionArea onClick={() => {redirectToAnnounce()}}>  <CardMedia style={{ height: "250px", width: '250px' }}
          image={putImage(props.annonce)}/> 
       </CardActionArea></Card>
      </Grid>{" "}
      <Grid item xs={6}>
        {" "}
        <Typography style={{marginTop : '50px'}}>{props.annonce.data.titre}</Typography>
        <Typography>{props.annonce.data.points}</Typography>
      </Grid>{" "}
    </>
  );
};

export default withRouter(ListAnnonce);
