import React from 'react';


const ColorList = (props) => {
console.log(props, "this is your props")
let colors = props.colorRec.colors.map((color, index) => {
   return (
   <div className="colorRecsList" key="index">
      <h3 classname="compleColorName">{color.name.value}</h3>
      <h3 classname="compleColorHex">{color.hex.value}</h3>
      <img src ={color.image.bare} width="30%" alt={color.name.value} /> 
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

