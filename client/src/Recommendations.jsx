
import React, { Component } from 'react';
import axios from 'axios';
import ColorList from './ColorList';
import ModeSelector from './ModeSelector';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import UserProfile from './UserProfile';

class Recommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorRec: {
        monochrome: [],
        monochromeDark: [],
        monochromeLight: [],
        analogic: [],
        complement: [],
        analogicComplement: [],
        triad: [],
        quad: [],
      },
      currentRec: { colors: [] },
      mode: 'complement',
      modes: {},
    };
    this.saveRecommendations = this.saveRecommendations.bind(this);
    this.changeMode = this.changeMode.bind(this);
  }

  // when the component mounts, it looks at the primary color and then recommends complementary ones
  componentDidMount() {
    const modes = [
      'monochrome',
      'monochrome-dark',
      'monochrome-light',
      'analogic',
      'complement',
      'analogic-complement',
      'triad',
      'quad',
    ];
    let primaryColorHex = this.props.cloudColors[0][0];
    while (primaryColorHex.charAt(0) === '#') {
      primaryColorHex = primaryColorHex.substr(1);
    }
    // fetch a color complementary color thing
    const getRequests = modes.map((mode) => {
      return axios.get(
        `http://www.thecolorapi.com/scheme?hex=${primaryColorHex}&format=json&mode=${mode}&count=6`
      );
    });
    axios
      .all(getRequests)
      .then(
        axios.spread(
          (
            monochrome,
            monochromeDark,
            monochromeLight,
            analogic,
            complement,
            analogicComplement,
            triad,
            quad
          ) => {
            let colorRecs = {
              monochrome: monochrome.data,
              monochromeDark: monochromeDark.data,
              monochromeLight: monochromeLight.data,
              analogic: analogic.data,
              complement: complement.data,
              analogicComplement: analogicComplement.data,
              triad: triad.data,
              quad: quad.data,
            };
            this.setState({
              colorRec: colorRecs,
              currentRec: colorRecs.complement,
            });
          }
        )
      )
      .catch((err) => console.log(err));
  }

  postUpload = (object) => {
    axios
      .post(`/profile/${object.userId}/uploads`, {
        publicId: object.publicId,
        cloudColors: object.cloudColors,
        colorRec: object.colorRec,
        date: object.date,
      })
      .then((res) => {
        console.log(res);
        this.props.history.push(`profile/${this.props.user._id}`);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // populates the object to be sent to the back-end to post the database
  saveRecommendations = () => {
    let date = new Date();
    let postObject = {
      userId: this.props.user._id,
      publicId: this.props.publicId,
      cloudColors: this.props.cloudColors,
      colorRec: this.state.colorRec,
      date: date,
    };
    this.postUpload(postObject);
  };

  changeMode = (e) => {
    this.setState({
      mode: e.target.value,
      currentRec: this.state.colorRec[e.target.value],
    });
  };

  render() {
    if (Object.keys(this.state.colorRec).length > 0) {
      return (
        <div>
          <div className='userProfileRecommendationRadioButtons'>
            <ModeSelector mode={this.state.mode} changeMode={this.changeMode} />
          </div>
          <ColorList mode={this.state.mode} colorRec={this.state.currentRec} />

          <Router>
            <div className='addToProfileButtonDiv'>
              <button onClick={this.saveRecommendations}>
                {' '}
                Add to Profile
              </button>
            </div>
          </Router>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }
  }
}

export default withRouter(Recommendations);

