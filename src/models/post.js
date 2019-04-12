/** @format */

import { observable } from 'mobx/lib/mobx';

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
}
