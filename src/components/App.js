import React, { Component } from 'react';
import Loader from './Loader';
import Main from './Main';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      videos: [],
      featuredVideos: []
    }
  }

  componentWillMount() {
    setTimeout(() => {
      this.showMain();
    }, 3000);
  }

  showMain = () => {
    this.setState({
      loading: false
    });
  }

  addVideo = (video) => {
    this.setState({
      videos: this.state.videos.concat([video])
    });
  }

  render() {
    if (this.state.loading) {
      return <Loader />;
    }

    return (
      <div className="App">
        <Main addVideo={this.addVideo} videos={this.state.videos} />
      </div>
    );
  }
}
