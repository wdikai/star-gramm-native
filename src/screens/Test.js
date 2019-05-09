/** @format */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import TabViewWithFoldableHeader from '../components/TabViewWithFoldableHeader';

export default class Test extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TabViewWithFoldableHeader />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});
