/** @format */

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { observer } from 'mobx-react/native';

const localStyles = StyleSheet.create({
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

function EditProfileHeader({ profileStore }) {
    return (
        <View style={localStyles.headerContainer}>
            <Text style={localStyles.headerText}>Edit Profile</Text>
            {!!profileStore && profileStore.hasChanges && (
                <TouchableOpacity onPress={profileStore.form.onSubmit}>
                    <Icon name="check" size={20} />
                </TouchableOpacity>
            )}
            {!!profileStore && profileStore.isSubmitting && (
                <ActivityIndicator />
            )}
        </View>
    );
}

export default observer(EditProfileHeader);
