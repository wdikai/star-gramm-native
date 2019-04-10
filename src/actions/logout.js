/** @format */

import { LoginManager } from 'react-native-fbsdk';
import AsyncStorage from '@react-native-community/async-storage';

export default async function logout(navigation) {
    await LoginManager.logOut();
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Login');
}
