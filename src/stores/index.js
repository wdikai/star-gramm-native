/** @format */

import { configure } from 'mobx';

import { PostsStore } from './posts';
import { UsersStore } from './users';
import { ProfileStore } from './profile';
import { PhotoStore } from './photo';

import { UserService } from '../services/UserService';
import { PostService } from '../services/PostService';

configure({ enforceActions: 'observed' });

export default class RootStore {
    constructor() {
        const userService = new UserService();
        const postService = new PostService();

        this.profileStore = new ProfileStore({ userService, postService });
        this.userStore = new UsersStore({ userService, postService });
        this.feedStore = new PostsStore({ postService });
        this.photoStore = new PhotoStore({ postService });
    }
}
