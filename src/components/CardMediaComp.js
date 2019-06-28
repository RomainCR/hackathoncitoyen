import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import { Link } from 'react-router-dom';
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import AccountBox from '@material-ui/icons/AccountBox';
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import * as firebase from 'firebase';
import { flexbox } from "@material-ui/system";

const picto = {
  "Nature et jardinage": 'https://i.ibb.co/gRxQRNC/nature.png',
  "Ecologie et nettoyage": 'https://i.ibb.co/q1KScvP/ecologie.png',
  "Loisir et divertissement": 'https://i.ibb.co/p2gd20D/loisir.png',
  "Aide à la personne": 'https://i.ibb.co/9YqWPBC/brico.png',
  "Réparation et bricolage": 'https://i.ibb.co/9YqWPBC/brico.png',
  "Education": 'https://i.ibb.co/NWmx5KC/ducation.png'
}



export default function CardMediaComp(props) {

  <div style={{
    display: "flex"
  }}>
      <CardMedia
        key={Math.floor(Math.random() * 5000)}
        image={picto[props.comp]}
        title="Nat"
        style={{
          backgroundColor: "grey",
          width: '30%'
        }} />
  </div>
}
