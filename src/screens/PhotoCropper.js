/** @format */

import React, { Component, createRef } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    View,
    Button,
    ImageEditor,
    Alert,
} from 'react-native';

import styles from '../styles/styles';
import Cropper from '../components/Cropper';

const localStyles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 15,
        left: 15,
    },
    backButtonText: {
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 10,
    },
    nextButton: {
        position: 'absolute',
        bottom: 50,
    },
    preview: {
        paddingTop: 75,
        paddingBottom: 75,
        backgroundColor: 'black',
    },
});

export default class PhotoCropper extends Component {
    constructor(props) {
        super(props);
        this.state = { uri: null };
        this.cropperRef = createRef();
    }

    componentWillMount() {
        this.setState({ uri: this.props.navigation.getParam('uri', null) });
    }

    cropImage() {
        const bounds = this.cropperRef.current.bounds;
        ImageEditor.cropImage(
            this.state.uri,
            {
                offset: { x: bounds.x, y: bounds.y },
                size: { width: bounds.width, height: bounds.height },
            },
            result => {
                console.log('cropImage', result);

                this.props.navigation.navigate('PhotoPreview', {
                    originalUri: this.state.uri,
                    croppedUri: result,
                });
            },
            error => Alert.alert('Something was wrong', error)
        );
    }

    render() {
        return (
            <View
                style={[styles.container, styles.center, localStyles.preview]}>
                <Cropper ref={this.cropperRef} source={this.state.uri} />
                <View style={localStyles.backButton}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}>
                        <Text style={localStyles.backButtonText}>
                            &lt; Back
                        </Text>
                    </TouchableOpacity>
                </View>

                <Button
                    title="Preview"
                    style={localStyles.nextButton}
                    onPress={() => this.cropImage()}
                />
            </View>
        );
    }
}
