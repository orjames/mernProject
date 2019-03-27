import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploads: [],
      currentUpload: { colors: [] },
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
    this.setState({ uploads: this.filter(id), currentUpload: { colors: [] } });
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
      currentRec: this.state.colorRec[e.target.value],
    });
  };

  render() {
    let selectedUpload;
    if (Object.keys(this.state.currentUpload).length > 1) {
      selectedUpload = <p>select an upload</p>;
    } else {
      // selectedUpload = this.state.currentUpload.colorRec.complement.colors;
      // selectedUpload
      //   .filter((color) => {
      //     return color !== null;
      //   })
      //   .map((color, index) => {
      //     return (
      //       <>
      //         <div className='radioButtonDiv'>
      //           <form>
      //             <input
      //               checked={this.state.mode === 'monochrome'}
      //               onChange={this.changeMode}
      //               type='radio'
      //               name='mode'
      //               value='monochrome'
      //             />
      //             monochrome{'  '}
      //             <input
      //               checked={this.state.mode === 'monochromeDark'}
      //               onChange={this.changeMode}
      //               type='radio'
      //               name='mode'
      //               value='monochromeDark'
      //             />
      //             monochrome-dark{'  '}
      //             <input
      //               checked={this.state.mode === 'monochromeLight'}
      //               onChange={this.changeMode}
      //               type='radio'
      //               name='mode'
      //               value='monochromeLight'
      //             />
      //             monochrome-light{'  '}
      //             <input
      //               checked={this.state.mode === 'analogic'}
      //               onChange={this.changeMode}
      //               type='radio'
      //               name='mode'
      //               value='analogic'
      //             />
      //             analogic{'  '}
      //             <input
      //               checked={this.state.mode === 'complement'}
      //               onChange={this.changeMode}
      //               type='radio'
      //               name='mode'
      //               value='complement'
      //             />
      //             complement{'  '}
      //             <input
      //               checked={this.state.mode === 'analogicComplement'}
      //               onChange={this.changeMode}
      //               type='radio'
      //               name='mode'
      //               value='analogicComplement'
      //             />
      //             analogic-complement{'  '}
      //             <input
      //               checked={this.state.mode === 'triad'}
      //               onChange={this.changeMode}
      //               type='radio'
      //               name='mode'
      //               value='triad'
      //             />
      //             triad{'  '}
      //             <input
      //               checked={this.state.mode === 'quad'}
      //               onChange={this.changeMode}
      //               type='radio'
      //               name='mode'
      //               value='quad'
      //             />
      //             quad
      //           </form>
      //         </div>
      //         <div className='colorRecsList' key={index}>
      //           <div className='imageColor'>
      //             <Image
      //               className='colorCircle'
      //               src={color.image.bare}
      //               roundedCircle
      //             />
      //           </div>
      //           <h3 className='compleColorName'>{color.name.value}</h3>
      //           <small className='compleColorHex'>{color.hex.value}</small>
      //         </div>
      //       </>
      //     );
      //   });
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
      <div className='uploadList'>
        <h1 className='userData'>
          {this.props.user.firstName}'s Uploads
          <br />
          <small>user._id is {this.props.user._id}</small>
        </h1>
        <h1 className='uploadHeader'>All uploads</h1>
        {uploads}
        {selectedUpload}
        <Button
          variant='primary'
          size='medium'
          value='logout'
          onClick={this.props.logout}
        >
          Logout
        </Button>
      </div>
    );
  }
}

export default UserProfile;
