/** @format */

import { action, observable } from 'mobx/lib/mobx';

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

    constructor(options) {
        this.id = options.id;
        this.email = options.email;
        this.name = options.name;
        this.fullName = options.fullName;
        this.avatar = options.avatar;
        this.countFollowers = options.countFollowers || 0;
        this.countFollowings = options.countFollowings || 0;
        this.bio = options.bio || '';
        this.isFollow = options.isFollow || false;
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
        this.isFollow = !this.isFollow;
        this.countFollowers += this.isFollow ? 1 : -1;
    }
}
