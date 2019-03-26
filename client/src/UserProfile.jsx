import React, { Component } from 'react';
import axios from 'axios';
import {Button} from "react-bootstrap"
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploads: [],
      currentUpload: {},
      loading: false,
    };
    this.selectUpload = this.selectUpload.bind(this);
  }

  componentDidMount = () => {
    axios.get(`/profile/${this.props.user._id}/uploads`).then((res) => {
      this.setState({
        uploads: res.data,
      });
    });
  };

  selectUpload = (uploadId) => {
    axios
      .get(`/profile/${this.props.user._id}/uploads/${uploadId}`)
      .then((res) => {
        this.setState({
          currentUpload: res.data,
        });
      });
  };

  render() {
    let uploads;
    if (this.state.uploads.length) {
      uploads = this.state.uploads.map((upload, index) => {
        return (
          // TODO: add click functionality
          <p
            className='uploadItem'
            key={index}
            onClick={() => this.state.selectUpload(upload._id)}
          >
            upload
          </p>
        );
      });
    } else {
      // no data yet
      uploads = <p className="noUploadDataHeader">No Upload Data!</p>;
    }
    return (
      <div className='uploadList'>
        <p className="userData">
          hello I am {this.props.user.firstName}, my userid is{' '}
          {this.props.user._id}{' '}
        </p>
        <h1 className="uploadHeader">All uploads</h1>
        {uploads}
        <Button variant="primary" size="medium" value="logout"onClick={this.props.logout}>Logout</Button>
      </div>
    );
  }
}



export default UserProfile;
