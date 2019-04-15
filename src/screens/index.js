/** @format */

import {
    createAppContainer,
    createBottomTabNavigator,
    createSwitchNavigator,
    createStackNavigator,
} from 'react-navigation';

import Camera from './Camera';
import PhotoPreview from './PhotoPreview';
import Home from './Home';
import User from './User';
import Users from './Users';
import Feed from './Feed';
import Post from './Post';
import Login from './Login';
import Profile from './Profile';
import Splash from './Splash';

const appNavigator = createSwitchNavigator(
    {
        Main: createBottomTabNavigator(
            {
                Home,
                Camera: {
                    screen: createStackNavigator(
                        {
                            Camera,
                            PhotoPreview,
                        },
                        {
                            initialRouteName: 'Camera',
                            headerMode: 'none',
                        }
                    ),
                    navigationOptions: {
                        tabBarVisible: false,
                    },
                },
                Users: createStackNavigator(
                    { Users, User, Post },
                    { initialRouteName: 'Users' }
                ),
                Feed: createStackNavigator(
                    { Feed, User, Post },
                    { initialRouteName: 'Feed' }
                ),
                Profile,
            },
            {
                initialRouteName: 'Feed',
            }
        ),
        Splash,
        Login,
    },
    {
        initialRouteName: 'Splash',
    }
);

export default createAppContainer(appNavigator);
