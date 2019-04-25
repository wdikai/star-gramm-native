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
    @observable ready = false;

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
        const [feed, user] = await Promise.all([
            AsyncStorage.getItem('feed'),
            AsyncStorage.getItem('profile'),
        ]);

        this.feedStore.init(JSON.parse(feed));
        this.profileStore.init(JSON.parse(user));

        reaction(() => this.feedStore.posts.length, () => this.saveFeed());

        reaction(() => this.profileStore.user, () => this.saveProfile());
        reaction(
            () => this.profileStore.user.posts.length,
            () => this.saveProfile()
        );

        runInAction(() => (this.ready = true));
    }

    saveFeed() {
        const feed = this.feedStore.posts.slice(0, 40);
        AsyncStorage.setItem('feed', JSON.stringify(feed));
    }

    saveProfile() {
        const profile = this.profileStore.user.toJSON();
        profile.posts = profile.posts.slice(0, 40);
        AsyncStorage.setItem('profile', JSON.stringify(profile));
    }
}
