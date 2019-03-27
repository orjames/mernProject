
import React from 'react';
import { RadialChart } from 'react-vis';
import {Jumbotron, Container, Row, Col} from "react-bootstrap"; 


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
  

      <Jumbotron>
    <div className="container-fluid"> 
      <div className="containerForDataVis">
      <div className='radialChart'>
      <h2 className="colorDataHeader"> Your Color Data </h2>
        <RadialChart
              data= {dataArr}
              className = "RadialChartOfficial"
              width={350}
              height={350}
              padAngle={0.004}
              showLabels={true}
              colorType='literal' /> 
      </div>
    </div>
</div>
    </Jumbotron>


  );
};

