import React from 'react';
import './App.css';
import bgImage from './images/andrej-lisakov-568541-unsplash.jpg'


var sectionStyle = {
  background: "url('" + bgImage + "')",
  height: "100vh",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"
};

class Jumbotron extends React.Component {
  render() {
    return (
      <section style={ sectionStyle }>
        {this.props.children}
      </section>
    );
  }
}
// export default () => (
//       <div className="bg">
//       </div>
//   );

export default Jumbotron;