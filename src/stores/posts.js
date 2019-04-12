/** @format */

import { observable, action } from 'mobx';
import Post from '../models/post';
import { computed, runInAction } from 'mobx/lib/mobx';

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
    async fetchPost(id) {
        this.isLoading = true;
        this.currentPost = this.posts.find(user => user.id === id);
        const response = await this.postService.getPost(id);
        runInAction(() => {
            if (this.currentPost) {
                this.currentPost.update(response);
            }

            this.currentPost = new Post(response);
        });

        this.isLoading = false;
    }

    @action
    async fetchPosts(offset = 0) {
        this.isLoading = true;
        const response = await this.postService.getPosts(20, offset);
        const posts = response.map(user => new Post(user));
        if (!offset) this.posts = [];
        this.posts.push(...posts);
        this.isLoading = false;
    }
}
