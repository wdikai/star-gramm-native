/** @format */

import { action, observable } from 'mobx/lib/mobx';

export default class User {
    @observable id;
    @observable name;
    @observable avatar;
    @observable countFollowers;
    @observable countFollowings;
    @observable bio;
    @observable isFollow;

    constructor(options) {
        this.id = options.id;
        this.name = options.name;
        this.avatar = options.avatar;
        this.countFollowers = options.countFollowers || 0;
        this.countFollowings = options.countFollowings || 0;
        this.bio = options.bio || '';
    }

    @action
    update(data) {
        this.name = data.name;
        this.avatar = data.avatar;
        this.countFollowers = data.countFollowers;
        this.countFollowings = data.countFollowings;
        this.bio = data.bio;
    }

    @action
    async follow() {
        await timeout(1000);
        this.isFollow = true;
        this.countFollowers++;
    }
}
