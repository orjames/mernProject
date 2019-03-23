import React, { Component } from 'react';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import UserProfile from './UserProfile';
import axios from 'axios';
// image function stuff below
import Spinner from './Spinner';
import Images from './Images';
import Buttons from './Buttons';
import WakeUp from './WakeUp';
import Footer from './Footer';
import { API_URL } from './config';
import Notifications, { notify } from 'react-notify-toast';
// image function stuff above

const toastColor = {
  background: '#505050',
  text: '#fff',
};

class App extends Component {
  // if you refresh the browser, you lose the state, so we save token in both state and local storage
  // token determines if the user is logged in, will send that token to the back-end every time we need
  // to query the API, as long as that's there, the express JWT module will allow you to access the routes
  // rate limited will make it so you can't attempt to login unsuccessfully many times before it locks you out
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      user: null,
      errorMessage: '',
      lockedResult: '',
      uploading: false,
      images: [],
      cloudColors: [],
      currentImgURL: '',
    };
    this.liftTokenToState = this.liftTokenToState.bind(this);
    this.checkForLocalToken = this.checkForLocalToken.bind(this);
    this.logout = this.logout.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  checkForLocalToken = () => {
    // look in local storage for the token
    let token = localStorage.getItem('mernToken');
    if (!token || token === 'undefined') {
      // there is no token
      localStorage.removeItem('mernToken');
      this.setState({
        token: '',
        user: null,
      });
    } else {
      // found a token, send it to be verified
      axios.post('/auth/me/from/token', { token }).then((res) => {
        if (res.data.type === 'error') {
          localStorage.removerItem('mernToken');
          this.setState({ errorMessage: res.data.message });
        } else {
          // put token in local storage
          localStorage.setItem('mernToken', res.data.token);
          // put token in state
          this.setState({
            token: res.data.token,
            user: res.data.user,
          });
        }
      });
    }
  };

  componentDidMount() {
    this.checkForLocalToken();
  }

  liftTokenToState = (data) => {
    this.setState({
      token: data.token,
      user: data.user,
    });
  };

  logout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('mernToken');
    // Remove the user and token from state
    this.setState({
      token: '',
      user: null,
    });
  };

  handleClick(e) {
    e.preventDefault();
    // axios.defaults.headers.common['Authorization'] = `Bearer ${
    //   this.state.token
    // }`; // this applies globally to all axios calls, sends token, otherwise do the config below for specific axios call
    let config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    };
    axios.get('/locked/test', config).then((res) => {
      this.setState({
        lockedResult: res.data,
      });
    });
  }

  toast = notify.createShowQueue();
  // image function stuff below
  // Extracting the files to be uploaded out of the DOM and shipping them off to our server in a fetch request.
  // It also allows us to update the state of our application
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
      if (types.every((type) => file.type !== type)) {
        errs.push(`'${file.type}' is not a supported format`);
      }

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
    this.setState({ images: this.filter(id) });
  };

  onError = (id) => {
    this.toast('Oops, something went wrong', 'custom', 2000, toastColor);
    this.setState({ images: this.filter(id) });
  };

  getPhotoData = () => {
    console.log('\x1b[36m%s\x1b[0m', 'click click clikc');
    console.log(this.state.images[0].public_id);
    axios.get(`/index/cloudinary-data/${this.state.images[0].public_id}`);
  };
  // image function stuff above

  render() {
    // image upload stuff below
    const { loading, uploading, images } = this.state;

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
    // image upload stuff above

    let user = this.state.user;
    let contents;
    if (user) {
      contents = (
        <>
          <UserProfile user={user} logout={this.logout} />
          <div className='container'>
            <Notifications />
            <div className='buttons'>{content()}</div>
            <Footer />
          </div>
          <p>
            <button onClick={this.handleClick}>test the protected route</button>
            <button onClick={this.getPhotoData}>Get Data</button>
          </p>
          <p>{this.state.lockedResult}</p>
        </>
      );
    } else {
      contents = (
        <>
          <Signup liftTokenToState={this.liftTokenToState} />
          <Login liftTokenToState={this.liftTokenToState} />
        </>
      );
    }
    return (
      <div className='App'>
        <header>
          <h1>HEADER OF APP</h1>
        </header>
        <div className='contentBox'>{contents}</div>
      </div>
    );
  }
}

export default App;
