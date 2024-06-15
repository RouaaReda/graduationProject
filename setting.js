/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Switch, StyleSheet, I18nManager } from 'react-native';
import { useTranslation } from 'react-i18next';
import i18n from './i18next'; // Make sure the path matches where your i18n instance is configured
//import AsyncStorage from '@react-native-async-storage/async-storage';

export default function setting({ navigation }) {
    const { t } = useTranslation();
    const [notificationEnabled, setNotificationEnabled] = useState(true);

    // Load language from storage and set it during component mount
    useEffect(() => {
        loadLanguage();
    }, []);

    const toggleLanguage = async () => {
        const newLanguage = i18n.language === 'en' ? 'العربية' : 'en';
        await i18n.changeLanguage(newLanguage);
       // I18nManager.forceRTL(newLanguage === 'ar');
        await AsyncStorage.setItem('appLanguage', newLanguage); // Persist language preference
    };

    const loadLanguage = async () => {
        const storedLanguage = await AsyncStorage.getItem('appLanguage');
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
            I18nManager.forceRTL(storedLanguage === 'العربية');
        }
    };

    // Toggle notification switch
    const toggleNotification = () => {
        setNotificationEnabled(prev => !prev);
    };

    return (
        <View style={styles.container}>
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('home')}>
                    <Image source={require('./extra/back.png')} style={styles.image} resizeMode="contain" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Image source={require('./extra/setting.png')} style={styles.image} resizeMode="contain" />
                    <Text style={styles.Text}>{t('Settings')}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.settingsContainer}>
                <TouchableOpacity onPress={toggleLanguage}>
                    <Text style={[styles.settingItem, styles.settingText]}>
                        {t('Language')}: <Text style={[styles.settingValue, styles.settingText]}>{i18n.language.toUpperCase()}</Text>
                    </Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <View style={[styles.settingItem, { justifyContent: 'flex-end' }]}>
                    <Switch
                        value={notificationEnabled}
                        onValueChange={toggleNotification}
                        style={styles.switch}
                    />
                    <Text style={styles.settingText}>{t('Notifications')}:</Text>
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
    justifyContent: 'space-between', // Align items to the edges
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
