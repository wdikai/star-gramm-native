/** @format */

import React, { Component } from 'react';
import {
    KeyboardAvoidingView,
    View,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';

import FitImage from '../components/FitImage';
import FormField from '../components/FormField';
import { inject, observer } from 'mobx-react/native';

@inject(stores => ({ photoStore: stores.root.photoStore }))
@observer
export default class PostCreate extends Component {
    static navigationOptions = {
        title: 'New post',
    };

    render() {
        const { photoStore } = this.props;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    behavior="position"
                    enabled
                    contentContainerStyle={{ justifyContent: 'flex-end' }}>
                    <View style={{ width: '100%' }}>
                        <FitImage
                            source={{ uri: photoStore.getUri('cropped') }}
                        />
                    </View>

                    <FormField
                        field={photoStore.form.$('description').bind()}
                        error={photoStore.form.$('description').error}
                        multiline
                        numberOfLines={5}
                    />
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        );
    }
}
