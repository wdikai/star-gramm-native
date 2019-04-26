/** @format */

import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RNCamera } from 'react-native-camera';

import styles from '../styles/styles';

const localStyles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 15,
        left: 15,
    },
    cameraView: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
    },
    takePicture: {
        position: 'absolute',
        bottom: 50,
        flex: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    takePictureButton: {
        alignSelf: 'center',
    },
    buttonShadow: {
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
        padding: 10,

        borderWidth: 1,
        borderColor: 'transparent',
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
                        <Icon
                            name="arrow-left"
                            size={20}
                            style={localStyles.buttonShadow}
                        />
                    </TouchableOpacity>
                </View>
                <View style={localStyles.takePicture}>
                    <TouchableOpacity
                        onPress={() => this.takePicture()}
                        style={localStyles.takePictureButton}>
                        <Icon
                            style={localStyles.buttonShadow}
                            name="circle-thin"
                            size={80}
                        />
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
