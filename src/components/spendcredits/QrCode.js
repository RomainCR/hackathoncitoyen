import React from 'react'
let QRCode = require('qrcode.react');

const QrCode = (props) => {
  const value = props.location.state.value.prix
  return ( <div> <QRCode style={{width: '50%', height: '50%', marginTop: '89px'}} value={`localhost:3000/#/SendCredits/${value}`} />
  <div>  
    <h1>  
  Scannez le code pour obtenir votre {props.location.state.value.nom} !  <div> Vous serez débité de {value} ! </div> </h1></div></div> );
}
 
export default QrCode;