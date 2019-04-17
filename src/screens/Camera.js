/** @format */

import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

import styles from '../styles/styles';

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
    cameraView: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
    },
    takePicture: {
        position: 'absolute',
        bottom: 0,
        flex: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    takePictureButton: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});

export default class Camera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: true,
            focusedScreen: true,
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('willFocus', () => {
            this.setState({ focusedScreen: true });
        });
        navigation.addListener('willBlur', () =>
            this.setState({ focusedScreen: false })
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={[
                        localStyles.cameraView,
                        styles.container,
                        styles.center,
                    ]}>
                    {this.renderCamera()}
                </View>
                <View style={localStyles.backButton}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Feed')}>
                        <Text style={localStyles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={localStyles.takePicture}>
                    <TouchableOpacity
                        onPress={() => this.takePicture()}
                        style={localStyles.takePictureButton}>
                        <Text style={{ fontSize: 14 }}> SNAP </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderCamera() {
        const { hasCameraPermission, focusedScreen } = this.state;
        if (!hasCameraPermission) {
            return <Text>No access to camera</Text>;
        } else if (focusedScreen) {
            return this.cameraView();
        } else {
            return <View />;
        }
    }

    cameraView() {
        return (
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    width: '100%',
                }}
                onStatusChange={event => this.changePermission(event)}
                type={RNCamera.Constants.Type.back}
                ratio="3:4"
                captureAudio={false}
                flashMode={RNCamera.Constants.FlashMode.on}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            />
        );
    }

    async takePicture() {
        if (this.camera) {
            const options = { quality: 1 /*, base64: true */ };
            const data = await this.camera.takePictureAsync(options);
            console.log('Camera takePicture data:');
            console.log(data);
            console.log('========================');
            this.props.navigation.navigate('PhotoCropper', {
                uri: data.uri || `data:image/png;base64,${data.base64}`,
            });
        }
    }

    changePermission(event) {
        console.log('change permission', event.cameraStatus);
        this.setState({ hasCameraPermission: event.cameraStatus === 'READY' });
    }
}
