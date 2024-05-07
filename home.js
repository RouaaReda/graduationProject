import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet,ImageBackground, Button } from 'react-native';

export default function home({navigation}){
  

    return (
        <View style={styles.container}>
        <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton} onPress={()=>navigation.navigate('welcome')}>
            {/* Icon for Profile */}
            <Image source={require('./extra/back.png')} style={styles.image} resizeMode="contain"></Image>
          </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconButton} onPress={()=>navigation.navigate('profile')}>
            {/* Icon for Profile */}
            <Image source={require('./extra/user.png')} style={styles.image} resizeMode="contain"></Image>
            <Text style={styles.Text}>الحساب الشخصي</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.recentCallsContainer}>
          {/* Board-like display for recent calls */}
          <Text style={styles.recentCallsTitle}>المكالمات الفائتة</Text>
          {/* Display recent calls here */}
        </View>
        <View style={styles.bottomBar}>
          {/* Icon buttons for settings, profile, and report screens */}
          <TouchableOpacity style={styles.iconButton} onPress={()=>navigation.navigate('setting')}>
            {/* Icon for Settings */}
            <Image source={require('./extra/setting.png')} style={styles.image} resizeMode="contain"></Image>
            <Text style={styles.Text}>الاعدادات</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton} onPress={()=>navigation.navigate('callhistory')}>
          <Image source={require('./extra/report.png')} style={styles.image} resizeMode="contain"></Image>
            <Text style={styles.Text}>سجل المكالمات</Text>
          </TouchableOpacity>
        </View>
      </View>
  
    );//end return
}//end main

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
      backgroundColor: '#FFFFFF',
      paddingVertical: 10,
    },
    iconButton: {
      flex: 1,
      alignItems: 'center',
    },
    Text: {
      color: 'black',
      fontSize:15,
      fontWeight:'500',
      fontFamily: 'Arial',
    },
    image: {
      width:30 ,
      height: 30,
    }
  });

  