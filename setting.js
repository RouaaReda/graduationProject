import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Switch, StyleSheet } from 'react-native';

export default function setting({ navigation }) {
  const [language, setLanguage] = useState('English');
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  const toggleLanguage = () => {
    setLanguage(language === 'English' ? 'Arabic' : 'English');
  };

  const toggleNotification = () => {
    setNotificationEnabled((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('home')}>
          <Image source={require('./extra/back.png')} style={styles.image} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={require('./extra/setting.png')} style={styles.image} resizeMode="contain" />
          <Text style={styles.Text}>الاعدادات</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingsContainer}>
        <TouchableOpacity onPress={toggleLanguage}>
          <Text style={[styles.settingItem, styles.settingText]}>
            اللغة: <Text style={[styles.settingValue, styles.settingText]}>{language}</Text>
          </Text>
        </TouchableOpacity>
        <View style={styles.separator} />
        <View style={[styles.settingItem, { justifyContent: 'flex-end' }]}>
          <Switch
            value={notificationEnabled}
            onValueChange={toggleNotification}
            style={styles.switch}
          />
          <Text style={styles.settingText}>الاشعارات:</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6EB4A5',
  },
  bottomBar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
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
  settingsContainer: {
    width: '80%',
    justifyContent: 'space-between',
    top: 30,
    left: 30,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingValue: {
    fontWeight: 'normal',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  switch: {
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    right: 10,
  },
});
