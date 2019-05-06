/** @format */

import React, { Component, createRef } from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { withNavigation } from 'react-navigation';
import { observer } from 'mobx-react/native';

import FitImage from './FitImage';
import Grid from './Grid';
import UserPostsGrid from './UserPostsGrid';
import UserPostsList from './UserPostsList';

import styles from '../styles/styles';

const innerStyles = StyleSheet.create({
    profileSection: {
        padding: 10,
        height: 300,
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

const columns = {
    GRID: {
        key: 'grid',
        title: 'Grid',
    },
    LIST: {
        key: 'list',
        title: 'List',
    },
};

const componentsByColumn = {
    [columns.GRID.key]: UserPostsGrid,
    [columns.LIST.key]: UserPostsList,
};

@withNavigation
@observer
class UserDetail extends Component {
    constructor(props) {
        super(props);

        this.scrollViewRef = createRef();
        this.state = {
            index: 0,
            routes: [columns.GRID, columns.LIST],
        };
    }

    componentWillMount() {
        const { user } = this.props;
        if (!user.isPostsLoading && !user.posts.length) {
            user.fetchPosts();
        }
    }

    render() {
        return (
            <ScrollView ref={this.scrollViewRef}>
                {this.renderProfile()}
                {this.renderTabs()}
            </ScrollView>
        );
    }

    renderProfile() {
        const { user, renderAction } = this.props;
        return (
            <View style={[innerStyles.profileSection]}>
                <View style={[styles.row, styles.spaceBetween]}>
                    <FitImage
                        style={[innerStyles.avatar]}
                        source={{ uri: user.avatar }}
                    />
                    <View style={[styles.column, styles.center, styles.col5]}>
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
                            {renderAction({ user })}
                        </View>
                    </View>
                </View>
                <View style={[styles.column]}>
                    <Text>{user.name}</Text>
                    <Text>{user.bio}</Text>
                </View>
            </View>
        );
    }

    renderTabs() {
        return (
            <TabView
                timingConfig={{ duration: 10 }}
                swipeEnabled={false}
                navigationState={this.state}
                renderScene={props => this.renderScene(props)}
                onIndexChange={index => this.changeColumn(index)}
                initialLayout={{ width: Dimensions.get('window').width }}
                sceneContainerStyle={{
                    height: Dimensions.get('window').height - 180,
                }}
            />
        );
    }

    changeColumn(index) {
        this.scrollViewRef.current.scrollToEnd({ animated: true });
        this.setState({ index });
    }

    renderScene({ route }) {
        let Component = componentsByColumn[route.key];
        const { user } = this.props;

        if (!user) return null;

        return !Component ? null : (
            <Component user={user} nestedScrollEnabled={false} />
        );
    }
}

export default UserDetail;
