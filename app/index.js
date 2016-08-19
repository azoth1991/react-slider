import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import Slider from './Slider'

/**
 * autoplay 是否自动播放
 * isRound 是否循环
 * @type {{autoplay: boolean, isRound: boolean}}
 */
let settings1 = {
    autoplay:true,
    isRound:true,
    beforeChange:()=>{console.log('beforeChangebanner')},
    afterChange:()=>{console.log('afterChangebanner')}
};
let settings2 = {
    autoplay:false,
    isRound:false,
    beforeChange:()=>{console.log('beforeChangemain')},
    afterChange:()=>{console.log('afterChangemain')}
};



render(
    <div>
        <Slider {...settings1}>
            <li><a href="http://www.baidu.com"><img src="http://d6.yihaodianimg.com/TEST/M07/2D/D2/CqGQP1ekE8OAeZVPAAGjD0rNdJc80000_1068x226.jpg" alt=""/></a></li>
            <li><a href="http://www.baidu.com"><img src="http://pic.sc.chinaz.com/files/pic/pic9/201508/apic14052.jpg" alt=""/></a></li>
        </Slider>
        <Slider {...settings2}>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
        </Slider>
    </div>
    ,
    document.getElementById('root')
);
