import React, { Component } from 'react';

import mojs from 'mo-js';
import { TweenLite, TimelineLite } from 'gsap';

export default class Loader extends Component {
  componentDidMount() {
    const COLORS = {
      RED:      '#E94C6F',
      YELLOW:   '#FEDA6A',
      BLACK:    '#0B90AA',
      WHITE:    '#FFFFFF',
      VINOUS:   '#9068BE'
    }

    const bgBurst = new mojs.Burst({
      left: 0, top: 0,
      count:  3,
      radius: 0,
      degree: 0,
      isShowEnd: false,
      children: {
        fill:           [ COLORS.RED, COLORS.WHITE, COLORS.BLACK ],
        radius:         'stagger(200, 2)',
        scale:          { .25 : 4 },
        duration:       500,
        delay:          'stagger(50)',
        easing:         [ 'cubic.out', 'cubic.out', 'cubic.out' ],
        isForce3d:      true,
      }
    });

    const burst1 = new mojs.Burst({
      left: 0, top: 0,
      count:    5,
      radius:   { 50: 250 },
      children: {
        fill:   'white',
        shape:  'line',
        stroke: [ COLORS.WHITE, COLORS.VINOUS ],
        strokeWidth: 12,
        radius: 'rand(30, 60)',
        radiusY: 0,
        scale: { 1: 0 },
        pathScale: 'rand(.5, 1)',
        degreeShift: 'rand(-360, 360)',
        isForce3d: true,
      }
    });

    const burst2 = new mojs.Burst({
      top: 0, left: 0,
      count:  3,
      radius: { 0: 250 },
      children: {
        shape:      [ 'circle', 'rect' ],
        points:     5,
        fill:       [ COLORS.WHITE, COLORS.VINOUS ],
        radius:     'rand(30, 60)',
        scale:      { 1: 0 },
        pathScale:  'rand(.5, 1)',
        isForce3d:  true
      }
    });

    const CIRCLE_OPTS = {
      left: 0, top: 0,
      fill:     COLORS.WHITE,
      scale:    { .2: 1 },
      opacity: { 1: 0 },
      isForce3d: true,
      isShowEnd: false
    }

    const circle1 = new mojs.Shape({
      ...CIRCLE_OPTS,
      radius:   200,
    });

    const circle2 = new mojs.Shape({
      ...CIRCLE_OPTS,
      radius:   240,
      easing: 'cubic.out',
      delay: 150,
    });

    const halfWidth = window.innerWidth / 2;
    const halfHeight = window.innerHeight / 2;

    burst1
    .tune({ x: halfWidth, y: halfHeight })
    .generate()
    .replay();

    burst2
    .tune({ x: halfWidth, y: halfHeight })
    .generate()
    .replay();

    circle1
    .tune({ x: halfWidth, y: halfHeight })
    .replay();

    circle2
    .tune({ x: halfWidth, y: halfHeight })
    .replay();

    bgBurst
    .tune({ x: halfWidth, y: halfHeight })
    .replay();

    const tl = new TimelineLite();
    tl.fromTo('h1', 1, {opacity: 0}, {opacity: 1});
    tl.fromTo('h1', 1, {color: '#9068BE'}, {color: COLORS.YELLOW});
    tl.play();
  }

  componentWillLeave(callback) {
    TweenLite.fromTo(this.loader, 0.2, {opacity: 1}, {opacity: 0, onComplete: callback});
  }

  render() {
    return (
      <div className="loader" ref={div => this.loader = div}>
        <h1>V - BIRDS</h1>
      </div>
    );
  }
}
