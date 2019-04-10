/** @format */

import PostFeed from './postFeed';
import Users from './users';

export default class RootStore {
    constructor() {
        this.feed = new PostFeed(this);
        this.users = new Users(this);
    }
}
