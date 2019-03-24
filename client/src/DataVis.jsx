import React from 'react';
import {RadialChart} from "react-vis";  


export default (props) => {
  const dataArr = props.cloudColors.map((color, index) => {
    console.log(color)
    return{ angle: [color[1]], color: [color[0]], label: [color[0]] } 
  })

  return(
    <div className="colorList">
    <RadialChart data={dataArr} width={300} height={300} showLabels={true} animation={true} />
    </div>
  )
}






// const Chart = (props) => {

//   const dataArr = props.data.map((d)=> {
//       return {x: d.year + '/' + d.quarter, 
//       y: parseFloat(d.count/1000)}
//   });

//   return (
//       <XYPlot
//           xType="ordinal"
//           width={1000}
//           height={500}>
//           <VerticalGridLines />
//           <HorizontalGridLines />
//           <XAxis title="Period of time(year and quarter)" />
//           <YAxis title="Number of pull requests (thousands)" />
//               <LineSeries
//                   data={dataArr}
//                   style={{stroke: 'violet', strokeWidth: 3}}/>
//       </XYPlot>
//   );
// }

// export default Chart;













