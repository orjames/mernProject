import React from 'react';
import {RadialChart} from "react-vis";  

export default (props) => {

// const dataVis = props.data.map((d) => {
//   return { angle: d.hex, radius: d.color, color:d.hex }
// })

  let cloudColors;

  if (props.cloudColors.length) {
  cloudColors = props.cloudColors.map((color) => {
      return [{ angle: color.hex, radius: color.color, label: color[1]}];
    });
    
  } else {
    // no data yet
    cloudColors = <p>No color Data!</p>;
  }


  return (
    <div className='colorList'>
      <h1>All cloudColors Forms</h1>
      <RadialChart data={[cloudColors]} width={300} height={300} showLabels={true} /> 
    </div>
  );
};
