import React from 'react';
import  {Image, Col} from "react-bootstrap"


const ColorList = (props) => {
console.log(props, "this is your props")

let colors = props.colorRec.colors.map((color, index) => {
   return (
   <div className="colorRecsList" key="index">
      <row>
         <h3 className="compleColorName">{color.name.value}</h3>
         <h3 className="compleColorHex">{color.hex.value}</h3>
         <Col xs={6} md={3}>
               <Image className="colorCircle"src={color.image.bare} roundedCircle />
            </Col>
      </row>
   </div>
   );
})

return (
   <div>
   <h1> Your COMPLé's </h1>
   {colors}
   </div>
)}


export default ColorList; 



