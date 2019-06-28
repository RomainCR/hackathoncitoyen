import React, { Component } from 'react';
import * as firebase from 'firebase'
import { withRouter } from 'react-router-dom'
class SendCredits extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount() {
    this.updateOver()
  }

  updateOver = () => {
    const { match } = this.props
    const value = parseInt(match.params.montant)
    const id = match.params.id
    console.log(match)
    firebase.firestore().doc(`usersinfo/${id}`).update({
      credits: firebase.firestore.FieldValue.increment(-value),
    });
    
  }

 
  render() { 
    return (  <div><h1>L'utilisateur a bien été débité !</h1></div>);
  }
}
 
export default withRouter(SendCredits);