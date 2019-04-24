/** @format */

import { observable, action, runInAction } from 'mobx';
import User from '../models/user';
import { createFrom } from '../utils/createFrom';
import { fields, options } from '../forms/profile';

export class ProfileStore {
    @observable user = null;
    @observable isLoading = false;

    @observable avatar = null;
    @observable form = null;

    constructor({ userService, postService }) {
        this.userService = userService;
        this.postService = postService;
        this.form = createFrom({
            fields,
            options,
            hooks: {
                onSuccess: form => this.submitHandler(form),
            },
        });
    }

    @action
    setAvatar(uri = this.user.avatar) {
        this.avatar = { uri };
    }

    @action
    init() {
        this.setAvatar();
        this.form.init({
            email: this.user.email,
            name: this.user.name,
            fullName: this.user.fullName,
            bio: this.user.bio,
        });
    }

    @action
    async fetchProfile() {
        const { postService } = this;
        this.isLoading = true;
        const response = await this.userService.getUser(10);
        runInAction(() => {
            if (this.user) {
                this.user.update(response);
            } else {
                this.user = new User(response, { postService });
            }

            this.init();
            this.isLoading = false;
        });
    }

    @action
    async submitHandler(form) {
        const data = {
            ...form.values(),
            avatar: this.avatar.uri,
        };
        await this.updateProfile(data);
    }

    @action
    async updateProfile(data) {
        this.isLoading = true;
        const response = await this.userService.patchUser(10, data);

        runInAction(() => {
            this.user.update(response);
            this.isLoading = false;
        });
    }
}
