import React, { Component } from 'react';
import axios from 'axios';

class Recommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorRec: [],
    };
  }

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

  render() {
    if (Object.keys(this.state.colorRec).length > 0) {
      let colors = this.state.colorRec.colors.map((color, index) => {
        return (
          <div key={index}>
            <h1>
              {color.hex.value}, {color.name.value}
            </h1>
            <img src={color.image.named} alt='' />
          </div>
        );
      });
      return <div>{colors}</div>;
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
