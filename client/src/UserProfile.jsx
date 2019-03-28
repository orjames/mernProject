import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { CloudinaryContext, Image } from 'cloudinary-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploads: [],
      currentUpload: null,
      mode: 'complement',
      loading: false,
    };
    this.selectUpload = this.selectUpload.bind(this);
  }

  componentDidMount() {
    axios.get(`/profile/${this.props.user._id}/uploads`).then((res) => {
      this.setState({
        uploads: res.data,
        mode: 'complement',
      });
    });
  }

  selectUpload = (upload) => {
    axios
      .get(`/profile/${this.props.user._id}/uploads/${upload._id}`)
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
    this.setState({ uploads: this.filter(id), currentUpload: null });
    axios
      .delete(`/profile/${this.props.user._id}/uploads/${id}`)
      .then((res) => {
        console.log('axios delete route hit', res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changeMode = (e) => {
    this.setState({
      mode: e.target.value,
    });
  };

  render() {
    let selectedUpload;
    let selectedColors;
    if (!this.state.currentUpload) {
      selectedUpload = <p>select an upload</p>;
    } else {
      console.log(this.state.currentUpload);
      selectedColors = this.state.currentUpload.colorRec[this.state.mode]
        .colors;
      selectedUpload = selectedColors
        .filter((color) => {
          return color !== null;
        })
        .map((color, index) => {
          let imgStyle = {
            backgroundColor: color.hex.value,
            height: '10vh',
            width: '80vw',
          };
          return (
            <div key={index} className='userProfileRecommendation'>
              <div style={imgStyle} />
              <h3 className='userProfileColorName'>
                {color.name.value} <small>{color.hex.value}</small>
              </h3>
            </div>
          );
        });
    }
    let radioButton;
    if (this.state.currentUpload) {
      radioButton = (
        <div className='radioButtonDiv'>
          <form className='radioButtonForm'>
            <input
              checked={this.state.mode === 'monochrome'}
              onChange={this.changeMode}
              type='radio'
              name='mode'
              className='radio'
              value='monochrome'
              id='monochrome'
            />
            <label htmlFor='monochrome'>monochrome</label>{' '}
            <input
              checked={this.state.mode === 'monochromeDark'}
              onChange={this.changeMode}
              type='radio'
              name='mode'
              className='radio'
              value='monochromeDark'
              id='monochromeDark'
            />
            <label htmlFor='monochromeDark'>monochrome dark</label>{' '}
            <input
              checked={this.state.mode === 'monochromeLight'}
              onChange={this.changeMode}
              type='radio'
              name='mode'
              className='radio'
              value='monochromeLight'
              id='monochromeLight'
            />
            <label htmlFor='monochromeLight'>monochrome -light</label>{' '}
            <input
              checked={this.state.mode === 'analogic'}
              onChange={this.changeMode}
              type='radio'
              name='mode'
              className='radio'
              value='analogic'
              id='analogic'
            />
            <label htmlFor='analogic'>analogic</label>{' '}
            <input
              checked={this.state.mode === 'complement'}
              onChange={this.changeMode}
              type='radio'
              name='mode'
              className='radio'
              value='complement'
              id='complement'
            />
            <label htmlFor='complement'>complement</label>{' '}
            <input
              checked={this.state.mode === 'analogicComplement'}
              onChange={this.changeMode}
              type='radio'
              name='mode'
              className='radio'
              value='analogicComplement'
              id='analogicComplement'
            />
            <label htmlFor='analogicComplement'>analogic complement</label>{' '}
            <input
              checked={this.state.mode === 'triad'}
              onChange={this.changeMode}
              type='radio'
              name='mode'
              className='radio'
              value='triad'
              id='triad'
            />
            <label htmlFor='triad'>triad</label>{' '}
            <input
              checked={this.state.mode === 'quad'}
              onChange={this.changeMode}
              type='radio'
              name='mode'
              className='radio'
              value='quad'
              id='quad'
            />
            <label htmlFor='quad'>quad</label>{' '}
          </form>
        </div>
      );
    } else {
      radioButton = '';
    }

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
                onClick={() => this.selectUpload(upload)}
              />
            </CloudinaryContext>
          </div>
        );
      });
    } else {
      uploads = <p className='noUploadDataHeader'>No Upload Data...</p>;
    }
    return (
      <div className='userProfileUploadPage'>
        <div className='userProfileName'>
          <h1>{this.props.user.firstName}'s Uploads</h1>
        </div>
        <div className='userProfileUploadImages'>{uploads}</div>
        <div className='userProfileRecommendationRadioButtons'>
          {radioButton}
        </div>
        <div className='userProfileRecommendationBoxOutputs'>
          {selectedUpload}
        </div>
        <button onClick={this.props.logout}>Logout</button>
      </div>
    );
  }
}

export default UserProfile;
