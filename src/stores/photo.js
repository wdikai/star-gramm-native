/** @format */

import * as RNFS from 'react-native-fs';
import { observable, action } from 'mobx';
import { createFrom } from '../utils/createFrom';
import { fields, options } from '../forms/post';

export class PhotoStore {
    @observable uris = {};
    @observable history = [];
    @observable from;

    @observable hasCameraPermission = true;
    @observable focusedScreen = true;

    constructor({ postService }) {
        this.postService = postService;
        this.form = createFrom({
            fields,
            options,
            hooks: {
                onSuccess: form => this.makePost(form),
            },
        });
    }

    getUri(type = 'default') {
        return this.uris[type];
    }

    @action
    setUri(url, type = 'default') {
        this.uris[type] = url;
        this.history.push(url);
    }

    @action
    makePost(form) {
        console.log(form.values());
    }

    @action
    removeAllFiles() {
        const history = [...this.history];
        this.history = [];
        this.uris = {};
        Promise.all(
            history.map(async uri => {
                const exist = await RNFS.exists(uri);
                if (exist) {
                    await RNFS.unlink(uri);
                }
            })
        );
    }

    @action
    changePermission(cameraStatus) {
        this.hasCameraPermission = cameraStatus === 'READY';
    }
}
