import { observable, action } from "mobx";

const timeout = time => new Promise(resolve => setTimeout(resolve, time));
const getPosts = length =>
  Array.from({ length }).map((_, i) => ({
    id: i + 1,
    creator: getUser(i + 1),
    description: !(i % 3)
      ? ""
      : `Test ${i +
          1}, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    image: getImage(640, 480)
  }));

function getUser(id) {
  return {
    id,
    name: `User ${id}`,
    avatar: getImage(50)
  };
}

function getImage(w, h) {
  const randomColor = () => Math.floor(Math.random() * 256).toString(16);
  return `https://via.placeholder.com/${w}X${h || w}/${randomColor() +
    randomColor() +
    randomColor()}`;
}

export default class PostFeed {
  @observable
  posts = [];

  @observable
  isLoading = false;

  @action
  async fetchPosts() {
    this.isLoading = true;
    await timeout(1000);
    this.posts = getPosts(10);

    this.isLoading = false;
  }
}
