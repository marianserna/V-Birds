import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Filters extends Component {
  static propTypes = {
   getFilteredVideos: PropTypes.func.isRequired,
 }

  render() {
    return (
      <div className="filters">
        <div className="video-filter" onClick={(e) => {this.props.getFilteredVideos('motion')}}>
          <p>motion</p>
          <img src="/filterDot.svg" alt="filter"/>
        </div>
        <div className="video-filter" onClick={(e) => {this.props.getFilteredVideos('vr')}}>
          <p>vr</p>
          <img src="/filterDot.svg" alt="filter"/>
        </div>
        <div className="video-filter" onClick={(e) => {this.props.getFilteredVideos('interactive')}}>
          <p>interactive</p>
          <img src="/filterDot.svg" alt="filter"/>
        </div>
      </div>
    );
  }
}
