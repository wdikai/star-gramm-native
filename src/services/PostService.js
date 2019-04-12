/** @format */

const timeout = time => new Promise(resolve => setTimeout(resolve, time));

function getUser(id) {
    return {
        id,
        name: `User ${id}`,
        avatar: getImage(50),
    };
}

function getImage(w, h) {
    const randomColor = () => Math.floor(Math.random() * 256).toString(16);
    return `https://via.placeholder.com/${w}X${h || w}/${randomColor() +
        randomColor() +
        randomColor()}`;
}

export class PostService {
    async getPost(id) {
        await timeout(1000);
        return {
            id: id,
            creator: getUser(id),
            description: !(id % 3)
                ? `Test ${id}`
                : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            image: getImage(640, 480),
        };
    }

    async getPosts(length, offset = 0) {
        return Promise.all(
            Array.from({ length }).map((_, i) => this.getPost(i + 1 + offset))
        );
    }
}
