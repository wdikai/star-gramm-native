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
import FitImage from '../components/FitImage';

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
    preview: {
        paddingTop: 75,
        paddingBottom: 75,
        backgroundColor: 'black',
    },
});

export default class PhotoPreview extends Component {
    constructor(props) {
        super(props);
        this.state = { uri: null };
    }

    componentWillMount() {
        this.setState({
            originalUri: this.props.navigation.getParam('originalUri', null),
            uri: this.props.navigation.getParam('croppedUri', null),
        });
    }

    render() {
        return (
            <View
                style={[styles.container, styles.center, localStyles.preview]}>
                <View style={[styles.container]}>
                    <FitImage source={{ uri: this.state.uri }} />
                </View>
                <View style={localStyles.backButton}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}>
                        <Text style={localStyles.backButtonText}>
                            &lt; Back
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
