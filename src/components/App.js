import React, { Component } from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup'

import Loader from './Loader';
import Main from './Main';

import { Howl } from 'howler';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      videos: [],
      featuredVideos: [],
      filter: '',
      movement: true,
      videoChoice: null
    }
  }

  componentDidMount() {
    this.sound = new Howl({
      src: ['/africanLionSafari.mp3'],
      loop: true,
      volume: 0.3,
    });
  }

  componentWillMount() {
    setTimeout(() => {
      this.showMain();
      this.sound.play();
    }, 2500);

    this.getAllVideos();
    this.getFeaturedVideos();
  }

  showMain = () => {
    this.setState({
      loading: false
    });
  }

  addVideo = (video) => {
    this.setState({
      videos: this.state.videos.concat(video)
    });
  }

  getAllVideos = () => {
    fetch('https://creative-showcase-api.herokuapp.com/videos', {
      method: 'get'
    }).then(response => response.json()).then((videos) => {
      this.positionAllVideos(videos);
      this.floatyVideos();
    });
  }

  getFeaturedVideos = () => {
    fetch('https://creative-showcase-api.herokuapp.com/videos/featured', {
      method: 'get'
    }).then(response => response.json()).then((videos) => {
      this.setState({
        featuredVideos: videos
      })
    });
  }

  getFilteredVideos = (filter) => {
    this.setState({
      filter: filter
    });


    fetch(`https://creative-showcase-api.herokuapp.com/videos/${filter}`, {
      method: 'get'
    }).then(response => response.json()).then((videos) => {
      this.positionAllVideos(videos);
    });
  }

  randomize(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  positionAllVideos = (videos) => {
    const newVideos = videos.map((video) => {
      const videoCopy = {...video};
      videoCopy.top = this.randomize(0, window.innerHeight - 180);
      videoCopy.left = this.randomize(0, window.innerWidth - 300);
      videoCopy.seed = this.randomize(0, 1000);
      return videoCopy;
    });

    this.setState({
      videos: newVideos
    });
  }

  floatyVideos = () => {
    if (this.state.movement) {
      const newVideos = this.state.videos.map((video) => {
        const videoCopy = {...video};
        videoCopy.left -= 2;
        videoCopy.top += Math.sin((new Date().getTime() / 1000) + videoCopy.seed) * 1;
        if (videoCopy.left < -300) {
          videoCopy.left = window.innerWidth + 20;
        }
        return videoCopy;
      });
      this.setState({
        videos: newVideos
      });
    }
    requestAnimationFrame(this.floatyVideos);
  }

  pauseMovement = () => {
    this.setState({
      movement: false
    })
  }

  resumeMovement = () => {
    this.setState({
      movement: true
    })
  }

  openModal = (video) => {
    this.setState({
      videoChoice: video,
      movement: false
    });
    this.sound.pause();
  }

  closeModal = () => {
    this.setState({
      videoChoice: null,
      movement: true
    });
    // this.sound.play();
  }

  render() {
    return (
      <TransitionGroup>
        {this.state.loading && <Loader />}
        {
          !this.state.loading &&
          <Main
            addVideo={this.addVideo}
            videos={this.state.videos}
            featuredVideos={this.state.featuredVideos}
            getFilteredVideos={this.getFilteredVideos}
            videoChoice={this.state.videoChoice}
            closeModal={this.closeModal}
            openModal={this.openModal}
            pauseMovement={this.pauseMovement}
            resumeMovement={this.resumeMovement}
          />
        }
      </TransitionGroup>
    );
  }
}
