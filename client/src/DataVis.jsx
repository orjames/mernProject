import React from 'react';

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
  return (
    <div className='colorList'>
      <h1>All cloudColors Forms</h1>
      {cloudColors}
    </div>
  );
};
