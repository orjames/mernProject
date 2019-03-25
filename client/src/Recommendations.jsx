import React, {Component} from 'react';
import axios from 'axios';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shakespeare: ""
    }
  }

  componentDidMount() {
    let poemApi = 'http://shakeitspeare.com/api/poem';
    // fetch a poem
    axios.get(poemApi).then( response => {
      // set state
      this.setState{shakespeare: response.data}
    }).catch(err => console.log(err))
  }

  render() {
    let poetry = this.state.shakespeare;
    if (this.state.shakespeare){
      return (
        <div>
          <h1>My favorite Shakespeare poem:</h1>
          {poetry}
        </div>
      )
    }
    return (
      <div>
        <h1>My favorite Shakespeare poem:</h1>
        Loading...
      </div>
    )
 }
}