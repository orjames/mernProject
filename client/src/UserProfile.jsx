import React, { Component } from 'react';
import axios from 'axios';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

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

  componentDidMount() {
    axios.get(`/profile/${this.props.user._id}/uploads`).then((res) => {
      this.setState({
        uploads: res.data,
      });
    });
  }

  selectUpload = (uploadId) => {
    axios
      .get(`/profile/${this.props.user._id}/uploads/${uploadId}`)
      .then((res) => {
        this.setState({
          currentUpload: res.data,
        });
      });
  };

  filter = (id) => {
    console.log('filter filter filter');
    console.log(id);
    return this.state.uploads.filter((upload) => upload._id !== id);
  };

  removeUpload = (id) => {
    console.log('clikc lcik click');
    this.setState({ uploads: this.filter(id) });
    axios
      .delete(`/profile/${this.props.user._id}/uploads/${id}`)
      .then((res) => {
        console.log('axios delete route hit', res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let uploads;
    if (this.state.uploads.length) {
      uploads = this.state.uploads.map((upload, index) => {
        return (
          // TODO: add click functionality
          <div key={index} className='fadein'>
            <div
              onClick={() => this.removeUpload(upload._id)}
              className='delete'
            >
              <p>{upload.publicId}</p>
              <FontAwesomeIcon icon={faTimesCircle} size='2x' />
            </div>
            <CloudinaryContext
              cloudName='orjames'
              api_key={process.env.REACT_APP_CLOUDINARY_API_KEY}
              api_secret={process.env.REACT_APP_CLOUDINARY_API_SECRET}
            >
              <Image
                publicId={upload.publicId}
                width='300'
                crop='scale'
                onClick={() => this.selectUpload(upload._id)}
              />
            </CloudinaryContext>
          </div>
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
