/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import firebase from '@react-native-firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyAW1eQ25tm93WpWuMgVUj_GZE2cmFBKR6I",
    authDomain: "awesomeproject-af00c.firebaseapp.com",
    databaseURL: "https://awesomeproject-af00c-default-rtdb.firebaseio.com/",
    projectId: "awesomeproject-af00c",
    storageBucket: "awesomeproject-af00c.appspot.com",
    messagingSenderId: "1068921908249",
    appId: "1:1068921908249:android:4cf9c544a02641a0538e88"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    const messaging = getMessaging(app);
  }


AppRegistry.registerComponent(appName, () => App);

