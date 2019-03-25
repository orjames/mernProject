import React from 'react';


const ColorList = (props) => {
console.log(props, "this is your props")
let colors = props.colorRec.colors.map((color, index) => {
   return (
   <div className="colorRecsList" key="index">

{/* 
            <h1>
            {color.hex.value}, {color.name.value}
            </h1>
            <img src={color.image.named} alt='' /> */}
   </div>
   );
})

return (
   <h1> Color List </h1>
)
}

export default ColorList; 

