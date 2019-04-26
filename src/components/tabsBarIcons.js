/** @format */

import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feed from '../screens/Feed';
import Users from '../screens/Users';
import Profile from '../screens/Profile';

const ICONS_BY_SCREEN = {
    Feed: 'home',
    Users: 'search',
    Profile: 'user',
};

export default ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName = ICONS_BY_SCREEN[routeName];
        if (!iconName) {
            return null;
        }

        // You can return any component that you like here!
        return <Icon name={iconName} size={25} color={tintColor} />;
    },
});
