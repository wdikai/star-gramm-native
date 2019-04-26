/** @format */

import { observable, action, computed, runInAction } from 'mobx';
import User from '../models/user';
import { createFrom } from '../utils/createFrom';
import { fields, options } from '../forms/profile';

export class ProfileStore {
    @observable user = null;
    @observable isLoading = false;

    @observable avatar = null;
    @observable form = null;
    @observable isAvatarChanged = false;
    @observable isSubmitting = false;

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

    @computed
    get hasChanges() {
        return (
            (this.isAvatarChanged || this.form.changed) && !this.isSubmitting
        );
    }

    @action
    init(user) {
        const { postService } = this;
        if (!user || this.user || this.isLoading) return;

        this.user = new User(user, { postService });
        this.resetForm();
    }

    @action
    setAvatar(uri = this.user.avatar) {
        this.avatar = { uri };
        this.isAvatarChanged = uri !== this.user.avatar;
    }

    @action
    resetForm() {
        this.isSubmitting = false;
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

            this.resetForm();
            this.isLoading = false;
        });
    }

    @action
    async submitHandler(form) {
        const data = {
            ...form.values(),
            avatar: this.avatar.uri,
        };
        this.isSubmitting = true;
        await this.updateProfile(data);
        this.resetForm();
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
