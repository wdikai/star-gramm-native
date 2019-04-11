/** @format */

import { observable, action, computed } from 'mobx';
import User from '../models/user';

const colors = ['ff0000', '0000ff', '00ff00'];

async function timeout(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function getUsers(length, count = 0) {
    await timeout(1000);
    return Promise.all(
        Array.from({ length }).map((_, i) => getUser(i + 1 + count))
    );
}

async function getUser(id) {
    await timeout(1000);
    return {
        id,
        name: `User ${id}`,
        avatar: getImage(50, 50, id),
        countFollowers: 10,
        countFollowings: 10,
        bio: [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ',
            'ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ',
            'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse ',
            'cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui ',
            'officia deserunt mollit anim id est laborum.',
        ].join(''),
    };
}

function getImage(w, h, id) {
    return `https://via.placeholder.com/${w}X${h || w}/${colors[id % 3]}`;
}

export class UserStore {
    @observable users = [];
    @observable currentUser = null;
    @observable isLoading = false;

    @computed
    get offset() {
        return this.users.length;
    }

    @action
    async fetchUser(id = 10) {
        this.isLoading = true;
        this.currentUser = this.users.find(user => user.id === id);
        const response = await getUser(id);

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
        const response = await getUsers(20, offset);
        const users = response.map(user => new User(user));
        if (!offset) this.users = [];
        this.users.push(...users);
        this.isLoading = false;
    }
}
