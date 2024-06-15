import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, PermissionsAndroid } from 'react-native';
import CallLogs from 'react-native-call-log';
import { useNavigation } from '@react-navigation/native';
import report from './report';

export default function callhistory() {
  const [callLogs, setCallLogs] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCallLogs = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
          {
            title: 'Call Log Example',
            message: 'Access your call logs',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          const logs = await CallLogs.load(7); 
          setCallLogs(logs);
        } else {
          console.log('Call Log permission denied');
        }
      } catch (error) {
        console.error('Error fetching call logs:', error);
      }
    };

    fetchCallLogs();
  }, []);

  const handleCallPress = (callData) => {
    if (callData) {
      console.log("Call data:", callData); // Log the call data
      // Navigate to the call report screen with the selected call data
      navigation.navigate('report', { phoneNumber: callData.phoneNumber, callData });
    } else {
      console.warn("Call data is undefined");
    }
  };
  
  
  

  const renderItem = ({ item }) => {
    const durationSeconds = item.duration;
    const callDate = new Date(item.timestamp);
    const formattedDate = callDate.toLocaleString();
    const callType = item.callType === "2" ? "مكالمة احتيالية" : "مكالمة غير احتيالية";

    return (
      
      
        <TouchableOpacity style={styles.callItem} onPress={() => handleCallPress(item)}>

       <View style={styles.callInfo}>
        <Text style={styles.callNumber}>{item.phoneNumber}</Text>
        <Text style={[styles.label, styles.labelRight]}>الرقم:</Text>
       </View>
        
        <View style={styles.callInfo}>
           <Text style={styles.callValue}>{durationSeconds} ثانية</Text>
          <Text style={[styles.label, styles.labelRight]}>المدة:</Text>
          
        </View>
        <View style={styles.callInfo}>
          <Text style={styles.callValue}>{formattedDate}</Text>
          <Text style={[styles.label, styles.labelRight]}>التاريخ:</Text>
        </View>

        <View style={styles.callInfo}>
          <Text style={styles.callValue}>{callType}</Text>
          <Text style={[styles.label, styles.labelRight]}>نوع المكالمة:</Text>
        </View>

      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.Topcontainer}>
    <View style={styles.bottomBar}>
      <TouchableOpacity style={styles.iconButton} onPress={()=>navigation.navigate('home')}>
          {/* Icon for Profile */}
          <Image source={require('./extra/back.png')} style={styles.image} resizeMode="contain"></Image>
        </TouchableOpacity>
      
      <TouchableOpacity style={styles.iconButton}>
          {/* Icon for Profile */}
          
          <Text style={styles.Text}>سجل المكالمات</Text>
        </TouchableOpacity>
      </View>


    
    <View style={styles.container}>
      <View style={styles.recentCallsContainer}>
        <FlatList
          data={callLogs}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
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
  recentCallsContainer: {
    flex: 1,
    paddingHorizontal: 30,
    top:10,
  },
  callItem: {
    backgroundColor: '#fff', // Change background color
    paddingVertical: 10, // Adjust vertical padding
    paddingHorizontal: 20, // Adjust horizontal padding
    marginBottom: 10,
    borderRadius: 10, // Add border radius
    elevation: 3, // Add shadow for Android
  },
  callInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  labelRight: {
    textAlign: 'left',
    color:'black'
  },
  callNumber: {
    fontSize: 16,
    color: '#0066CC',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
  callValue: {
    fontSize: 16,
    color: '#444',
  },
  Topcontainer:{
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bottomBar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
  },
  image: {
    width:30 ,
    height: 30,
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


});
