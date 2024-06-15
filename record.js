import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import messaging from '@react-native-firebase/messaging';

const record = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Request permission for notifications
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log('Authorization status:', authStatus);
      } else {
        console.log('Notification permission denied');
      }
    };

    // Get the device token
    
    const getDeviceToken = async () => {
      try {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
      } catch (err) {
        console.log('Error getting FCM token:', err);
      }
    };

    requestPermission();
    getDeviceToken();

    // Handle foreground messages
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      if (remoteMessage.notification && remoteMessage.notification.body) {
        Alert.alert('استشعار احتيال!!!', remoteMessage.notification.body);
      } else {
        console.error('Message does not contain a body:', remoteMessage);
      }
    });

    // Clean up the message listener when the component unmounts
    return () => {
      unsubscribeOnMessage();
    };
  }, []);

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio],
      });

      console.log('Selected file:', res);

      const uri = Platform.OS === 'android' ? res[0].uri : res[0].uri.replace('file://', '');

      // Update the IP address to match your computer's IP address
      const serverIp = '192.168.100.19'; // Replace with your computer's IP address

      // Configure RNFetchBlob with a timeout
      RNFetchBlob.config({
        timeout: 2592000000 // Set timeout to 60 seconds
      })
      .fetch('POST', `http://${serverIp}:5000/process-audio`, {
        'Content-Type': 'multipart/form-data',
      }, [
        { name: 'audio', filename: res[0].name, type: res[0].type, data: RNFetchBlob.wrap(uri) }
      ])
      .then((response) => response.json())
      .then((data) => {
        console.log('Server response:', data); // Debug logging for server response
        setResult(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('حدث خطأ اثناء تحميل الملف');
        setResult(null);
      });

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.error(err);
        setError('حدث خطأ اثناء تحميل الملف');
        setResult(null);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('home')}>
          <Image source={require('./extra/back.png')} style={styles.image} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('./extra/voice.png')} style={styles.image} resizeMode="contain" />
          <Text style={styles.Text}>تحليل المكالمة</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.recentCallsContainer}>
        <TouchableOpacity style={styles.button} onPress={pickFile}>
          <Text style={styles.buttonText}>ارفاق ملف</Text>
        </TouchableOpacity>
      </View>
      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{JSON.stringify(result)}</Text>
        </View>
      )}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default record;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6EB4A5',
  },
  button: {
    backgroundColor: '#16537E',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomBar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
  },
  iconButton: {
    flex: 1,
    alignItems: 'center',
  },
  Text: {
    color: 'black',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Arial',
  },
  image: {
    width: 30,
    height: 30,
  },
  recentCallsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
  },
  errorContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});
