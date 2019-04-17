/** @format */

import React, { Component } from 'react';
import { StyleSheet, View, PanResponder, Animated } from 'react-native';

import styles from '../styles/styles';
import FitImage from '../components/FitImage';

const localStyles = StyleSheet.create({
    cropperWindow: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
        borderColor: 'rgba(0, 0, 0, 1)',
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

class CropperArea {
    constructor(rectangle, options = {}) {
        this.rectangle = rectangle;
        this.previousRectangle = { ...rectangle };
        this.sourceImage = null;
        this.container = null;
        this.options = options;
    }

    get x() {
        return this.rectangle.x;
    }

    get y() {
        return this.rectangle.y;
    }

    get width() {
        return this.rectangle.width;
    }

    get height() {
        return this.rectangle.height;
    }

    set x(value) {
        this.rectangle.x = middleValue(
            value,
            0,
            this.container.width - this.rectangle.width
        );
    }

    set y(value) {
        this.rectangle.y = middleValue(
            value,
            0,
            this.container.height - this.rectangle.height
        );
    }

    set width(value) {
        this.rectangle.width = middleValue(
            value,
            this.options.minCropperWidth,
            this.container.width - this.rectangle.x
        );
    }

    set height(value) {
        this.rectangle.height = middleValue(
            value,
            this.options.minCropperHeight,
            this.container.height - this.rectangle.y
        );
    }

    setPosition({ x, y }) {
        this.x = x;
        this.y = y;
        this.previousRectangle = { ...this.rectangle };
    }

    setSize({ width, height }) {
        this.width = width;
        this.height = height;
        this.previousRectangle = { ...this.rectangle };
    }

    setBounds(bounds) {
        this.setPosition(bounds);
        this.setSize(bounds);
    }

    move({ dx = 0, dy = 0 }) {
        const x = this.previousRectangle.x + dx;
        const y = this.previousRectangle.y + dy;
        this.x = middleValue(x, 0, this.container.width - this.rectangle.width);
        this.y = middleValue(
            y,
            0,
            this.container.height - this.rectangle.height
        );
    }

    resize({ dx = 0, dy = 0 }) {
        const width = this.previousRectangle.width + dx;
        const height = this.previousRectangle.height + dy;
        this.width = width;
        this.height = height;
    }

    fixBounds() {
        const min = Math.min(this.width, this.height);
        this.width = min * this.options.aspectRatio;
        this.height = this.width / this.options.aspectRatio;
    }

    toImageBounds() {
        const rate = this.sourceImage.originalWidth / this.container.width;

        return {
            x: Math.round(this.x * rate),
            y: Math.round(this.y * rate),
            width: Math.round(this.width * rate),
            height: Math.round(this.height * rate),
        };
    }

    toStyle() {
        return {
            left: this.rectangle.x,
            top: this.rectangle.y,
            width: this.rectangle.width,
            height: this.rectangle.height,
        };
    }
}

export default class Cropper extends Component {
    constructor(props) {
        super(props);
        const aspectRatio = props.aspectRatio || 4 / 3;
        const minCropperWidth = props.minWidth || 50;
        const minCropperHeight = Math.floor(minCropperWidth / aspectRatio);
        this.state = {
            uri: null,
            width: 0,
            height: 0,
            aspectRatio,
        };

        this.cropper = new CropperArea(
            { x: 0, y: 0, width: minCropperWidth, height: minCropperHeight },
            { minCropperWidth, minCropperHeight, aspectRatio }
        );
    }

    get bounds() {
        return this.cropper.toImageBounds();
    }

    setImage(image) {
        this.image = image;
        if (image) {
            const container = {
                width: image.layoutWidth,
                height: image.layoutHeight,
            };
            this.cropper.sourceImage = image;
            this.cropper.container = container;
            this.cropper.setSize(container);
            this.cropper.fixBounds();
            this.cropper.setPosition({
                x: (container.width - this.cropper.width) / 2,
                y: (container.height - this.cropper.height) / 2,
            });
            this.setState(container);
        }
    }

    setCropper(crop) {
        this.crop = crop;
        if (crop) crop.setNativeProps({ style: this.cropper.toStyle() });
    }

    componentWillMount() {
        this.areaResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: this.moveArea.bind(this),
            onPanResponderRelease: this.stopMoving.bind(this),
            onPanResponderTerminate: this.stopMoving.bind(this),
        });
        this.topLeftResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: this.moveLeftTopBorder.bind(this),
            onPanResponderRelease: this.stopMoving.bind(this),
            onPanResponderTerminate: this.stopMoving.bind(this),
        });
        this.topRightResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: this.moveRightTopBorder.bind(this),
            onPanResponderRelease: this.stopMoving.bind(this),
            onPanResponderTerminate: this.stopMoving.bind(this),
        });
        this.bottomLeftResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: this.moveLeftBottomBorder.bind(this),
            onPanResponderRelease: this.stopMoving.bind(this),
            onPanResponderTerminate: this.stopMoving.bind(this),
        });
        this.bottomRightResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: this.moveRightBottomBorder.bind(this),
            onPanResponderRelease: this.stopMoving.bind(this),
            onPanResponderTerminate: this.stopMoving.bind(this),
        });
    }

    componentDidMount() {
        setTimeout(() => this.forceUpdate(), 5000);
    }

    moveArea(e, gestureState) {
        const { dx, dy } = gestureState;
        this.cropper.move({ dx, dy });
        this.crop.setNativeProps({ style: this.cropper.toStyle() });
    }

    moveLeftTopBorder(e, gestureState) {
        const { dx, dy } = gestureState;
        this.cropper.move({ dx, dy });
        this.cropper.resize({ dx: -dx, dy: -dy });
        this.cropper.fixBounds();
        this.crop.setNativeProps({ style: this.cropper.toStyle() });
    }

    moveRightTopBorder(e, gestureState) {
        const { dx, dy } = gestureState;
        this.cropper.move({ dy });
        this.cropper.resize({ dx: dx, dy: -dy });
        this.cropper.fixBounds();
        this.crop.setNativeProps({ style: this.cropper.toStyle() });
    }

    moveLeftBottomBorder(e, gestureState) {
        const { dx, dy } = gestureState;
        this.cropper.move({ dx });
        this.cropper.resize({ dx: -dx, dy: dy });
        this.cropper.fixBounds();
        this.crop.setNativeProps({ style: this.cropper.toStyle() });
    }

    moveRightBottomBorder(e, gestureState) {
        const { dx, dy } = gestureState;
        this.cropper.resize({ dx, dy: dy });
        this.cropper.fixBounds();
        this.crop.setNativeProps({ style: this.cropper.toStyle() });
    }

    stopMoving() {
        this.cropper.setBounds(this.cropper.rectangle);
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
