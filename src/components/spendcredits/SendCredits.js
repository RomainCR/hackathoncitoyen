import React, { Component } from 'react';
import * as firebase from 'firebase'
import { withRouter } from 'react-router-dom'
class SendCredits extends Component {
  constructor(props) {
    super(props);
    this.state = { user : [], message : "L'utilisateur a bien été débité"}
  }

  componentDidMount() {
    this.getUser()
  }


  getUser = () => {
      const user = [];
      firebase.
        firestore().doc(`usersinfo/${localStorage.getItem('userId')}`)
  
        .get()
        .then(querySnapshot => {
            console.log(querySnapshot)
            user.push(querySnapshot.data());
          });
  
          this.setState({
            user
          });
      
      this.updateOver()
  }
  
  updateOver = () => {
   const {user} = this.state
   if (user.isAgent === true) {   
 
    const { match } = this.props
    const value = parseInt(match.params.montant)
    const id = match.params.id
    console.log(id)
    console.log(match)
    firebase.firestore().collection('usersinfo').doc(`${id}`).update({
      credits: firebase.firestore.FieldValue.increment(-value),
    });}
    else { this.setState({
      message : "Vous n'avez pas la permission de faire ça"
    })}
    
  }

  render() { 
 const { message } = this.state
    return (  <div><h1>{message}</h1></div>);
  }
}
 
export default withRouter(SendCredits);