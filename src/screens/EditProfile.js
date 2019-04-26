/** @format */

import React, { Component } from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
    Keyboard,
    Button,
} from 'react-native';
import { inject, observer } from 'mobx-react/native';
import ImagePicker from 'react-native-image-picker';

import styles from '../styles/styles';
import logout from '../actions/logout';
import FitImage from '../components/FitImage';
import FormField from '../components/FormField';
import EditProfileHeader from '../components/EditProfileHeader';

const localStyles = StyleSheet.create({
    container: {
        padding: 5,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
    },
});

@inject(stores => ({ profileStore: stores.root.profileStore }))
@observer
export default class EditProfile extends Component {
    static navigationOptions({ navigation }) {
        return {
            headerTitle: (
                <EditProfileHeader
                    profileStore={navigation.getParam('profileStore')}
                />
            ),
        };
    }

    componentWillMount() {
        const { navigation, profileStore } = this.props;
        navigation.setParams({ profileStore });
        profileStore.fetchProfile();
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
        const { profileStore, navigation } = this.props;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <View style={localStyles.container}>
                        <View style={[styles.row, styles.center]}>
                            <TouchableOpacity
                                style={localStyles.avatar}
                                onPress={() => this.changeAvatar()}>
                                {!!profileStore.avatar && (
                                    <FitImage source={profileStore.avatar} />
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
                                multiline
                            />
                            <FormField
                                field={profileStore.form.$('email').bind()}
                                error={profileStore.form.$('email').error}
                            />
                        </View>

                        <Button
                            title="Logout"
                            onPress={() => logout(navigation)}
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        );
    }
}
