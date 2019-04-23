/** @format */

import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { TabView } from 'react-native-tab-view';
import { withNavigation } from 'react-navigation';
import { observer } from 'mobx-react/native';

import { autorun } from 'mobx';

import FitImage from './FitImage';
import Grid from './Grid';
import FollowButton from './FollowButton';
import UserPostsGrid from './UserPostsGrid';
import UserPostsList from './UserPostsList';

import styles from '../styles/styles';

const innerStyles = StyleSheet.create({
    profileSection: {
        padding: 10,
        borderColor: 'lightgray',
        borderBottomWidth: 0.5,
    },
    counter: {
        padding: 5,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
    },
    editButton: {
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#c0c0c0',
        borderRadius: 5,
        borderWidth: 1,
    },
    scene: {
        flex: 1,
    },
});

@withNavigation
@observer
class UserDetail extends Component {
    state = {
        index: 0,
        routes: [
            { key: 'grid', title: 'Grid' },
            { key: 'list', title: 'List' },
        ],
    };

    componentWillMount() {
        const { user } = this.props;
        user.fetchPosts();
    }

    render() {
        const { user } = this.props;

        return (
            <View style={[styles.column, innerStyles.scene]}>
                <View style={[innerStyles.profileSection]}>
                    <View style={[styles.row, styles.spaceBetween]}>
                        <FitImage
                            style={innerStyles.avatar}
                            source={{ uri: user.avatar }}
                        />
                        <View style={[styles.column, styles.center]}>
                            <View style={[styles.row]}>
                                <View
                                    style={[
                                        styles.column,
                                        styles.center,
                                        innerStyles.counter,
                                    ]}>
                                    <Text>{user.countFollowers}</Text>
                                    <Text>Followers</Text>
                                </View>

                                <View
                                    style={[
                                        styles.column,
                                        styles.center,
                                        innerStyles.counter,
                                    ]}>
                                    <Text>{user.countFollowings}</Text>
                                    <Text>Followings</Text>
                                </View>
                            </View>

                            <View style={[styles.row]}>
                                {this.renderActions()}
                            </View>
                        </View>
                    </View>
                    <View style={[styles.column]}>
                        <Text>{user.name}</Text>
                        <Text>{user.bio}</Text>
                    </View>
                </View>
                <TabView
                    navigationState={this.state}
                    renderScene={props => this.renderScene(props)}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                    style={{ height: Dimensions.get('window').height }}
                />
            </View>
        );
    }

    renderActions() {
        const { user, isMe } = this.props;

        if (isMe) {
            return (
                <TouchableHighlight
                    style={innerStyles.editButton}
                    onPress={() =>
                        this.props.navigation.navigate('EditProfile')
                    }>
                    <Text>Edit profile</Text>
                </TouchableHighlight>
            );
        }
        return <FollowButton user={user} />;
    }

    renderScene({ route }) {
        const { user } = this.props;

        if (!user) return null;

        switch (route.key) {
            case 'grid':
                return <UserPostsGrid user={user} />;
            case 'list':
                return <UserPostsList user={user} />;
            default:
                return null;
        }
    }
}

export default UserDetail;
