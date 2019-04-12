/** @format */

import { PostsStore } from './posts';
import { UsersStore } from './users';
import { ProfileStore } from './profile';
import { UserService } from '../services/UserService';
import { PostService } from '../services/PostService';

export default class RootStore {
    constructor() {
        const userService = new UserService();
        const postService = new PostService();

        this.profileStore = new ProfileStore({ userService });
        this.feedStore = new PostsStore({ postService });
        this.userStore = new UsersStore({ userService });
    }
}
