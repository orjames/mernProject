import React, { Component } from 'react';
import axios from 'axios';
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
    this.postUpload = this.postUpload.bind(this);
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

  postUpload = (e) => {
    e.preventDefault();
    axios
      .post(`/profile/${this.props.user._id}/uploads`, {
        publicId: req.body.publicId,
        cloudColors: req.body.cloudColors,
        colorRec: req.body.colorRec,
        date: req.body.date,
      })
      .then((res) => {
        console.log(res);
      })
      .catch(function(error) {
        console.log(error);
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
      uploads = <p>No Upload Data!</p>;
    }
    return (
      <div className='uploadList'>
        <p>
          hello I am {this.props.user.firstName}, my userid is{' '}
          {this.props.user._id}{' '}
        </p>
        <h1>All uploads</h1>
        {uploads}
        <button onClick={this.props.logout}>Logout</button>
      </div>
    );
  }
}

export default UserProfile;
