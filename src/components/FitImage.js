/** @format */

import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Component } from 'react';
import { Image, StyleSheet, View, ActivityIndicator } from 'react-native';

type FitImageProps = {
    originalHeight?: number,
    originalWidth?: number,
};

type FitImageState = {
    layoutWidth: number,
    originalHeight: number,
    originalWidth: number,
};

const propTypes = {
    ...Image.propTypes,
    originalHeight: PropTypes.number,
    originalWidth: PropTypes.number,
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default class FitImage extends Component<FitImageProps, FitImageState> {
    constructor(props) {
        super(props);

        this.style = StyleSheet.flatten(props.style);

        if (this.style) {
            const size = [this.style.width, this.style.height];

            if (size.filter(Boolean).length === 1) {
                throw new Error(
                    'Props error: size props must be present ' +
                        'none or both of width and height.'
                );
            }

            if (this.style.width) {
                this.sizeStyle = { width: this.style.width };
            } else {
                this.sizeStyle = { flexGrow: 1 };
            }
        }

        const originalSize = [props.originalWidth, props.originalHeight];
        if (originalSize.filter(Boolean).length === 1) {
            throw new Error(
                'Props error: originalSize props must be present ' +
                    'none or both of originalWidth and originalHeight.'
            );
        }

        this.state = {
            isLoading: false,
            layoutWidth: 0,
            originalHeight: 0,
            originalWidth: 0,
        };
    }

    componentDidMount() {
        this.mounted = true;

        if (this.props.originalWidth && this.props.originalHeight) {
            return;
        }

        this.fetchOriginalSizeFromRemoteImage();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return (
            <View>
                {this.state.isLoading && (
                    <ActivityIndicator
                        style={[
                            this.style,
                            this.sizeStyle,
                            { height: this.getHeight() },
                            styles.container,
                        ]}
                    />
                )}
                <Image
                    {...this.props}
                    onLayout={event => this.onLayout(event)}
                    source={this.props.source}
                    style={[
                        this.style,
                        this.sizeStyle,
                        { height: this.getHeight() },
                        styles.container,
                    ]}
                />
            </View>
        );
    }

    getHeight() {
        if (this.style && this.style.height) {
            return Number(this.style.height);
        }

        return Math.round(this.getOriginalHeight() * this.getRatio());
    }

    getOriginalHeight() {
        return this.props.originalHeight || this.state.originalHeight || 0;
    }

    getOriginalWidth() {
        return this.props.originalWidth || this.state.originalWidth || 0;
    }

    getRatio() {
        if (this.getOriginalWidth() === 0) {
            return 0;
        }

        return this.state.layoutWidth / this.getOriginalWidth();
    }

    onLayout(event) {
        const { width: layoutWidth } = event.nativeEvent.layout;

        this.setState({ layoutWidth });
    }

    fetchOriginalSizeFromRemoteImage() {
        let uri;

        if (this.props.source instanceof Array) {
            uri = this.props.source[0].uri;
        } else {
            uri = this.props.source.uri;
        }

        if (!uri) {
            return;
        }

        Image.getSize(
            uri,
            (originalWidth, originalHeight) => {
                if (!this.mounted) {
                    return;
                }

                this.setOriginalSize(originalWidth, originalHeight);
            },
            () => null
        );
    }

    setOriginalSize(originalWidth, originalHeight) {
        this.setState({
            originalHeight,
            originalWidth,
        });
    }
}

FitImage.propTypes = propTypes;
