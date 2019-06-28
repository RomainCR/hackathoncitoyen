import React, { Component } from 'react';
import * as firebase from 'firebase'
import { withRouter } from 'react-router-dom'
class SendCredits extends Component {
  constructor(props) {
    super(props);
    this.state = { user : [] }
  }

  componentDidMount() {
    this.getUser()
  }


  getUser = () => {
      const user = [];
      firebase
        .firestore()
        .collection("usersinfo").doc()
  
        .get()
        .then(querySnapshot => {
            console.log(querySnapshot)
            user.push(querySnapshot.data());
          });
  
          this.setState({
            user
          });
      
        console.log(user)
  }
  
  updateOver = () => {
   
 
    const { match } = this.props
    const value = parseInt(match.params.montant)
    const id = match.params.id
    console.log(id)
    console.log(match)
    firebase.firestore().collection('usersinfo').doc(`${id}`).update({
      credits: firebase.firestore.FieldValue.increment(-value),
    });
    
  }

 
  render() { 
    return (  <div><h1>L'utilisateur a bien été débité !</h1></div>);
  }
}
 
export default withRouter(SendCredits);