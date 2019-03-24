import React from 'react';
import {RadialChart} from "react-vis";  

export default (props) => {
  let cloudColors;

  if (props.cloudColors.length) {




    cloudColors = props.cloudColors.map((color, index) => {
      return (
        // TODO: add click functionality
        <p className='colorItem' key={index}>
          {' '}
          color(hex):{color[0]}, percentage:{color[1]}{' '}
        </p>
      );
    });
  } else {
    // no data yet
    cloudColors = <p>No color Data!</p>;
  }

  const Data = [ 

    {angle: 10, radius: 30, color:"Purple", label:"Purple"}, 
    {angle: 40, radius: 40,  color: "red",  label: 'red'}, 
    {angle: 40, radius: 40, color:"Pink", label: 'Pink'},
    {angle: 60, radius: 60,  color:"Green", label: "green"}, 
    {angle: 40, radius: 40,  color:"Orange", label: "Orange"},
    {angle: 60, radius: 60,  color:"Yellow", label:"Yellow"},
    {angle: 10, radius: 40,  color:"Brown", label:"Brown" },
    {angle: 60, radius: 60,  color:"teal", label:"Teal " }
  ] 
  
  return (
    <div className='colorList'>
      <h1>All cloudColors Forms</h1>
      <RadialChart data={Data} width={500} height={500} showLabels={true} animation={true} colorType={"literal"} />
      {cloudColors} 
    </div>
  );
};
