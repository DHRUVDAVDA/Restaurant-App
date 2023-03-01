import React, { useEffect } from "react";
import { StyleSheet, View, Dimensions, Text, StatusBar } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Lottie from 'lottie-react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Splash({ navigation }) {

  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('user').then((response) => {           //GETTING STORED DATA OF USER FROM ASYNC STORAGE FOR AUTO LOGIN
        console.log(response);
        if (response === null) {
          navigation.navigate('Firstscreen')
        }
        else if (response.includes('true')) {
          navigation.navigate('Toptab')
        }
        else {
          navigation.navigate('Firstscreen')
        }
      });
    }, 4000)
  })

  return (console.log('splash'),
    <View style={Style.container}>
      <StatusBar backgroundColor={'lightblue'} />
      <View style={{ height: 400, width: 400 }}>

        <Lottie source={require('../Images/splash2.json')}
          autoPlay
          loop={true}
          resizeMode='cover'
        />
      </View>
      <Text style={Style.txt}>Foodie</Text>
    </View>
  )
}
export default Splash;
const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    alignItems: 'center'
  },
  txt: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#fd9827',
    textShadowColor: 'white',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    shadowOpacity: 0.5,
    position: 'absolute',
    bottom: windowHeight / 3.6
  }
})