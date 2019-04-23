/** @format */

import { observable, action, computed } from 'mobx';
import User from '../models/user';
import { runInAction } from 'mobx/lib/mobx';

export class UsersStore {
    @observable users = [];
    @observable currentUser = null;
    @observable isLoading = false;

    constructor({ userService, postService }) {
        this.userService = userService;
        this.postService = postService;
    }

    @computed
    get offset() {
        return this.users.length;
    }

    @action
    async fetchUser(id = 10) {
        const { postService } = this;
        this.isLoading = true;
        this.currentUser = this.users.find(user => user.id === id);

        const response = await this.userService.getUser(id);

        runInAction(() => {
            if (this.currentUser) {
                this.currentUser.update(response);
            } else {
                this.currentUser = new User(response, { postService });
            }

            this.isLoading = false;
        });
    }

    @action
    async fetchUsers(offset = 0) {
        const { postService } = this;
        this.isLoading = true;
        const response = await this.userService.getUsers(20, offset);

        runInAction(() => {
            const users = response.map(user => new User(user, { postService }));
            if (!offset) this.users = [];
            this.users.push(...users);
            this.isLoading = false;
        });
    }
}
