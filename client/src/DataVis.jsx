import React from 'react';
import { RadialChart } from 'react-vis';


export default (props) => {
  // To Do click functionality
  let dataArr = props.cloudColors.map((color, index) => {
    console.log(color)
    return {
      angle: color[1],
      color: color[0],
      label: `${color[0]} ${color[1]}`
      };
    });
  return (
    <div className='radialChart'>
      <RadialChart
            data= {dataArr}
            className = "RadialChartOfficial"
            width={500}
            height={550}
            showLabels={true}
            colorType='literal' /> 
            
      
    </div>
  );
};



