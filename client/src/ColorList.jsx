import React from 'react';
import { Image, container } from 'react-bootstrap';

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
   <div id="container-fluid">
      <h1 className="Colors"> Color Compliments</h1>
      {colors}
   </div>
)}


export default ColorList; 







