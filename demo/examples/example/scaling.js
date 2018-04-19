import React from 'react';
import AwesomeSlider from '../../../src/components/scale-out-animation';
import AwsSliderStyles from '../../../src/components/scale-out-animation/styles.scss';
import AwesomeFrame from '../../../src/components/react-awesome-frame';
import AwsFrameStyles from '../../../src/components/react-awesome-frame/styles.scss';
import { shadeRGBColor } from '../../helpers/examples';
import {
  features,
  properties,
} from '../common';

function resetSlider(slider) {
  clearTimeout(window.transitionUpdateTimer);
  const divs = slider.currentSlide.querySelectorAll('div');
  const color = getComputedStyle(divs[0]).backgroundColor;
  slider.element.style.setProperty('--transition-bezier', 'cubic-bezier(0.45, 0, 0.2, 1)');
  slider.element.style.setProperty('--slider-transition-duration', '770ms');
  slider.element.style.setProperty('--organic-arrow-color', shadeRGBColor(color, -0.2));
  slider.element.style.setProperty('--control-bullet-active-color', shadeRGBColor(color, -0.2));
  slider.element.style.setProperty('--control-bullet-color', color);
  slider.element.style.setProperty('--organic-arrow-thickness', '6px');
  slider.element.style.setProperty('--organic-arrow-height', '30px');
  window.setElement(slider.element);
}

function transitionStart(slider) {
  const divs = slider.nextSlide.querySelectorAll('div');
  const color = getComputedStyle(divs[0]).backgroundColor;
  window.transitionUpdateTimer = setTimeout(() => {
    slider.element.style.setProperty('--control-bullet-active-color', shadeRGBColor(color, -0.15));
    slider.element.style.setProperty('--control-bullet-color', color);
  }, 400);
}

function transitionEnd(slider) {
  const divs = slider.currentSlide.querySelectorAll('div');
  const color = getComputedStyle(divs[0]).backgroundColor;
  slider.element.style.setProperty('--organic-arrow-color', shadeRGBColor(color, -0.15));
  window.setElement(slider.element);
}

const startupScreen = (
  <div style={{ backgroundColor: '#EFEFEF' }}>
    <img
      alt="south park"
      src="/images/series/south-park-loader.png"
    />
  </div>
);

const component = (
  <div>
    <AwesomeFrame
      cssModule={AwsFrameStyles}
      title="Comedy Central's South Park"
    >
      <AwesomeSlider
        name="images"
        cssModule={AwsSliderStyles}
        organicArrows
        startupScreen={startupScreen}
        firstMount={resetSlider}
        onResetSlider={resetSlider}
        transitionStart={transitionStart}
        transitionEnd={transitionEnd}
      >
        <div
          style={{ backgroundColor: '#a3b9d0' }}
          data-src="/images/series/south-park-1.jpg"
        />
        <div
          style={{ backgroundColor: '#f46b34' }}
          data-src="/images/series/south-park-2.jpg"
        />
        <div
          style={{ backgroundColor: '#d63b6b' }}
          data-src="/images/series/south-park-3.jpg"
        />
        <div
          style={{ backgroundColor: '#fcd0a8' }}
          data-src="/images/series/south-park-0.jpg"
        />
      </AwesomeSlider>
    </AwesomeFrame>
  </div>);

const example = {
  title: 'Scale Animation',
  items: [],
  component,
  componentClass: AwsSliderStyles['aws-sld'],
};

export default {
  features,
  example,
  module,
  properties,
};
