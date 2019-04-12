/** @format */

import { observable, action, computed } from 'mobx';
import User from '../models/user';

export class UsersStore {
    @observable users = [];
    @observable currentUser = null;
    @observable isLoading = false;

    constructor({ userService }) {
        this.userService = userService;
    }

    @computed
    get offset() {
        return this.users.length;
    }

    @action
    async fetchUser(id = 10) {
        this.isLoading = true;
        this.currentUser = this.users.find(user => user.id === id);
        const response = await this.userService.getUser(id);

        if (this.currentUser) {
            this.currentUser.update(response);
        } else {
            this.currentUser = new User(response);
        }

        this.isLoading = false;
    }

    @action
    async fetchUsers(offset = 0) {
        this.isLoading = true;
        const response = await this.userService.getUsers(20, offset);
        const users = response.map(user => new User(user));
        if (!offset) this.users = [];
        this.users.push(...users);
        this.isLoading = false;
    }
}
