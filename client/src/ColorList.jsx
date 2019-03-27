import React from 'react';
import { Image, Row, Col, Jumbotron, Card} from 'react-bootstrap';

const ColorList = (props) => {
  console.log(props, 'this is your props');

  let colors = props.colorRec.colors
    .filter((color) => {
      return color !== null;
    })
    .map((color, index) => {
      let imgStyle = {
        backgroundColor: color.hex.value,
        height: '10vh',
        width: '80vw',
      };
      return (
        <div className='userProfileRecommendation'>
          <div style={imgStyle} />
          <h3 className='userProfileColorName'>
            {color.name.value} <small>{color.hex.value}</small>
          </h3>
        </div>
      );
    });

  return (
    <div id='container-fluid'>
      <div className='userProfileRecommendationBoxOutputs'>{colors}</div>
    </div>
 
  );
};

export default ColorList;
