/** @format */

import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { observer } from 'mobx-react/native';

import styles from '../styles/styles';
import FormField from '../components/FormField';
import { createFrom } from '../utils/createFrom';

const fields = [
    {
        name: 'name',
        label: 'User name',
        placeholder: 'User name',
        rules: 'required|string|between:3,50',
    },
];
form = createFrom({ fields });

@observer
export default class Settings extends Component {
    static navigationOptions({ navigation }) {
        return {
            title: 'Settings',
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Settings</Text>
                <FormField
                    field={form.$('name').bind()}
                    error={form.$('name').error}
                />

                <Button onPress={form.onSubmit} title="Submit" />
            </View>
        );
    }
}
