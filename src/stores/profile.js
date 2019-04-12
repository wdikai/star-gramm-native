/** @format */

import { observable, action } from 'mobx';
import User from '../models/user';

export class ProfileStore {
    @observable user = null;
    @observable isLoading = false;

    constructor({ userService }) {
        this.userService = userService;
    }

    @action
    async fetchProfile() {
        this.isLoading = true;
        const response = await this.userService.getUser(10);

        if (this.user) {
            this.user.update(response);
        } else {
            this.user = new User(response);
        }

        this.isLoading = false;
    }
}
