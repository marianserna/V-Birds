import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Form extends Component {
  static propTypes = {
    addVideo: PropTypes.func.isRequired,
  }

  constructor() {
    super();

    this.state = {
      videoType: 'motion'
    }
  }

  handleChange = (e) => {
    this.setState({
      videoType: e.target.value
    });
  }

  postToEndpoint = (e) => {
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
      this.props.addVideo(video);
    });
  }


  render() {
    return (
      <div className="form">
        <form ref={(form) => this.form = form} onSubmit={(e) => {this.postToEndpoint(e)}} className="contact-form">

          <div className="input-row">
            <span className="input-wrapper">
              <input className="input-field" type="url" id="url" name="url" placeholder="Vimeo URL" required ref={(input) => this.url = input} />
            </span>
          </div>

         <div className="input-row">
           <span className="input-wrapper">
             <select name="type" value={this.props.videoType} onChange={this.handleChange} id="type">
               <option value="motion">MOTION</option>
               <option value="vr">VR</option>
               <option value="interactive">INTERACTIVE</option>
             </select>
           </span>
         </div>

         <div className="input-container">
            <button type="submit">SHARE</button>
          </div>
        </form>
      </div>
    );
  }
}
