import React from 'react'
let QRCode = require('qrcode.react');

const QrCode = (props) => {
  const value = props.location.state.value.prix
  return ( <div> <QRCode style={{width: '30%', height: '30%'}} value={`localhost:3000/#/decrement/${value}`} />
  <div>  
    <h1>  
  Scannez le code pour obtenir votre {props.location.state.value.nom} !  <div> Vous serez débité de {value} ! </div> </h1></div></div> );
}
 
export default QrCode;