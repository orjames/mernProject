import React from 'react';
import { Image, Row, Col, Jumbotron, Card} from 'react-bootstrap';

const ColorList = (props) => {
  console.log(props, 'this is your props');

  let colors = props.colorRec.colors
    .filter((color) => {
      return color !== null;
    })
    .map((color, index) => {
      return (
        <div className='container-fluid'>
        <Card className="cardColorCircle" style={{width: "70%" }}>
          <Card.Body>
          <Row>
            <Col>
              <div className='colorRecsList' key={index}>
              <h3 className='compleColorName'>{color.name.value}</h3>
              <h3 className='compleColorHex'>{color.hex.value}</h3>
              <div className='imageColor'>
              <Image className='colorCircle' src={color.image.bare} roundedCircle />
            </div>
          </div>
        </Col>
        </Row>
      </Card.Body>
        </Card>
      </div>
    
      );
    });

  return (

    <div className='container-fluid'>
      <h1 className='Colors'> {props.mode} Colors</h1>
      {colors}
    </div>
 
  );
};

export default ColorList;
