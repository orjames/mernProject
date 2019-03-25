import React from 'react';
import axios from "axios"; 
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react'; 

const UserProfile = (props) => {

  // componentDidMount(){
  // //   // get data here! 
  // //   let cloudApi = ""
    
  // // }
  



  return (
    <div className='UserProfile'>
      <p>hello I am {props.user.firstName}</p>
      <button onClick={props.logout}>Logout</button> 
    </div>
    
  );
};

export default UserProfile;


