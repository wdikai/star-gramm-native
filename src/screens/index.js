/** @format */

import {
    createAppContainer,
    createBottomTabNavigator,
    createSwitchNavigator,
    createStackNavigator,
} from 'react-navigation';

import Camera from './Camera';
import PhotoCropper from './PhotoCropper';
import PhotoPreview from './PhotoPreview';
import PostCreate from './PostCreate';
import Home from './Home';
import User from './User';
import Users from './Users';
import Feed from './Feed';
import Post from './Post';
import Login from './Login';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Splash from './Splash';

const appNavigator = createSwitchNavigator(
    {
        App: createStackNavigator(
            {
                Main: {
                    screen: createBottomTabNavigator(
                        {
                            Home,
                            Camera: {
                                screen: createStackNavigator(
                                    {
                                        Camera: {
                                            screen: Camera,
                                            navigationOptions: {
                                                header: null,
                                            },
                                        },
                                        PhotoCropper,
                                        PhotoPreview,
                                        PostCreate,
                                    },
                                    {
                                        initialRouteName: 'Camera',
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
                            Profile: createStackNavigator(
                                {
                                    Profile,
                                    Post,
                                    User,
                                },
                                { initialRouteName: 'Profile' }
                            ),
                        },
                        {
                            initialRouteName: 'Profile',
                        }
                    ),
                    navigationOptions: {
                        header: null,
                    },
                },
                EditProfile,
            },
            {
                initialRouteName: 'Main',
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
