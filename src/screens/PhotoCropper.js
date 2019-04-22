/** @format */

import React, { Component, createRef } from 'react';
import { View, Button, ImageEditor, Alert } from 'react-native';

import styles from '../styles/styles';
import Cropper from '../components/Cropper';
import { inject, observer } from 'mobx-react/native';

@inject(stores => ({ photoStore: stores.root.photoStore }))
@observer
export default class PhotoCropper extends Component {
    static navigationOptions = {
        title: 'Crop Photo',
    };

    constructor(props) {
        super(props);
        this.cropperRef = createRef();
    }

    cropImage() {
        const { photoStore, navigation } = this.props;
        const bounds = this.cropperRef.current.bounds;
        ImageEditor.cropImage(
            photoStore.getUri(),
            {
                offset: { x: bounds.x, y: bounds.y },
                size: { width: bounds.width, height: bounds.height },
            },
            result => {
                photoStore.setUri(result, 'cropped');
                navigation.navigate('PhotoPreview');
            },
            error => Alert.alert('Something was wrong', error)
        );
    }

    render() {
        const { photoStore } = this.props;
        return (
            <View style={[styles.column]}>
                <Cropper ref={this.cropperRef} source={photoStore.getUri()} />

                <View style={{ margin: 20 }}>
                    <Button title="Preview" onPress={() => this.cropImage()} />
                </View>
            </View>
        );
    }
}
