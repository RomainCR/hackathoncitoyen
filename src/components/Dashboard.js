import React from 'react';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
 }
    componentDidMount() {
      firebase.firestore().collection('annonces').doc().get().then(document => {
        const annonces = document.data();

        for (const [, value] of Object.entries(annonces)) {
          annonces.push(value)
        }
      })
      this.setState({
        annonces,
      })
    }
 
  render() { 
    const { annonces } = this.state
    return ( <div>{annonces.map(annonces => <div>{annonces.nom} </div>)}</div> );
  }
}
 
export default withContext(Dashboard);