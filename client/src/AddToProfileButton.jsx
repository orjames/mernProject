import React from 'react';
let date = new Date();

export default (props) => (
  <div className='button' onClick={props.postUpload}>
    <form>
      <input hidden name='colorRec' value={props.colorRec} />
      <input hidden name='cloudColors' value={props.cloudColors} />
      <input hidden type='text' name='publicId' value={props.publicId} />
      <input hidden type='date' name='publicId' value={date} />
      <button type='submit'>Add to Profile</button>
    </form>
  </div>
);
