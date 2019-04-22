/** @format */

import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Button } from 'react-native';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx';

import styles from '../styles/styles';
import FormField from '../components/FormField';
import { createFrom } from '../utils/createFrom';
import { fields, options } from '../forms/profile';

const localStyles = StyleSheet.create({
    container: {
        padding: 5,
    },
});

@observer
export default class EditProfile extends Component {
    @observable form;

    constructor(props) {
        super(props);

        this.form = createFrom({
            fields,
            options,
            hooks: {
                onSuccess: form => this.submitHandler(form),
            },
        });
    }

    submitHandler(form) {
        console.log('Form Values!', form.values());
    }

    render() {
        return (
            <ScrollView style={[styles.container, localStyles.container]}>
                <View>
                    <FormField
                        field={this.form.$('name').bind()}
                        error={this.form.$('name').error}
                    />
                    <FormField
                        field={this.form.$('fullName').bind()}
                        error={this.form.$('fullName').error}
                    />
                    <FormField
                        field={this.form.$('bio').bind()}
                        error={this.form.$('bio').error}
                    />
                    <FormField
                        field={this.form.$('email').bind()}
                        error={this.form.$('email').error}
                    />

                    <Button onPress={this.form.onSubmit} title="Submit" />
                </View>
            </ScrollView>
        );
    }
}
