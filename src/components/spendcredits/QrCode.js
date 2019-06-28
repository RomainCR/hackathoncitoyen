import React from 'react'
let QRCode = require('qrcode.react');

const QrCode = (props) => {
  const value = parseInt(props.location.state.value.prix.split('c'))
  const id = props.location.state.id
  return ( <div> <QRCode style={{width: '50%', height: '50%', marginTop: '89px'}} value={`https://unicity.netlify.com/SendCredits/${value}/${id}`} />
  <div>  
    <h1>  
  Scannez le code pour obtenir votre {props.location.state.value.nom} !  <div> Vous serez débité de {value} ! </div> </h1></div></div> );
}
 
export default QrCode;