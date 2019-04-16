/** @format */

import React, { Component } from 'react';
import { StyleSheet, View, PanResponder, Animated } from 'react-native';

import styles from '../styles/styles';
import FitImage from '../components/FitImage';

const localStyles = StyleSheet.create({
    cropperWindow: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 1)',
    },
    pin: {
        position: 'absolute',
        width: 15,
        height: 15,
        backgroundColor: 'rgba(0, 0, 0, 1)',
    },
    area: {
        height: '100%',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    topLeft: {
        top: 0,
        left: 0,
    },
    topRight: {
        top: 0,
        right: 0,
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
    },
    bottomRight: {
        bottom: 0,
        right: 0,
    },
});

function middleValue(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export default class Cropper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: null,
            width: 0,
            height: 0,
            aspectRatio: props.aspectRatio || 1,
        };

        this.position = {
            top: 50,
            left: 50,
            right: 50,
            bottom: 50,
        };
        this.lastKnownPosition = { ...this.position };
    }

    get width() {
        return this.state.width;
    }

    get height() {
        return this.state.height;
    }

    setImage(image) {
        this.image = image;
        if (image) {
            this.position.top = this.position.bottom = 0;
            this.position.left = this.position.right =
                (image.layoutWidth -
                    image.layoutHeight * this.state.aspectRatio) /
                2;
            this.lastKnownPosition = { ...this.position };
            this.setState({
                width: image.layoutWidth,
                height: image.layoutHeight,
            });
        }
    }

    setCropper(crop) {
        this.crop = crop;
        if (crop) crop.setNativeProps({ style: this.position });
    }

    componentWillMount() {
        this.areaResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: this.moveArea.bind(this),
            onPanResponderRelease: this.setLastKnownAreaPosition.bind(this),
            onPanResponderTerminate: this.setLastKnownAreaPosition.bind(this),
        });
        this.topLeftResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: this.moveLeftTop.bind(this),
            onPanResponderRelease: this.setLastKnownLeftTop.bind(this),
            onPanResponderTerminate: this.setLastKnownLeftTop.bind(this),
        });
        this.topRightResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: this.moveRightTop.bind(this),
            onPanResponderRelease: this.setLastKnownRightTop.bind(this),
            onPanResponderTerminate: this.setLastKnownRightTop.bind(this),
        });
        this.bottomLeftResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: this.moveLeftBottom.bind(this),
            onPanResponderRelease: this.setLastKnownLeftBottom.bind(this),
            onPanResponderTerminate: this.setLastKnownLeftBottom.bind(this),
        });
        this.bottomRightResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: this.moveRightBottom.bind(this),
            onPanResponderRelease: this.setLastKnownRightBottom.bind(this),
            onPanResponderTerminate: this.setLastKnownRightBottom.bind(this),
        });
    }

    componentDidMount() {
        setTimeout(() => this.forceUpdate(), 5000);
    }

    moveArea(e, gestureState) {
        const { dx, dy } = gestureState;
        const left = this.lastKnownPosition.left + dx;
        const top = this.lastKnownPosition.top + dy;
        const right = this.lastKnownPosition.right - dx;
        const bottom = this.lastKnownPosition.bottom - dy;
        this.setLeft(left);
        this.setTop(top);
        this.setRight(right);
        this.setBottom(bottom);
        this.crop.setNativeProps({ style: this.position });
    }

    moveLeftTop(e, gestureState) {
        const { dx, dy } = gestureState;
        const left = this.lastKnownPosition.left + dx;
        const top = this.lastKnownPosition.top + dy;
        this.setLeft(left);
        this.setTop(top);
        this.crop.setNativeProps({ style: this.position });
    }

    moveLeftBottom(e, gestureState) {
        const { dx, dy } = gestureState;
        const left = this.lastKnownPosition.left + dx;
        const bottom = this.lastKnownPosition.bottom - dy;
        this.setLeft(left);
        this.setBottom(bottom);
        this.crop.setNativeProps({ style: this.position });
    }

    moveRightTop(e, gestureState) {
        const { dx, dy } = gestureState;
        const right = this.lastKnownPosition.right - dx;
        const top = this.lastKnownPosition.top + dy;
        this.setRight(right);
        this.setTop(top);
        this.crop.setNativeProps({ style: this.position });
    }

    moveRightBottom(e, gestureState) {
        const { dx, dy } = gestureState;
        const right = this.lastKnownPosition.right - dx;
        const bottom = this.lastKnownPosition.bottom - dy;
        this.setRight(right);
        this.setBottom(bottom);
        this.crop.setNativeProps({ style: this.position });
    }

    setLastKnownLeftTop(e, gestureState) {
        this.lastKnownPosition.left += gestureState.dx;
        this.lastKnownPosition.top += gestureState.dy;
    }

    setLastKnownLeftBottom(e, gestureState) {
        this.lastKnownPosition.left += gestureState.dx;
        this.lastKnownPosition.bottom -= gestureState.dy;
    }

    setLastKnownRightTop(e, gestureState) {
        this.lastKnownPosition.right -= gestureState.dx;
        this.lastKnownPosition.top += gestureState.dy;
    }

    setLastKnownRightBottom(e, gestureState) {
        this.lastKnownPosition.right -= gestureState.dx;
        this.lastKnownPosition.bottom -= gestureState.dy;
    }

    setLastKnownAreaPosition(e, gestureState) {
        this.lastKnownPosition.left += gestureState.dx;
        this.lastKnownPosition.top += gestureState.dy;
        this.lastKnownPosition.right -= gestureState.dx;
        this.lastKnownPosition.bottom -= gestureState.dy;
    }

    setLeft(left) {
        if (left <= 0) {
            this.position.left = 0;
        } else if (left >= this.width - this.position.right) {
            this.position.left = this.width - this.position.right;
        } else {
            this.position.left = left;
        }
    }

    setTop(top) {
        if (top <= 0) {
            this.position.top = 0;
        } else if (top >= this.height - this.position.bottom) {
            this.position.top = this.height - this.position.bottom;
        } else {
            this.position.top = top;
        }
    }

    setRight(right) {
        if (right <= 0) {
            this.position.right = 0;
        } else if (right >= this.width - this.position.left) {
            this.position.right = this.width - this.position.left;
        } else {
            this.position.right = right;
        }
    }

    setBottom(bottom) {
        if (bottom <= 0) {
            this.position.bottom = 0;
        } else if (bottom >= this.height - this.position.top) {
            this.position.bottom = this.height - this.position.top;
        } else {
            this.position.bottom = bottom;
        }
    }

    render() {
        return (
            <View style={[styles.container]}>
                <FitImage
                    onResize={image => this.setImage(image)}
                    source={{ uri: this.props.source }}
                />
                <View
                    style={{
                        position: 'absolute',
                        width: this.state.width,
                        height: this.state.height,
                    }}>
                    {!!this.state.height && (
                        <Animated.View
                            ref={crop => this.setCropper(crop)}
                            style={[localStyles.cropperWindow]}>
                            <View
                                style={[localStyles.area]}
                                {...this.areaResponder.panHandlers}
                            />
                            <View
                                style={[localStyles.pin, localStyles.topLeft]}
                                {...this.topLeftResponder.panHandlers}
                            />
                            <View
                                style={[localStyles.pin, localStyles.topRight]}
                                {...this.topRightResponder.panHandlers}
                            />
                            <View
                                style={[
                                    localStyles.pin,
                                    localStyles.bottomLeft,
                                ]}
                                {...this.bottomLeftResponder.panHandlers}
                            />
                            <View
                                style={[
                                    localStyles.pin,
                                    localStyles.bottomRight,
                                ]}
                                {...this.bottomRightResponder.panHandlers}
                            />
                        </Animated.View>
                    )}
                </View>
            </View>
        );
    }
}
