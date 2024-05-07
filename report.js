import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function report({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('callhistory')}>
          {/* Icon for Profile */}
          <Image source={require('./extra/back.png')} style={styles.image} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          {/* Icon for Profile */}
          <Text style={styles.Text}>صفحة التقارير</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.recentCallsContainer}>
        {/* Board-like display for recent calls */}
        <Text style={styles.recentCallsTitle}>عرض التقارير</Text>
        {/* Display recent calls here */}
      </View>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.Text}>ارسال التقرير</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6EB4A5',
  },
  recentCallsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  recentCallsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  }
});
