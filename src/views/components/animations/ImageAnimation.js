/*
* (The MIT License)
* Copyright (c) 2015-2016 YunJiang.Fang <42550564@qq.com>
*/
'use strict';

import React, {PropTypes} from 'react';
import {Image} from 'react-native';
var TimerMixin = require('react-timer-mixin');

module.exports = React.createClass({
    propTypes: {
        animationImages : PropTypes.array.isRequired,
        animationRepeatCount : PropTypes.number,
        animationDuration : PropTypes.number,
    },
    mixins: [TimerMixin],
    getInitialState: function() {
        return {
            imageIndex: 0,
        };
    },
    componentDidMount: function() {
        this.animationRepeatCount = this.props.animationRepeatCount||0;
        this.onAnimationDone = this.props.onAnimationDone || function(){}
        this.intervalId = this.setInterval(
            ()=>{
                var imageIndex = this.state.imageIndex+1;
                if (imageIndex >= this.props.animationImages.length) {
                    imageIndex = 0;
                    const isFinal = this.animationRepeatCount != 0 ? this.animationRepeatCount == 1 : false;
                    this.onAnimationDone(isFinal);

                    if (this.animationRepeatCount === 1) {
                        this.onAnimationDone(true);
                        this.clearInterval(this.intervalId);
                        return;
                    }
                    this.animationRepeatCount--;

                }
                this.setState({imageIndex:imageIndex})

            }, this.props.animationDuration||1000);
        },
    render: function() {
        return (
            <Image
                {...this.props}
                source={this.props.animationImages[this.state.imageIndex]}/>
        );
    }
});
