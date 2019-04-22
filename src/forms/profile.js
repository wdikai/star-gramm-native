/** @format */

export const fields = [
    {
        name: 'name',
        placeholder: 'User name',
        rules: 'required|string|between:3,50',
    },
    {
        name: 'fullName',
        placeholder: 'Full name',
        rules: 'required|string|between:3,50',
    },
    {
        name: 'bio',
        placeholder: 'Bio',
        rules: 'string|between:3,250',
    },
    {
        name: 'email',
        placeholder: 'Email',
        rules: 'str ing|email',
    },
];

export const options = {
    validateOnChangeAfterSubmit: true,
};
