import React from 'react';

const UserProfile = (props) => {
  return (
    <div className='UserProfile'>
      <p>hello I am {props.user.firstName}</p>
      <a onClick={props.logout}>Logout</a>
    </div>
  );
};

export default UserProfile;
