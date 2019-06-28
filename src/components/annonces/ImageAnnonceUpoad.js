import React, { Component } from 'react';
import withFirebaseContext from '../../Firebase/withFirebaseContext';

class ImageAnnonceUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
    };
  }

  handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  }

  handleUpload = () => {
    const { image } = this.state;
    const { storage, getImage } = this.props;

    storage.ref(`images/${image.name}`).put(image).then(() => {
      storage.ref('images').child(image.name).getDownloadURL().then((url) => {
        this.setState({ url });
        getImage(url);
      })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  render() {
    const { url } = this.state;
    return (
      <div>
        <p style={{ fontWeight: 'bold' }}>Choisir une image</p>
        <input type="file" onChange={this.handleChange} />
        <button type="button" onClick={this.handleUpload}>Upload</button>
        {' '}
        {url && <img style={{ width: '50%' }} src={url} alt="uploaded img" />}
      </div>
    );
  }
}

export default withFirebaseContext(ImageAnnonceUpload);
