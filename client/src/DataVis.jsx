import React from 'react';
import { RadialChart } from 'react-vis';

export default (props) => {
  // To Do click functionality
  let dataArr = props.cloudColors.map((color, index) => {
    // console.log(color)
    return {
      angle: color[1],
      color: color[0],
    };
  });
  return (
  <div className="containerForDataVis">
    <div className='radialChart'>
    <h2> Your Color Data </h2>
      <RadialChart
            data= {dataArr}
            className = "RadialChartOfficial"
            width={400}
            height={400}
            padAngle={0.004}
            showLabels={true}
            colorType='literal' /> 
    </div>
  </div>
  );
};
