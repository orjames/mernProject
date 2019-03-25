import React from 'react';
import './App.css';
import bgImage from './images/andrej-lisakov-568541-unsplash-2560.png';

export default class Jumbotron extends React.Component {
  render() {
    let sectionStyle = {
      background: "url('" + bgImage + "')",
      height: "100vh",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundRepeat: "no-repeat"
    };
  return (
      <div style={ sectionStyle }>
        {this.props.children}
      </div>
    )
  }
}