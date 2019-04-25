/** @format */

import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
    Keyboard,
} from 'react-native';
import { inject, observer } from 'mobx-react/native';
import ImagePicker from 'react-native-image-picker';

import styles from '../styles/styles';
import FitImage from '../components/FitImage';
import FormField from '../components/FormField';

const localStyles = StyleSheet.create({
    container: {
        padding: 5,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    avatar: {
        width: 50,
        height: 50,
    },
    headerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 15,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
});

function Header({ onSubmit }) {
    return (
        <View style={localStyles.headerContainer}>
            <Text style={localStyles.headerText}>Edit Profile</Text>
            <Button onPress={onSubmit} title="Save" />
        </View>
    );
}

@inject(stores => ({ profileStore: stores.root.profileStore }))
@observer
export default class EditProfile extends Component {
    static navigationOptions({ navigation }) {
        return {
            headerTitle: <Header onSubmit={navigation.getParam('onSubmit')} />,
        };
    }

    componentWillMount() {
        const { navigation, profileStore } = this.props;
        navigation.setParams({
            onSubmit: event => {
                profileStore.form.onSubmit(event);
                navigation.goBack();
            },
        });
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
        const profileStore = this.props.profileStore;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <View style={localStyles.container}>
                        <View style={[styles.row, styles.center]}>
                            <TouchableOpacity
                                onPress={() => this.changeAvatar()}>
                                {!!profileStore.avatar && (
                                    <FitImage
                                        source={profileStore.avatar}
                                        style={localStyles.avatar}
                                    />
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
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        );
    }
}
