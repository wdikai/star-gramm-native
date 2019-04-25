/** @format */

import React from 'react';
import { View, Button } from 'react-native';
import { withNavigation } from 'react-navigation';

function FeedHeader({ navigation }) {
    return (
        <View>
            <Button
                title="Make photo"
                onPress={() => navigation.navigate('Camera')}
            />
        </View>
    );
}

export default withNavigation(FeedHeader);
