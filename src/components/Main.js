import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransitionGroup from 'react-transition-group/TransitionGroup'

import Featured from './Featured';
import Form from './Form';
import Triangle from './Triangle';
import Filters from './Filters';
import Flying from './Flying';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import { TweenLite } from 'gsap';
import mojs from 'mo-js';


// Shape 'heart' will be used for heart function
class Heart extends mojs.CustomShape {
  getShape () {
    return '<path d="M73.6170213,0 C64.4680851,0 56.5957447,5.53191489 51.7021277,13.8297872 C50.8510638,15.3191489 48.9361702,15.3191489 48.0851064,13.8297872 C43.4042553,5.53191489 35.3191489,0 26.1702128,0 C11.9148936,0 0,14.0425532 0,31.2765957 C0,48.0851064 14.893617,77.8723404 47.6595745,99.3617021 C49.1489362,100.212766 50.8510638,100.212766 52.1276596,99.3617021 C83.8297872,78.5106383 99.787234,48.2978723 99.787234,31.2765957 C100,14.0425532 88.0851064,0 73.6170213,0 L73.6170213,0 Z"></path>';
  }
}

mojs.addShape( 'heart', Heart );

export default class Main extends Component {
   static propTypes = {
    addVideo: PropTypes.func.isRequired,
    videos: PropTypes.array.isRequired,
    featuredVideos: PropTypes.array.isRequired,
    getFilteredVideos: PropTypes.func.isRequired,
    videoChoice: PropTypes.object,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    pauseMovement: PropTypes.func.isRequired,
    resumeMovement: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.flying = new Flying(this.container);
  }

  componentWillEnter(callback) {
    TweenLite.fromTo(this.main, 1, {opacity: 0}, {opacity: 1, onComplete: callback});
  }

  renderTriangles = () => {
    return this.props.videos.map((video) => {
      return <Triangle
        key={video.id}
        video={video}
        openModal={this.props.openModal}
        pauseMovement={this.props.pauseMovement}
        resumeMovement={this.props.resumeMovement}
      />
    })
  }

  heart = (e) => {
    e.preventDefault();

    fetch(`https://creative-showcase-api.herokuapp.com/videos/${this.props.videoChoice.id}/heart`, {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });

    const removeEl = function removeEl (node) { node.parentNode.removeChild(node); }

    // http://mojs.io/tutorials/burst/ and https://github.com/legomushroom/mojs/issues/11 (remove onComplete)
    const CIRCLE_RADIUS = 20;
    const RADIUS = 32;
    const circle = new mojs.Shape({
      left: 0, top: 0,
      stroke:   { '#E5214A' : '#CC8EF5' },
      strokeWidth: { [2*CIRCLE_RADIUS] : 0 },
      fill:       'none',
      scale:      { 0: 1 },
      radius:     CIRCLE_RADIUS,
      duration:   400,
      easing:     'cubic.out',
      onComplete: function () { removeEl(this.el); }
    });

    circle.el.style.zIndex = 2000;
    console.log(e.target);

    const burst = new mojs.Burst({
      left: 0, top: 0,
      radius:   { 4: RADIUS },
      angle:    45,
      count:    14,
      timeline: { delay: 300 },
      children: {
        radius:       2.5,
        fill:   [
          { '#9EC9F5' : '#9ED8C6' },
          { '#91D3F7' : '#9AE4CF' },

          { '#DC93CF' : '#E3D36B' },
          { '#CF8EEF' : '#CBEB98' },

          { '#87E9C6' : '#1FCC93' },
          { '#A7ECD0' : '#9AE4CF' },

          { '#87E9C6' : '#A635D9' },
          { '#D58EB3' : '#E0B6F5' },

          { '#F48BA2' : '#CF8EEF' },
          { '#91D3F7' : '#A635D9' },

          { '#CF8EEF' : '#CBEB98' },
          { '#87E9C6' : '#A635D9' },
        ],
        scale:        { 1: 0, easing: 'quad.in' },
        pathScale:    [ .8, null ],
        degreeShift:  [ 13, null ],
        duration:     [ 500, 700 ],
        easing:       'quint.out',
        onComplete: function () { removeEl(this.el); }
      }
    });

    burst.el.style.zIndex = 2000;

    const heart = new mojs.Shape({
      left: 0, top: 0,
      shape:    'heart',
      fill:     '#E5214A',
      scale:    { 0 : 1 },
      easing:   'elastic.out',
      duration: 1000,
      delay:    300,
      radius:   11,
      onComplete: function () { removeEl(this.el); }
    });

    heart.el.style.zIndex = 2000;

    // where is the heart located? - Ask div what is bounding box -> returns an object with top, left, right, bottom
    // this is to position the mojs heart on top of the white heart: by moving its left and top, it will place it right on top

    const rect = e.target.getBoundingClientRect();
    const coords = { x: rect.left + (e.target.offsetWidth / 2), y: rect.top + (e.target.offsetHeight / 2) };
    burst
    .tune(coords)
    .replay();

    circle
    .tune( coords )
    .replay();

    heart
    .tune( coords )
    .replay();
  }

  render() {
    const actions = [
      <RaisedButton
        label="Close"
        primary={true}
        onTouchTap={this.props.closeModal}
      />,
    <div className="heart" onClick={(e) => this.heart(e)}>
        <img src="/heart.svg" alt="heart"/>
      </div>
    ]

    const videoChoice = this.props.videoChoice;

    return (
      <MuiThemeProvider>
        <div className="main" ref={div => this.main = div}>

          <div className="container" ref={(div) => this.container = div}></div>

          <Featured featuredVideos={this.props.featuredVideos} />

          <Form addVideo={this.props.addVideo} />

          <div className="triangles">
            <TransitionGroup>
              {this.renderTriangles()}
            </TransitionGroup>
          </div>

          <Filters getFilteredVideos={this.props.getFilteredVideos}/>

          <Dialog
            title={videoChoice ? videoChoice.title : ''}
            actions={actions}
            bodyStyle={{backgroundColor:'#FEDA6A'}}
            actionsContainerClassName='modal'
            modal={false}
            open={videoChoice ? true : false}
            onRequestClose={this.props.closeModal}
          >
            {
              videoChoice ?
              <div className="video-container">
                <div className="play-video">
                  <div className="embed-container">
                    <iframe src={`https://player.vimeo.com/video/${videoChoice.vimeo_id}?color=3e7287&title=0&byline=0&portrait=0`}
                      frameBorder="0"
                      title={videoChoice.title}
                    >
                    </iframe>
                  </div>

                </div>
                <div className="like"></div>
              </div>
              : ''
            }
          </Dialog>

        </div>
      </MuiThemeProvider>
    );
  }
}
