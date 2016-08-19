import ReactTransitionEvents from 'react/lib/ReactTransitionEvents';
import ReactDOM from 'react-dom';

export default class EventHandle {
    constructor(obj){
        this.totalSlide = obj.props.children.length;
        console.log(obj.props.children.length);
        this.startX = 0;
        this.endX = 0;
        this.listWidth = 0;
        this.minSwipe = 0;
        this.isJump = true;
        this.slideChange = false;
        this.sliderObj = obj;

    }
    /**
     * 自动轮播
     */
    autoplay() {
        let that = this;
        if (that.sliderObj.props.autoplay) {
            if (that.timer) {
                clearTimeout(that.timer);
            }
            that.timer = setInterval(()=> {
                that.slideChange = false;
                if (!that.sliderObj.state.isSlide) {
                    that.slideChange = true;
                    this.sliderObj.props.beforeChange();
                    that.sliderObj.setState({
                        slideLeft: -that.sliderObj.state.currentSlide * that.sliderObj.state.slideWidth - that.sliderObj.state.slideWidth,
                        currentSlide: that.sliderObj.state.currentSlide + 1,
                        transition: 'transform 300ms ease-in'
                    });
                    if (that.sliderObj.state.currentSlide == (that.totalSlide + 1)) {
                        setTimeout(()=> {
                            that.sliderObj.setState({
                                slideLeft: -that.sliderObj.state.slideWidth,
                                transition: 'transform 0ms ease-out',
                                currentSlide: 1
                            });
                        }, 300)
                    }
                }
            }, 3000)
        }
    }

    /**
     * 开始滑动
     * @param e 事件
     */
    swipeStart(e) {
        this.slideChange = false;
        this.startX = e.touches !== undefined ? e.touches[0].pageX : e.clientX;
    }

    /**
     * 滑动结束
     */
    swipeEnd() {
        this.listWidth = this.sliderObj.state.slideWidth;
        this.minSwipe = this.sliderObj.state.slideWidth / this.sliderObj.props.children.length;
        let des = this.endX - this.startX;
        //非循环的情况
        if (!this.sliderObj.props.isRound) {
            if (this.isJump) {
                //←非循环情况的左滑动
                if (Math.abs(des) > this.minSwipe && des < 0) {
                    this.slideChange = true;
                    this.sliderObj.props.beforeChange();
                    this.sliderObj.setState({
                        slideLeft: -this.sliderObj.state.currentSlide * this.listWidth - this.listWidth,
                        currentSlide: this.sliderObj.state.currentSlide + 1,
                        transition: 'transform 300ms ease-out',
                        isSlide: false
                    });
                } else if (Math.abs(des) > this.minSwipe && des > 0) {  //→非循环情况的右滑动
                    this.slideChange = true;
                    this.sliderObj.props.beforeChange();

                    this.sliderObj.setState({
                        slideLeft: -this.sliderObj.state.currentSlide * this.listWidth + this.listWidth,
                        transition: 'transform 300ms ease-out',
                        currentSlide: this.sliderObj.state.currentSlide - 1,
                        isSlide: false
                    });
                } else {
                    this.sliderObj.setState({
                        slideLeft: -this.sliderObj.state.currentSlide * this.listWidth,
                        transition: 'transform 200ms ease-out',
                        isSlide: false
                    });
                }
            }

        } else {  //循环
            //←循环情况的左滑动
            if (Math.abs(des) > this.minSwipe && des < 0) {
                this.slideChange = true;
                this.sliderObj.props.beforeChange();

                this.sliderObj.setState({
                    slideLeft: -this.sliderObj.state.currentSlide * this.listWidth - this.listWidth,
                    currentSlide: this.sliderObj.state.currentSlide + 1,
                    transition: 'transform 300ms ease-out',
                    isSlide: false
                });
                //当到最右边的时候自动跳到第一帧,无动画
                if (this.sliderObj.state.currentSlide == this.totalSlide) {
                    this.sliderObj.setState({
                        currentSlide: 1
                    });
                    setTimeout(()=> {
                        this.sliderObj.setState({
                            slideLeft: -this.listWidth,
                            transition: 'transform 0ms ease-out'
                        });
                    }, 300)
                }
            } else if (Math.abs(des) > this.minSwipe && des > 0) { //→循环情况的右滑动
                this.slideChange = true;
                this.sliderObj.props.beforeChange();

                this.sliderObj.setState({
                    slideLeft: -this.sliderObj.state.currentSlide * this.listWidth + this.listWidth,
                    transition: 'transform 300ms ease-out',
                    currentSlide: this.sliderObj.state.currentSlide - 1,
                    isSlide: false
                });
                //currentSlide不会即使改变,所以判断条件是1
                if (this.sliderObj.state.currentSlide == 1) {
                    this.sliderObj.setState({
                        currentSlide: this.totalSlide
                    });
                    setTimeout(()=> {
                        this.sliderObj.setState({
                            slideLeft: -(this.totalSlide + 1) * this.listWidth + this.listWidth,
                            transition: 'transform 0ms ease-out',
                            isSlide: false
                        });
                    }, 300)
                }
            } else {
                //滑动距离太小,位置不变
                this.sliderObj.setState({
                    slideLeft: -this.sliderObj.state.currentSlide * this.listWidth,
                    transition: 'transform 200ms ease-out',
                    isSlide: false
                });
            }
        }
        //回调方法
        let callback = () => {
            if (this.sliderObj.props.afterChange && this.slideChange) {
                this.sliderObj.props.afterChange();
            }
            ReactTransitionEvents.removeEndEventListener(ReactDOM.findDOMNode(this.sliderObj), callback);
        };

        ReactTransitionEvents.addEndEventListener(ReactDOM.findDOMNode(this.sliderObj), callback);

    }

    /**
     * 开始滑动
     * @param e 事件
     */
    swipeMove(e) {
        this.endX = e.touches !== undefined ? e.touches[0].pageX : e.clientX;
        if (this.sliderObj.state.currentSlide === 0 && (this.endX >= this.startX)) {
            this.isJump = false;
        }
        if (this.sliderObj.props.isRound) {
            this.isJump = true;
            this.sliderObj.setState({
                slideLeft: -this.sliderObj.state.currentSlide * this.sliderObj.state.slideWidth + this.endX - this.startX,
                isSlide: true
            });
        } else if (this.sliderObj.state.currentSlide === 0 && (this.endX >= this.startX)) {
            this.isJump = false;
        } else if (this.sliderObj.state.currentSlide === (this.totalSlide - 1) && (this.endX <= this.startX)) {
            this.isJump = false;
        } else {
            this.isJump = true;
            this.sliderObj.setState({
                slideLeft: -this.sliderObj.state.currentSlide * this.sliderObj.state.slideWidth + this.endX - this.startX,
                isSlide: true
            });
        }


    }

    /**
     * 获取当前位置
     * @returns {{this.startX: number}}
     */
    getPostion() {
        return {startX: this.startX};
    }
}
