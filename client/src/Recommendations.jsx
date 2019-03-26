import React, { Component } from 'react';
import axios from 'axios';
import ColorList from './ColorList';
import {Button} from "react-bootstrap"; 

class Recommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorRec: [],
    };
    this.saveRecommendations = this.saveRecommendations.bind(this);
  }

  // when the component mounts, it looks at the primary color and then recommends complementary ones
  componentDidMount() {
    let primaryColorHex = this.props.cloudColors[0][0];
    while (primaryColorHex.charAt(0) === '#') {
      primaryColorHex = primaryColorHex.substr(1);
    }
    let colorApi = `http://www.thecolorapi.com/scheme?hex=${primaryColorHex}&format=json&mode=complement&count=6`;
    // fetch a color complementary color thing
    axios
      .get(colorApi)
      .then((response) => {
        // set state
        this.setState({ colorRec: response.data });
      })
      .catch((err) => console.log(err));
  }

  postUpload = (object) => {
    console.log('axios should e posting this');
    axios
      .post(`/profile/${object.userId}/uploads`, {
        publicId: object.publicId,
        cloudColors: object.cloudColors,
        colorRec: object.colorRec,
        date: object.date,
      })
      .then((res) => {
        console.log(res);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // populates the object to be sent to the back-end to post the database
  saveRecommendations = () => {
    let date = new Date();
    let postObject = {
      userId: this.props.user._id,
      publicId: this.props.publicId,
      cloudColors: this.props.cloudColors,
      colorRec: this.state.colorRec,
      date: date,
    };
    this.postUpload(postObject);
  };

  render() {
    if (Object.keys(this.state.colorRec).length > 0) {
      return (
        <div>
          <ColorList colorRec={this.state.colorRec} />
          <Button variant="primary" size="large" onClick={this.saveRecommendations}>Add to Profile</Button>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }
  }
}

export default Recommendations;


