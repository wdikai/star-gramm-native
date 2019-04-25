/** @format */

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
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
            {!!profileStore && profileStore.form.changed && (
                <Button onPress={profileStore.onSubmit} title="Save" />
            )}
        </View>
    );
}

export default observer(EditProfileHeader);
