/** @format */

export default function openProfile(navigation, user) {
    return () =>
        navigation.navigate('User', {
            userId: user ? user.id : 'me',
            stackTitle: user ? user.name : 'Profile',
        });
}
