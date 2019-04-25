/** @format */

import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import { action } from 'mobx';
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

@inject(stores => ({ photoStore: stores.root.photoStore }))
@observer
export default class Camera extends Component {
    async takePicture() {
        if (this.camera) {
            const { photoStore, navigation } = this.props;
            const options = { quality: 1 };
            const data = await this.camera.takePictureAsync(options);
            const uri = data.uri || `data:image/png;base64,${data.base64}`;
            photoStore.setUri(uri);
            navigation.navigate('PhotoCropper');
        }
    }

    async componentWillUnmount() {
        await this.props.photoStore.removeAllFiles();
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
                        onPress={() => this.props.navigation.goBack()}>
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
        const { photoStore } = this.props;
        if (!photoStore.hasCameraPermission) {
            return <Text>No access to camera</Text>;
        } else {
            return this.cameraView();
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
                onStatusChange={event =>
                    this.props.photoStore.changePermission(event.cameraStatus)
                }
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
}
