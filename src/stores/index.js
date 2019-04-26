/** @format */

import {
    observable,
    action,
    configure,
    runInAction,
    reaction,
    toJS,
} from 'mobx';
import AsyncStorage from '@react-native-community/async-storage';

import { PostsStore } from './posts';
import { UsersStore } from './users';
import { ProfileStore } from './profile';
import { PhotoStore } from './photo';

import { UserService } from '../services/UserService';
import { PostService } from '../services/PostService';

configure({ enforceActions: 'observed' });

export default class RootStore {
    @observable isAuthorized = false;

    feedSubscription = null;
    userSubscription = null;
    userPostsSubscription = null;

    constructor() {
        const userService = new UserService();
        const postService = new PostService();

        this.profileStore = new ProfileStore({ userService, postService });
        this.userStore = new UsersStore({ userService, postService });
        this.feedStore = new PostsStore({ postService });
        this.photoStore = new PhotoStore({ postService });
    }

    @action
    async init() {
        const sessionToken = await AsyncStorage.getItem('userToken');
        if (sessionToken) {
            const [feed, user] = await Promise.all([
                AsyncStorage.getItem('feed'),
                AsyncStorage.getItem('profile'),
            ]);

            this.feedStore.init(JSON.parse(feed) || []);
            this.profileStore.init(JSON.parse(user));

            this.feedSubscription = reaction(
                () => this.feedStore.posts.length,
                () => this.saveFeed()
            );
            this.userSubscription = reaction(
                () => this.profileStore.user,
                () => this.saveProfile()
            );
            if (this.profileStore.user) {
                this.userPostsSubscription = reaction(
                    () => this.profileStore.user.posts.length,
                    () => this.saveProfile()
                );
            }
            runInAction(() => (this.isAuthorized = true));
        }
    }

    saveFeed() {
        const feed = this.feedStore.posts.slice(0, 40);
        AsyncStorage.setItem('feed', JSON.stringify(feed));
    }

    saveProfile() {
        if (!this.profileStore.user) {
            return AsyncStorage.removeItem('profile');
        }

        const profile = this.profileStore.user.toJSON();
        profile.posts = profile.posts.slice(0, 40);
        AsyncStorage.setItem('profile', JSON.stringify(profile));

        if (!this.userPostsSubscription) {
            this.userPostsSubscription = reaction(
                () => this.profileStore.user.posts.length,
                () => this.saveProfile()
            );
        }
    }
}
