import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import database from '@react-native-firebase/database';

export default function Profile({ navigation }) {
  const [selectImage, setSelectImage] = useState('');
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null);
  const [gmail, setGmail] = useState('');

  // Function to handle selecting an image from the gallery
  const handleImagePicker = () => {
    launchImageLibrary({}, response => {
      if (response.assets && response.assets.length > 0) {
        setSelectImage(response.assets[0].uri);
      }
    });
  };

  // Function to validate Gmail format
  const isValidGmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
  };

  // Function to save user profile data to Firebase
  const saveUserProfile = async () => {
    if (!isValidGmail(gmail)) {
      Alert.alert('تنبيه', 'يرجى إدخال بريد إلكتروني صالح ينتهي بـ @gmail.com');
      return;
    }

    try {
      if (userId) {
        // Update existing profile
        await database().ref(`users/${userId}`).update({
          username,
          profile_picture_url: selectImage,
          gmail,
        });
        Alert.alert('تمت عملية الحفظ');
      } else {
        // Create new profile
        const newUserRef = database().ref('users').push({
          username,
          profile_picture_url: selectImage,
          gmail,
        });
        setUserId(newUserRef.key);
        Alert.alert('تمت عملية الحفظ');
      }
    } catch (error) {
      console.error('Error saving user profile:', error);
      Alert.alert('Error saving user profile');
    }
  };

  const fetchUserProfile = async () => {
    try {
      const snapshot = await database().ref('users').once('value');
      const data = snapshot.val();
      if (data) {
        const key = Object.keys(data)[0];
        const userProfile = data[key];
        setUsername(userProfile.username);
        setSelectImage(userProfile.profile_picture_url);
        setGmail(userProfile.gmail);
        setUserId(key);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('home')}>
          <Image source={require('./extra/back.png')} style={styles.image} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('profile')}>
          <Image source={require('./extra/user.png')} style={styles.image} resizeMode="contain" />
          <Text style={styles.Text}>الحساب الشخصي</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleImagePicker} style={styles.profilePictureContainer}>
        <Image
          style={styles.profilePicture}
          source={selectImage ? { uri: selectImage } : require('./extra/user.png')}
        />
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={username}
        onChangeText={text => setUsername(text)}
        placeholder="ادخل اسم المستخدم"
      />

      <TextInput
        style={styles.input}
        value={gmail}
        onChangeText={text => setGmail(text)}
        placeholder="ادخل البريد الإلكتروني (Gmail)"
        keyboardType="email-address"
      />

      <TouchableOpacity onPress={saveUserProfile} style={styles.saveButton}>
        <Text style={styles.buttonText}>حفظ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6EB4A5',
  },
  profilePictureContainer: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 1,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 100
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 85,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    width: '80%',
    bottom: 106,
    fontWeight: 'bold',
    fontSize: 20
  },
  saveButton: {
    backgroundColor: '#12635C',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    bottom: 106,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomBar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    bottom: 209,
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
  }
});
