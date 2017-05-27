import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Form extends Component {
  static propTypes = {
    addVideo: PropTypes.func.isRequired,
  }

  constructor() {
    super();

    this.state = {
      videoType: 'motion',
      displayForm: false
    }
  }

  handleChange = (e) => {
    this.setState({
      videoType: e.target.value
    });
  }

  randomize(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  postToEndpoint = (e) => {
    console.log('calling');
    e.preventDefault();

    fetch('https://creative-showcase-api.herokuapp.com/videos', {
     method: 'post',
     headers: new Headers({
       'Content-Type': 'application/json'
     }),
     body: JSON.stringify({
       'vimeo_url': this.url.value,
       'video_type': this.state.videoType
     })
   }).then(response => response.json()).then((video) => {
      video.top = this.randomize(0, window.innerHeight - 180);
      video.left = this.randomize(0, window.innerWidth - 300);
      video.seed = this.randomize(0, 1000);
      this.props.addVideo(video);
    });
  }

  allowSubmission = (e) => {
    e.preventDefault();
    this.setState({
      displayForm: true
    })
  }

  render() {
    if (!this.state.displayForm) {
      return (
        <div className="form-container">
          <div className="form-trigger" ref={(div) => this.formTrigger = div} onClick={(e) => this.allowSubmission(e)}>
            <p>SUBMIT</p>
          </div>
        </div>
      )
    }

    return (
      <div className="form-container">
        <div className="form" ref={(div) => this.form = div}>
          <form ref={(form) => this.form = form} onSubmit={(e) => {this.postToEndpoint(e)}} className="contact-form">

            <div className="input-row">
              <span className="input-wrapper">
                <input className="input-field" type="url" id="url" name="url" placeholder="Vimeo URL" required ref={(input) => this.url = input} />
              </span>
            </div>

            <div className="input-row">
               <span className="input-wrapper">
                 <select name="type" value={this.props.videoType} onChange={this.handleChange} id="type">
                   <option value="motion">motion</option>
                   <option value="vr">vr</option>
                   <option value="interactive">interactive</option>
                 </select>
               </span>
            </div>

            <div className="input-container">
              <button className="form-share">SHARE</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
