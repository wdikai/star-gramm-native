/** @format */

import { action, observable } from 'mobx/lib/mobx';

export default class Post {
    @observable id;
    @observable creator;
    @observable description;
    @observable image;

    constructor(options) {
        this.id = options.id;
        this.creator = options.creator;
        this.description = options.description;
        this.image = options.image;
    }

    @action
    update(data) {
        this.id = data.id;
        this.creator = data.creator;
        this.description = data.description;
        this.image = data.image;
    }
}
