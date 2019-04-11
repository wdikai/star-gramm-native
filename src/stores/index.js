/** @format */

import PostFeed from './postFeed';
import { UserStore } from './users';

export default class RootStore {
    constructor() {
        this.feedStore = new PostFeed(this);
        this.userStore = new UserStore(this);
    }
}
