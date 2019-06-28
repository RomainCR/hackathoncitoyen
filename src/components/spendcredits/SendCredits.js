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
    console.log(match)
    firebase.firestore().doc(`usersinfo/${localStorage.getItem('userId')}`).update({
      credits: firebase.firestore.FieldValue.increment(-value),
    });
    
  }

 
  render() { 
    return (  <div><h1>Merci de contribuer au bien être de notre communauté ! </h1></div>);
  }
}
 
export default withRouter(SendCredits);