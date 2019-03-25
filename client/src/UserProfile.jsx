import React from 'react';
import axios from "axios"; 

const UserProfile = (props) => {

  // componentDidMount(){
  //   // get data here! 
  //   let cloudApi = ""
    
  // }
  



  return (
    <div className='UserProfile'>
      <p>hello I am {props.user.firstName}</p>
      <button onClick={props.logout}>Logout</button> 
    </div>
  );
};

export default UserProfile;




// // let astroApi = "http://api.open-notify.org/astros.json"
  
    //   axios.get(astroApi).then(response => {
    //     console.log(response)
    //     this.setState({
    //       astros:response.data.people
    //     })
    //   }).catch( err => console.log(err))