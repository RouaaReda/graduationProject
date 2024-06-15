import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert, PermissionsAndroid, Image } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import AudioRecord from 'react-native-audio-record';
import messaging from '@react-native-firebase/messaging';

const RecordingScreen = ({ navigation }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingPath, setRecordingPath] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Request permissions for Android
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          ]);
          if (
            granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('You can use the microphone and storage');
          } else {
            Alert.alert('Permission required', 'You need to grant audio recording and storage permissions to use this feature.');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestPermissions();

    // Initialize AudioRecord
    AudioRecord.init({
      sampleRate: 16000,  // default 44100
      channels: 1,        // 1 or 2, default 1
      bitsPerSample: 16,  // 8 or 16, default 16
      audioSource: 6,     // android only (see below)
      wavFile: 'recording.wav' // default 'recording.wav'
    });

    // Request permission for notifications
    const requestNotificationPermission = async () => {
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

    requestNotificationPermission();
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

  const onStartRecord = async () => {
    setError(null);
    setIsRecording(true);
    AudioRecord.start();
  };

  const onStopRecord = async () => {
    let audioFile = await AudioRecord.stop();
    setIsRecording(false);
    setRecordingPath(audioFile);
    uploadRecording(audioFile);
  };

  const uploadRecording = async (path) => {
    try {
      const uri = Platform.OS === 'android' ? path : path.replace('file://', '');
      const serverIp = '192.168.100.19'; // Replace with your computer's IP address

      RNFetchBlob.config({
        timeout: 2592000000 // Set timeout to 60 seconds
      })
      .fetch('POST', `http://${serverIp}:5000/process-audio`, {
        'Content-Type': 'multipart/form-data',
      }, [
        { name: 'audio', filename: 'recording.wav', type: 'audio/wav', data: RNFetchBlob.wrap(uri) }
      ])
      .then((response) => response.json())
      .then((data) => {
        console.log('Server response:', data);
        setResult(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('An error occurred while uploading the file');
        setResult(null);
      });
    } catch (err) {
      console.error(err);
      setError('An error occurred while uploading the file');
      setResult(null);
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
        <TouchableOpacity 
          style={styles.button} 
          onPress={isRecording ? onStopRecord : onStartRecord}>
          <Text style={styles.buttonText}>{isRecording ? 'Stop Recording' : 'Start Recording'}</Text>
        </TouchableOpacity>
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

    </View>//container end 
  );
};

export default RecordingScreen;

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
