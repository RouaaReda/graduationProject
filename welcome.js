import { View, Text, Image, TouchableOpacity, StyleSheet,ImageBackground ,Button} from 'react-native';
import React from 'react'
//import i18next from './i18next';

export default function welcome({navigation}) {
    return (
        <ImageBackground  source={require('./extra/image3.jpg')} style={styles.backgroundImage} 
        imageStyle={{ opacity: 0.6 }}> 
      <View style={styles.container}>
        
        <Image
            source={require('./extra/image1.png')} // Set the source for your image
            style={styles.image} // Apply styles to the image
        />
        <Text style={styles.title}>نرحب بعملاءنا المستفيدين </Text> 
        <Text style={styles.subtitle}>نقدم لكم الحصانة التامة للرد على المكالمات الواردة بلا خوف او تردد</Text> 
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('home')}>
          <Text style={styles.buttonText}>لنبدأ التطبيق</Text> 
        </TouchableOpacity>
      </View>
      </ImageBackground>
    );//end return
}//end main

const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      
      
      
    },
    image: {
      width: 300,
      height: 300,
      resizeMode: 'contain',
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      color:'#010101',
      textShadowColor:'#010101',
      fontFamily:'Arial',
      fontWeight: 'bold',
      marginBottom: 10,
      fontWeight:'bold',
    },
    subtitle: {
      fontSize: 16,
      textShadowColor:'#010101',
      color: '#010101',
      marginBottom: 30,
      fontWeight:'bold',
    },
    button: {
      backgroundColor: '#16537E',
      paddingHorizontal: 30,
      paddingVertical: 20,
      borderRadius: 8,
    },
    buttonText: {
      color: '#ffffff',
      fontFamily:'Arial',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  
  