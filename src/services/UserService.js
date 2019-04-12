/** @format */

const colors = ['ff0000', '0000ff', '00ff00'];

async function timeout(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function getImage(w, h, id) {
    return `https://via.placeholder.com/${w}X${h || w}/${colors[id % 3]}`;
}

export class UserService {
    async getUser(id) {
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

    async getUsers(length, offset = 0) {
        return Promise.all(
            Array.from({ length }).map((_, i) => this.getUser(i + 1 + offset))
        );
    }
}
