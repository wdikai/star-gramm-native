/** @format */

import React from 'react';
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator,
} from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import { fromLeft, fromRight, fadeIn } from 'react-navigation-transitions';

import Camera from './Camera';
import PhotoCropper from './PhotoCropper';
import PhotoPreview from './PhotoPreview';
import PostCreate from './PostCreate';
import User from './User';
import Users from './Users';
import Feed from './Feed';
import Post from './Post';
import Login from './Login';
import Profile from './Profile';
import EditProfile from './EditProfile';
import Splash from './Splash';
import Test from './Test';

import defaultNavigationOptions from '../components/tabsBarIcons';

const appNavigator = createAnimatedSwitchNavigator(
    {
        App: createStackNavigator(
            {
                Main: {
                    screen: createBottomTabNavigator(
                        {
                            Feed: createStackNavigator(
                                { Feed, User, Post },
                                { initialRouteName: 'Feed' }
                            ),
                            Users: createStackNavigator(
                                { Users, User, Post },
                                { initialRouteName: 'Users' }
                            ),
                            Profile: createStackNavigator(
                                { Profile, Post, User },
                                { initialRouteName: 'Profile' }
                            ),
                            Test,
                        },
                        {
                            initialRouteName: 'Test',
                            tabBarOptions: {
                                activeTintColor: 'tomato',
                                inactiveTintColor: 'gray',
                                showLabel: false,
                            },
                            defaultNavigationOptions,
                        }
                    ),
                    navigationOptions: {
                        header: null,
                    },
                },
                Camera: {
                    screen: Camera,
                    navigationOptions: {
                        header: null,
                    },
                },
                PhotoCropper,
                PhotoPreview,
                PostCreate,
                EditProfile,
            },
            {
                initialRouteName: 'Main',
                transitionConfig: ({ scenes }) => {
                    const screensWithoutTransition = [
                        'PhotoCropper',
                        'PhotoPreview',
                        'PostCreate',
                    ];
                    const prewScene = scenes[scenes.length - 2];
                    const nextScene = scenes[scenes.length - 1];

                    if (
                        (prewScene &&
                            screensWithoutTransition.includes(
                                prewScene.route.routeName
                            )) ||
                        (nextScene &&
                            screensWithoutTransition.includes(
                                nextScene.route.routeName
                            ))
                    ) {
                        return fadeIn(100);
                    }

                    if (nextScene && nextScene.route.routeName === 'Camera') {
                        return fromLeft(300);
                    }

                    return fromRight(300);
                },
            }
        ),
        Splash,
        Login,
    },
    {
        initialRouteName: 'Splash',
        transition: (
            <Transition.Together>
                <Transition.Out type="fade" durationMs={400} />
                <Transition.In type="fade" durationMs={500} />
            </Transition.Together>
        ),
    }
);

export default createAppContainer(appNavigator);
