import React from 'react';
import { Image, Col, Container, Row } from 'react-bootstrap';

const ColorList = (props) => {
console.log(props, "this is your props")

let colors = props.colorRec.colors.map((color, index) => {
   return (
   <div className="colorRecsList" key={index}>
         <h3 className="compleColorName">{color.name.value}</h3>
         <h3 className="compleColorHex">{color.hex.value}</h3>
            <div className="imageColor">
               <Image className="colorCircle" src={color.image.bare} roundedCircle />
            </div>
   </div>
   );
})

return (
   <div id="returnedColors">
      <h1 className="Colors"> Colors</h1>
      {colors}
   </div>
)}


export default ColorList; 


   //  <Col xs>First, but unordered</Col>
   //  <Col xs={{ order: 12 }}>Second, but last</Col>
   //  <Col xs={{ order: 1 }}>Third, but second</Col>




