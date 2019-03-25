import React, { Component } from 'react';
import axios from 'axios';
import ColorList from "./ColorList"

class Recommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorRecs: '',
    };
  }
  componentDidMount() {
    let colorApi =
      'http://www.thecolorapi.com/scheme?hex=0047AB&format=json&mode=complement&count=6';
    // fetch a color complementary color thing
    axios
      .get(colorApi)
      .then((response) => {
        // set state
        this.setState({ colorRecs: response.data });
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }
  render() {
    let colors;
    if (this.state.colorRecs) {
      colors = this.state.colorRecs.colors.map((color, index) => {
        return (
          <div key={index}>
            
            <ColorList colorRecs={this.props.colorRecs} /> 

          </div>
        );
      });
    }
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
}

export default Recommendations;
