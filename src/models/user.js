/** @format */

import { action, observable, computed, toJS, runInAction } from 'mobx';
import Post from './post';

const timeout = time => new Promise(resolve => setTimeout(resolve, time));

export default class User {
    @observable id;
    @observable email;
    @observable name;
    @observable fullName;
    @observable avatar;
    @observable countFollowers;
    @observable countFollowings;
    @observable bio;
    @observable isFollow;

    @observable posts = [];
    @observable isPostsLoading = false;

    constructor(data, services) {
        this.id = data.id;
        this.email = data.email;
        this.name = data.name;
        this.fullName = data.fullName;
        this.bio = data.bio || '';
        this.avatar = data.avatar;
        this.countFollowers = data.countFollowers || 0;
        this.countFollowings = data.countFollowings || 0;
        this.isFollow = data.isFollow || false;

        this.posts = data.posts || [];
        this.isPostsLoading = data.isPostsLoading || false;

        this.postService = services.postService;
    }

    @computed
    get offset() {
        return this.posts.length;
    }

    @action
    update(data) {
        this.email = data.email;
        this.name = data.name;
        this.fullName = data.fullName;
        this.avatar = data.avatar;
        this.countFollowers = data.countFollowers;
        this.countFollowings = data.countFollowings;
        this.bio = data.bio;
    }

    @action
    async follow() {
        await timeout(1000);

        runInAction(() => {
            this.isFollow = !this.isFollow;
            this.countFollowers += this.isFollow ? 1 : -1;
        });
    }

    @action
    async fetchPosts(offset = 0) {
        if (this.isPostsLoading) return;
        this.isPostsLoading = true;
        const response = await this.postService.getUserPosts(
            this.id,
            20,
            offset
        );

        runInAction(() => {
            const posts = response.map(post => new Post(post));
            if (!offset) this.posts = [];
            this.posts.push(...posts);
            this.isPostsLoading = false;
        });
    }

    toJSON() {
        return toJS(
            {
                id: this.id,
                email: this.email,
                name: this.name,
                fullName: this.fullName,
                avatar: this.avatar,
                countFollowers: this.countFollowers,
                countFollowings: this.countFollowings,
                bio: this.bio,
                isFollow: this.isFollow,
                posts: this.posts,
                isPostsLoading: this.isPostsLoading,
            },
            { recurseEverything: true }
        );
    }
}
