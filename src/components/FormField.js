/** @format */

import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';

const localStyles = StyleSheet.create({
    inputText: {
        borderBottomWidth: 1,
    },
});

function FormField({ field, error }) {
    return (
        <View>
            {!!field.value && <Text>{field.label}</Text>}
            <TextInput
                style={localStyles.inputText}
                onChangeText={field.onChange}
                placeholder={field.label}
                value={field.value}
            />
            <Text>{error}</Text>
        </View>
    );
}

export default observer(FormField);
