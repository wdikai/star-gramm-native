/** @format */

import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { observer } from 'mobx-react';

const localStyles = StyleSheet.create({
    inputText: {
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
    },
    inputError: {
        borderBottomColor: 'red',
    },
    errorText: {
        color: 'red',
    },
});

function FormField({ field, error }) {
    const inputStyles = [localStyles.inputText];
    if (error) inputStyles.push(localStyles.inputError);

    return (
        <View>
            {!!field.label && <Text>{field.label}</Text>}
            <TextInput
                style={inputStyles}
                onChangeText={field.onChange}
                placeholder={field.placeholder}
                value={field.value}
            />
            {!!error && <Text style={localStyles.errorText}>{error}</Text>}
        </View>
    );
}

export default observer(FormField);
