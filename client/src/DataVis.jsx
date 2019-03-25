import React from 'react';
import { RadialChart } from 'react-vis';

export default (props) => {
  // To Do click functionality
  let dataArr = props.cloudColors.map((color, index) => {
    // console.log(color)
<<<<<<< HEAD
    return {
      angle: [color[1]],
      color: [color[0]],
      label: [color[0], ['-'], color[1]],
    };
  });
  return (
    <div className='colorList'>
      <RadialChart
        data={dataArr}
        width={500}
        height={550}
        showLabels={true}
        colorType='literal'
      />
=======
    return{ angle: [color[1]], color: [color[0]], label:[color[0], ["-"], color[1]]} 
  })
  return(
    <div className="colorList">
    <RadialChart data={dataArr} width={500} height={550} showLabels={true}  colorType="literal"/>
>>>>>>> 4fe0c633ca408a4ad310fa2d816d97f709696247
    </div>
  );
};
