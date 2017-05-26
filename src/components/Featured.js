import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Featured extends Component {
  static propTypes = {
    featuredVideos: PropTypes.array.isRequired,
  }

  constructor() {
    super();

    this.state = {
      displayFeatured: false
    }
  }

  renderFeaturedVideos = () => {
    return this.props.featuredVideos.map((featuredVideo) => {
      return(
        <div className="featured-video" key={featuredVideo.id}>
          <a href={`https://vimeo.com/${featuredVideo.vimeo_id}`}>
            <img src={featuredVideo.image_url} alt="featured video"/>
          </a>
        </div>
      )
    });
  }

  slideFeaturedInOut = (e) => {
    this.setState({
      displayFeatured:  !this.state.displayFeatured
    });
  }

  render() {
    return (
      <div className={`featured-container ${this.state.displayFeatured ? 'featured-container-slide' : ''}`}>
        <div className="featured-videos">
          {this.renderFeaturedVideos()}
        </div>
        <div className="featured-trigger" onClick={(e) => this.slideFeaturedInOut(e)} >
          <p>FEATURED</p>
        </div>
      </div>
    );
  }
}
