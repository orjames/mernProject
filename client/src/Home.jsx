import React, { Component } from 'react';
import Images from './Images';
import Buttons from './Buttons';
import WakeUp from './WakeUp';
import Recommendations from './Recommendations';
import Notifications, { notify } from 'react-notify-toast';
import WidgetFooter from './WidgetFooter';
import DataVis from './DataVis';
import Spinner from './Spinner';
import { API_URL } from './config';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie } from '@fortawesome/free-solid-svg-icons';

const toastColor = {
  background: '#ff0000',
  text: '#fff',
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      images: [],
      cloudColors: [],
      loading: false,
    };
  }

  toast = notify.createShowQueue();

  // Extracting the files to be uploaded out of the DOM and shipping them off to our server in a fetch request.
  // updates the state of our application
  // to show that something is happening (spinner) or show the images when they come back successfully.
  onChange = (e) => {
    const errs = [];
    const files = Array.from(e.target.files);

    // limits user to only upload one image
    if (files.length > 1) {
      const msg = 'Only 1 image can be uploaded at a time';
      return this.toast(msg, 'custom', 2000, toastColor);
    }

    const formData = new FormData();
    const types = ['image/png', 'image/jpeg', 'image/gif'];

    files.forEach((file, i) => {
      // filtering to make sure correct image format sent through
      if (types.every((type) => file.type !== type)) {
        errs.push(`'${file.type}' is not a supported format`);
      }

      // filtering by file size
      if (file.size > 21000000) {
        errs.push(`'${file.name}' is too large, please pick a smaller file`);
      }

      formData.append(i, file);
    });

    if (errs.length) {
      return errs.forEach((err) => this.toast(err, 'custom', 2000, toastColor));
    }

    this.setState({ uploading: true });

    fetch(`${API_URL}/image-upload`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((images) => {
        this.setState({
          uploading: false,
          images,
        });
      })
      .catch((err) => {
        this.toast(err.message, 'custom', 2000, toastColor);
        this.setState({ uploading: false });
      });
  };

  // This allows us to pull images off the DOM and put the application back in the state where we can upload more images.
  //  Its also helpful to deal with errors that happen in the application. More on that below.
  filter = (id) => {
    return this.state.images.filter((image) => image.public_id !== id);
  };

  removeImage = (id) => {
    this.setState({ images: this.filter(id), cloudColors: [] });
  };

  onError = (id) => {
    this.toast('Oops, something went wrong', 'custom', 2000, toastColor);
    this.setState({ images: this.filter(id) });
  };

  // button to initiate cloudinary analysis of colors
  getPhotoData = () => {
    axios
      .get(`/index/cloudinary-data/${this.state.images[0].public_id}`)
      .then((res) => {
        this.setState({
          cloudColors: res.data.colors,
        });
      });
  };

  // Adding data vis array to state
  DataVis = (data) => {
    this.setState({
      DataVis: [data],
    });
  };

  render() {
    const { loading, uploading, images } = this.state;
    let uploadButton;
    const content = () => {
      switch (true) {
        case loading:
          return <WakeUp />;
        case uploading:
          return <Spinner />;
        case images.length > 0:
          return (
            <Images
              images={images}
              removeImage={this.removeImage}
              onError={this.onError}
            />
          );
        default:
          return <Buttons onChange={this.onChange} />;
      }
    };
    if (this.state.images.length > 0 && this.state.cloudColors.length < 1) {
      uploadButton = (
        <button className='buttonStyle' onClick={this.getPhotoData}>
          <FontAwesomeIcon icon={faChartPie} size='1x' color='#f5f5f5' /> get
          data
        </button>
      );
    } else {
      uploadButton = null;
      // no image uploaded
    }
    let recommendations;
    if (this.state.cloudColors.length > 0) {
      recommendations = (
        <Recommendations
          logout={this.logout}
          user={this.props.user}
          publicId={this.state.images[0].public_id}
          cloudColors={this.state.cloudColors}
        />
      );
    } else {
      recommendations = '';
    }

    let contents;
    if (this.props.user) {
      contents = (
        <div>
          <div className='uploadWidget'>
            <Notifications />
            <div className='buttons'>{content()}</div>
            <WidgetFooter />
          </div>
          <div className='getDataButtonDiv'>{uploadButton}</div>
          <DataVis cloudColors={this.state.cloudColors} className='DataVis' />
          {recommendations}
        </div>
      );
    } else {
      contents = (
        <>
          <h1>not logged in</h1>
        </>
      );
    }

    return <div className='App'>{contents}</div>;
  }
}

export default Home;
