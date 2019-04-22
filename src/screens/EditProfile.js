/** @format */

import React, { Component } from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    Button,
    TouchableOpacity,
    Text,
    Alert,
} from 'react-native';
import { inject, observer } from 'mobx-react/native';
import ImagePicker from 'react-native-image-picker';

import styles from '../styles/styles';
import FitImage from '../components/FitImage';
import FormField from '../components/FormField';

const localStyles = StyleSheet.create({
    container: {
        padding: 5,
    },
    avatar: {
        width: 50,
        height: 50,
    },
});

@inject(stores => ({ profileStore: stores.root.profileStore }))
@observer
export default class EditProfile extends Component {
    async componentWillMount() {
        await this.props.profileStore.fetchProfile();
    }

    changeAvatar() {
        ImagePicker.showImagePicker(
            {
                title: 'Select photo',
                mediaType: 'photo',
                quality: 1,
                storageOptions: { skipBackup: true },
            },
            response => {
                if (response.didCancel) return;
                if (response.error) {
                    return Alert.alert('Something was wrong');
                }

                this.props.profileStore.setAvatar(response.uri);
            }
        );
    }

    render() {
        const profileStore = this.props.profileStore;
        return (
            <ScrollView style={[styles.container, localStyles.container]}>
                <View style={[styles.row, styles.center]}>
                    <TouchableOpacity onPress={() => this.changeAvatar()}>
                        {!!profileStore.avatar ? (
                            <FitImage
                                source={profileStore.avatar}
                                style={localStyles.avatar}
                            />
                        ) : (
                            <Text>A</Text>
                        )}
                    </TouchableOpacity>
                </View>
                <View>
                    <FormField
                        field={profileStore.form.$('name').bind()}
                        error={profileStore.form.$('name').error}
                    />
                    <FormField
                        field={profileStore.form.$('fullName').bind()}
                        error={profileStore.form.$('fullName').error}
                    />
                    <FormField
                        field={profileStore.form.$('bio').bind()}
                        error={profileStore.form.$('bio').error}
                    />
                    <FormField
                        field={profileStore.form.$('email').bind()}
                        error={profileStore.form.$('email').error}
                    />

                    <Button
                        onPress={profileStore.form.onSubmit}
                        title="Submit"
                    />
                    <Text>{JSON.stringify(profileStore.user, null, 4)}</Text>
                </View>
            </ScrollView>
        );
    }
}
