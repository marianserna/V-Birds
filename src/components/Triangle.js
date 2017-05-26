import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Triangle extends Component {
  static propTypes = {
    video: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
    pauseMovement: PropTypes.func.isRequired,
    resumeMovement: PropTypes.func.isRequired
  }

  render() {
    return (
      <div
        className="video"
        key={this.props.video.id}
        style={{top: this.props.video.top, left: this.props.video.left}}
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
