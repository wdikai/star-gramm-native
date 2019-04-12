/** @format */

import { observable, action } from 'mobx';
import Post from '../models/post';

export class PostsStore {
    @observable
    posts = [];

    @observable
    isLoading = false;

    constructor({ postService }) {
        this.postService = postService;
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
