import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { TweenLite } from 'gsap';

export default class Triangle extends Component {
  static propTypes = {
    video: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
    pauseMovement: PropTypes.func.isRequired,
    resumeMovement: PropTypes.func.isRequired
  }

  componentWillEnter(callback) {
    TweenLite.fromTo(this.video, 1, {scaleX: 0.1, scaleY: 0.1,}, {scaleX: 1, scaleY: 1, onComplete: callback});
  }

  render() {
    return (
      <div
        className="video"
        key={this.props.video.id}
        style={{top: this.props.video.top, left: this.props.video.left}}
        ref={div => this.video = div}
      >
        <img
          src={this.props.video.image_url}
          alt="video"
          onClick={(e) => this.props.openModal(this.props.video)}
          onMouseEnter={this.props.pauseMovement}
          onMouseLeave={this.props.resumeMovement}
        />
      </div>
    );
  }
}
