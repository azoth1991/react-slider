import React, {Component} from 'react'
import Dots from './Dots'
import './slider.less'
import EventHandle from './EventHandle'
import InnerSlider from './InnerSlider'

/**
 * 轮播插件
 * autoplay boolean 是否自动轮播
 * isRound 轮播页是否循环(循环的时候不支持autoplay)
 */
export default class Slider extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      slideWidth: 0,
      totalWidth:0,
      slideLeft:0,
      currentSlide:this.props.isRound?1:0,
      isSlide:false,
      transition:'transform 100ms ease-out'
    };
    this.offsetWidth = 0;
    this.event = new EventHandle(this);
  }


  render() {
    let {children,isRound} = this.props;

    return <div className="slider">
      <div className="slider-list">
        <InnerSlider isRound={isRound} eventHandle = {this.event} currentSlide={this.state.currentSlide} className="slider-tracker" totalWidth={this.state.totalWidth} slideWidth={this.state.slideWidth} slideLeft={this.state.slideLeft} transition={this.state.transition} slideObj={this}>
          {children}
        </InnerSlider>
        <Dots/>
      </div>
    </div>;
  }

}


