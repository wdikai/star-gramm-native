/** @format */

import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

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
    preview: {
        paddingTop: 50,
        // backgroundColor: 'black',
    },
});

export default class PhotoPreview extends Component {
    constructor(props) {
        super(props);
        this.state = { uri: null };
    }

    componentWillMount() {
        this.setState({ uri: this.props.navigation.getParam('uri', null) });
    }

    render() {
        return (
            <View
                style={[styles.container, styles.center, localStyles.preview]}>
                <Cropper source={this.state.uri} />
                <View style={localStyles.backButton}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}>
                        <Text style={localStyles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
