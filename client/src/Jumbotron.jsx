import React from 'react';
import './App.css';
import bgImage from './images/andrej-lisakov-568541-unsplash-2560.png';


var sectionStyle = {
  background: "url('" + bgImage + "')",
  height: "100vh",
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  backgroundRepeat: "no-repeat"
};
  // console.log(sectionStyle, 'is this');

class Jumbotron extends React.Component {
  render() {
    return (
      <div style={ sectionStyle }>
        {this.props.children}
      </div>
    );
  }
}

export default Jumbotron;