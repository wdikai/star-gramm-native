/** @format */

import React, { Component } from 'react';
import { View, Button } from 'react-native';

import styles from '../styles/styles';
import FitImage from '../components/FitImage';
import { inject, observer } from 'mobx-react/native';

@inject(stores => ({ photoStore: stores.root.photoStore }))
@observer
export default class PhotoPreview extends Component {
    static navigationOptions = {
        title: 'Preview',
    };

    render() {
        const { photoStore } = this.props;
        return (
            <View style={[styles.container]}>
                <View style={{ width: '100%' }}>
                    <FitImage source={{ uri: photoStore.getUri('cropped') }} />
                </View>

                <View style={{ margin: 20 }}>
                    <Button
                        title="Next"
                        onPress={() =>
                            this.props.navigation.navigate('PostCreate')
                        }
                    />
                </View>
            </View>
        );
    }
}
