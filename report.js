import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, Linking, Alert } from 'react-native';

export default function Report({ route, navigation }) {
  const { phoneNumber, callData } = route.params;

  const [recipientEmail, setRecipientEmail] = useState('competentAuthirty@gmail.com');

  const determineCallType = (callData) => {
    if (callData.duration < 10) {
      return "مكالمة احتيالية";
    } else {
      return "مكالمة غير احتيالية";
    }
  };

  if (!callData) {
    return <Text>No call data available.</Text>;
  }

  const sendEmail = () => {
    const subject = 'Call Report Details';
    const body = `Call Details:\nNumber: ${phoneNumber}\nDuration: ${callData.duration} seconds\nDate: ${isNaN(new Date(callData.timestamp)) ? 'Invalid Date' : new Date(callData.timestamp).toLocaleString()}\nType: ${determineCallType(callData)}`;
    const mailtoUrl = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoUrl)
      .catch((err) => {
        Alert.alert('تنبيه', 'لا يمكن التعامل مع عنوان البريد الإلكتروني المحدد');
        console.error('An error occurred', err);
      });
  };

  const callType = determineCallType(callData);

  return (
    <View style={styles.container}>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('home')}>
          <Image source={require('./extra/back.png')} style={styles.image} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.Text}>تقرير المكالمة</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Image
          source={require('./extra/graph.png')}
          style={styles.gimage}
        />
      </View>

      <View style={styles.calldetails}>
        <Text style={styles.callText}>تفاصيل المكالمة</Text>
        <Text style={styles.callText}>الرقم: {phoneNumber}</Text>
        <Text style={styles.callText}>المدة: {callData.duration} ثانية</Text>
        <Text style={styles.callText}>التاريخ: {new Date(callData.timestamp).toLocaleString()}</Text>
        <Text style={styles.callText}>نوع المكالمة: {callType}</Text>

        <TouchableOpacity style={styles.sendButton} onPress={sendEmail}>
          <Text style={styles.buttonText}>ارسال عن طريق gmail</Text>
        </TouchableOpacity>
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
  callText: {
    color: 'black',
    fontSize: 25,
    fontWeight: '500',
    fontFamily: 'Arial',
    paddingBottom: 25,
  },
  image: {
    width: 50,
    height: 30,
  },
  calldetails: {
    top: 15,
  },
  Text: {
    color: 'black',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: 'Arial',
  },
  sendButton: {
    backgroundColor: '#12635C',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  gimage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    left: 60,
  }
});
