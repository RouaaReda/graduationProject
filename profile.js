import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import firebase from 'firebase/app';
import 'firebase/database';

export default function profile({ navigation }) {
  const [selectImage, setSelectImage] = useState('');
  const [username, setUsername] = useState('ادخل اسم المستخدم'); // Initial username
  const [editingUsername, setEditingUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(username);

  // Firebase configuration (initialize Firebase)
  const firebaseConfig = {
    // Your Firebase configuration details
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  // Function to save user data to Firebase
  const saveUserData = (userId, username, profilePicUrl) => {
    firebase.database().ref(`users/${userId}`).set({
      username: username,
      profilePicUrl: profilePicUrl
    });
  };

  // Function to handle saving the username
  const handleSaveUsername = () => {
    setUsername(newUsername); // Save the new username
    setEditingUsername(false); // Exit editing mode

    // Call saveUserData function to save user data to Firebase
    const userId = firebase.auth().currentUser.uid; // Get the current user's ID (you may need to handle user authentication)
    saveUserData(userId, newUsername, selectImage); // Pass the new username and profile picture URL to saveUserData
  };

  // Function to handle selecting an image from the gallery
  const ImagePicker = () => {
    let options = {
      storageOptions: {
        path: "image"
      }
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setSelectImage(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Profile picture */}
      <TouchableOpacity onPress={ImagePicker} style={styles.profilePictureContainer}>
        <Image source={{ uri: selectImage }} style={styles.profilePicture} />
      </TouchableOpacity>

      {/* Username input */}
      <TouchableOpacity onPress={() => setEditingUsername(true)}>
        {editingUsername ? (
          <TextInput
            style={styles.input}
            value={newUsername}
            onChangeText={text => setNewUsername(text)}
            autoFocus={true}
          />
        ) : (
          <Text style={styles.username}>{username}</Text>
        )}
      </TouchableOpacity>

      {/* Save changes button */}
      {editingUsername && (
        <TouchableOpacity onPress={handleSaveUsername} style={styles.saveButton}>
          <Text style={styles.buttonText}>حفظ التغييرات</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  profilePictureContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
