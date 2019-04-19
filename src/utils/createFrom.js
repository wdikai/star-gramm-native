/** @format */

import MobxReactForm from 'mobx-react-form';
import Validator from 'validatorjs';
import dvr from 'mobx-react-form/lib/validators/DVR';
import en from 'validatorjs/src/lang/en';
Validator.setMessages('en', en);

export function createFrom({
    fields,
    hooks = {},
    plugins = {},
    validatorExtension,
}) {
    return new MobxReactForm(
        { fields },
        {
            plugins: {
                dvr: dvr({
                    package: Validator,
                    extend: validatorExtension,
                }),
                ...plugins,
            },
            hooks,
        }
    );
}
