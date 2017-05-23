import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Featured from './Featured';
import Form from './Form';
import Triangle from './Triangle';
import Filters from './Filters';
import Overlay from './Overlay';

export default class Main extends Component {
   static propTypes = {
    addVideo: PropTypes.func.isRequired,
    videos: PropTypes.array.isRequired
  }

  renderTriangles = () => {
    return this.props.videos.map((video) => {
      return <Triangle key={video.id} video={video} />
    })
  }

  render() {
    return (
      <div className="main">
        <Featured />
        <Form addVideo={this.props.addVideo} />
        
        <div className="triangles">
          {this.renderTriangles()}
        </div>

        <Filters />
        <Overlay />
      </div>
    );
  }
}
