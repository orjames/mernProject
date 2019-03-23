import React from 'react';
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext,
} from 'cloudinary-react';

const WidgetTest = (props) => {
  return (
    <div className='widgetDiv'>
      widget
      <CloudinaryContext cloudName='demo'>
        <div>
          <Image publicId='sample' width='50' />
        </div>
        <Image publicId='sample' width='0.5' />
      </CloudinaryContext>
    </div>
  );
};

export default WidgetTest;
