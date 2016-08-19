import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './slider.less'


export default class InnerSlider extends Component {
  constructor(props, context) {
    super(props, context);
  }

  /**
   * 设置初始的slide状态,slide宽度,整个的宽度,slideleft的值
   */
  componentDidMount() {
    this.props.slideObj.setState({
      slideWidth: ReactDOM.findDOMNode(this).offsetWidth,
      totalWidth: ReactDOM.findDOMNode(this).offsetWidth * (this.props.children.length+2),
      slideLeft:-ReactDOM.findDOMNode(this).offsetWidth * this.props.currentSlide
    });
    //非循环状态不能自动播放
    if(this.props.isRound){
      this.props.eventHandle.autoplay();
    }

  }

  render() {
    let {children,slideWidth,isRound} = this.props;
    let {swipeStart,swipeEnd,swipeMove} = this.props.eventHandle;
    //循环情况下首尾各加一帧
    let newChildren = isRound?[children[children.length - 1]].concat(children,[children[0]]):children;
    newChildren = newChildren.map((v, k)=> {
      return React.createElement(
        v.type,
        Object.assign({}, v.props, {
          className: 'slider-slider',
          key: k,
          slideWidth: slideWidth,
          style: {width: slideWidth}
        }),
        v.props.children
      );
    });
    let styles = {
      width: this.props.totalWidth,
      transform: 'translate3d('+this.props.slideLeft+'px, 0px, 0px)',
      transition:this.props.transition
    };

    return <div className="slider-tracker"
                onMouseDown={swipeStart.bind(this.props.eventHandle)}
                onMouseMove={swipeMove.bind(this.props.eventHandle)}
                onMouseUp={swipeEnd.bind(this.props.eventHandle)}
      //onMouseLeave={this.state.dragging ? this.swipeEnd : null}
                onTouchStart={swipeStart.bind(this.props.eventHandle)}
                onTouchMove={swipeMove.bind(this.props.eventHandle)}
                onTouchEnd={swipeEnd.bind(this.props.eventHandle)}
                onTouchCancel={swipeEnd.bind(this.props.eventHandle)}
                style={styles.width?styles:null}
    >
      {newChildren}
    </div>
  }

}


