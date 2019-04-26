/** @format */

import { LoginManager } from 'react-native-fbsdk';
import AsyncStorage from '@react-native-community/async-storage';

export default async function logout(navigation) {
    await Promise.all([
        AsyncStorage.removeItem('userToken'),
        AsyncStorage.removeItem('profile'),
        AsyncStorage.removeItem('feed'),
    ]);
    await LoginManager.logOut();
    navigation.navigate('Login');
}
