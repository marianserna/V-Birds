import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Featured from './Featured';
import Form from './Form';
import Triangle from './Triangle';
import Filters from './Filters';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

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

  render() {
    const actions = [
      <RaisedButton
        label="Close"
        primary={true}
        onTouchTap={this.props.closeModal}
      />
    ]

    const videoChoice = this.props.videoChoice;

    return (
      <MuiThemeProvider>
        <div className="main">
          <Featured featuredVideos={this.props.featuredVideos} />

          <Form addVideo={this.props.addVideo} />

          <div className="triangles">
            {this.renderTriangles()}
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
