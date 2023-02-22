import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { async } from "@firebase/util";
import Video from 'react-native-video'
import LottieView from 'lottie-react-native'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Splash({ navigation }) {

  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('user').then((response) => {
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
    }, 3000)
  })

  return (console.log('splash'),
    <View style={Style.container}>
      <LottieView source={require('../Images/splash.json')}
        autoPlay
        loop={false}
        resizeMode='cover'
        onAnimationFinish={() => {
          console.log('animation finished')
        }}
       />
    </View>
  )
}
export default Splash;
const Style = StyleSheet.create({
  container: {
    height: windowHeight
  },
  Video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 1
  }
})