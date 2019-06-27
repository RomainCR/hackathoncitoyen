import React, { Component } from "react";
import * as firebase from "firebase";
class ApplyList extends Component {
  constructor(props) {
    super(props);
    this.state = { applyList: [], postulants : [], users: [], match: []};
  }


  componentDidMount() {
   this.findUserProfile() 
     }
  
  findUserProfile = () => {
    const users = [];
    firebase
      .firestore()
      .collection("usersinfo")

      .get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
          users.push(doc.data());
        });
       
        this.setState({
          users
        });
      }).then( () => { this.findUser()   }  )

      
  
  };

  findUser =() => {
    const match = [];
    const { annonce } = this.props
    const {  users  } = this.state

    if (annonce[0].postulants.length > 0) {
      for (let i = 0; i < annonce[0].postulants.length; i++){
      let value =  users.filter(user => user.uid.includes(annonce[0].postulants[i].id))
      console.log(value, annonce, annonce[0].postulants)
        match.push(
          value
        );}
    }
    this.setState({match})
  }

  render() {   const { match } = this.state    
    return <div> <p> </p></div>;
  }
}

export default ApplyList;
