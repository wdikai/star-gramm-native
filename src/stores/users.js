import { observable, action } from "mobx";

const timeout = time => new Promise(resolve => setTimeout(resolve, time));

const getUsers = length => Array.from({ length }).map((_, i) => getUser(i + 1));

function getUser(id) {
  return {
    id,
    name: `User ${id}`,
    avatar: getImage(50),
    countFollowers: 10,
    countFollowings: 10,
    bio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  };
}

function getImage(w, h) {
  const randomColor = () => Math.floor(Math.random() * 256).toString(16);
  return `https://via.placeholder.com/${w}X${h || w}/${randomColor() +
    randomColor() +
    randomColor()}`;
}

export default class Users {
  @observable
  users = [];

  @observable
  currentUser = null;

  @observable
  isLoading = false;

  @action
  async fetchUser(id) {
    this.isLoading = true;
    this.currentUser = null;
    await timeout(1000);
    this.currentUser = getUser(id);

    this.isLoading = false;
  }

  @action
  async fetchUsers() {
    this.isLoading = true;
    await timeout(1000);
    this.users = getUsers(10);

    this.isLoading = false;
  }
}
