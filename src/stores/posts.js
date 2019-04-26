/** @format */

import { observable, action } from 'mobx';
import { computed, runInAction } from 'mobx';

import Post from '../models/post';

export class PostsStore {
    @observable posts = [];
    @observable currentPost = null;
    @observable isLoading = false;

    constructor({ postService }) {
        this.postService = postService;
    }

    @computed
    get offset() {
        return this.posts.length;
    }

    @action
    init(items = []) {
        if (this.isLoading || this.posts.length || !items.length) return;

        this.posts = items.map(post => new Post(post));
    }

    @action
    async fetchPost(id) {
        this.isLoading = true;
        this.currentPost = this.posts.find(user => user.id === id);
        const response = await this.postService.getPost(id);

        runInAction(() => {
            if (this.currentPost) {
                this.currentPost.update(response);
            } else {
                this.currentPost = new Post(response);
            }

            this.isLoading = false;
        });
    }

    @action
    async fetchPosts(offset = 0) {
        if (this.isLoading) return;
        this.isLoading = true;
        const response = await this.postService.getPosts(20, offset);

        runInAction(() => {
            const posts = response.map(user => new Post(user));
            if (!offset) this.posts = [];
            this.posts.push(...posts);
            this.isLoading = false;
        });
    }
}
