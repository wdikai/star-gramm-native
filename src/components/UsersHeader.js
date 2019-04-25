/** @format */

import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
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

function UsersHeader({ userStore }) {
    return (
        <View>
            <TextInput placeholder="Search" />
        </View>
    );
}

export default observer(UsersHeader);
