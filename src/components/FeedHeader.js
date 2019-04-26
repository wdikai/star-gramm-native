/** @format */

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';

function FeedHeader({ navigation }) {
    return (
        <View>
            <TouchableOpacity
                onPress={() => navigation.navigate('Camera')}
                style={{ marginLeft: 20 }}>
                <Icon name="camera" size={20} />
            </TouchableOpacity>
        </View>
    );
}

export default withNavigation(FeedHeader);
