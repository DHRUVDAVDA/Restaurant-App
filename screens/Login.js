import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Alert, StatusBar } from "react-native";
import Inputfield from "../components/Input";
import { getdata } from "../http/storedata";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from '@react-native-firebase/auth'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function Login({ navigation }) {

   useEffect(() => {
      AsyncStorage.getItem('user').then((response) => {
         let parsed = JSON.parse(response);
         console.log(parsed);
         setName(parsed.name);
         setNo(parsed.no);
      })

   }, [])

   const [name, setName] = useState('');
   const [no, setNo] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [emailError, setEmailError] = useState('');
   const [passwordError, setPasswordError] = useState('');


   function storeinStorage() {
      const localUserdata = {
         name: name,
         no: no,
         email: email,
         password: password,
         issignup: 'true'
      }
      AsyncStorage.setItem('user', JSON.stringify(localUserdata));
      console.log('log in', localUserdata);

   }

   async function Authentication() {
      // const usersdata = await getdata();
      // console.log('userdataaaa', usersdata);
      // const Email = usersdata.some(x => x.email === email);
      // console.log("resssssss", Email);
      // const Password = usersdata.some(x => x.password === password);
      // console.log('passsss', Password);

      // if (Email === true && Password === true) {
      //    navigation.navigate('Toptab');
      //    storeinStorage();
      // }
      // else {
      //    Alert.alert("enter valid detail")
      // }

      var emailValid = false;
      if (email.length === 0) {
         setEmailError('Email required')
      }
      else {
         setEmailError('');
         emailValid = true;
      }

      var passwordValid = false;
      if (password.length === 0) {
         setPasswordError('Password required')
      }
      else {
         setPasswordError('');
         passwordValid = true;
      }


      if (emailValid && passwordValid) {

         auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
               navigation.navigate('Toptab')
               storeinStorage();
            })
            .catch((error) => {
              if(error.code.includes('user-not-found')){
               setEmailError('wrong email')
              }
             else if(error.code.includes('wrong-password')){
               setPasswordError('wrong password')
             }
             else{
               storeinStorage();
               navigation.navigate('Homescreen')
             }
            })

      }
   }



   function Forgotpswd() {
      navigation.navigate("Createnewpswd", {
         email
      });
   }


   return (
      <ScrollView>
         <View style={Styles.container}>

            <StatusBar backgroundColor="#100f1f" />
            <Text style={Styles.loginheading}>Log_in</Text>

            <View>
               <Inputfield
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholder='enter your email' />
            </View>
            {emailError &&
               <Text style={{ color: 'red', marginLeft: 20 }}>{emailError}</Text>
            }


            <View>
               <Inputfield
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  placeholder='enter your password' />
            </View>
            {passwordError &&
               <Text style={{ color: 'red', marginLeft: 20 }}>{passwordError}</Text>
            }

            <TouchableOpacity onPress={Authentication} style={Styles.btn}>
               <Text style={Styles.btntext}>Log in</Text>
            </TouchableOpacity>

            <View style={Styles.signupbox}>
               <Text style={Styles.signupsentence}>Don't have an account?</Text>
               <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text style={Styles.signuptext}>  Sign up</Text>
               </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={Forgotpswd}>
               <Text style={Styles.forgot}>forgot password</Text>
            </TouchableOpacity>
         </View>
      </ScrollView>
   )
}
export default Login;
const Styles = StyleSheet.create({
   container: {
      height: windowHeight,
      backgroundColor: '#100f1f',
      flex: 1,
      justifyContent: 'center'
   },
   heading: {
      fontSize: 15,
      alignSelf: 'center',
      fontStyle: 'italic',
      color: 'white'
   },
   loginheading: {
      fontSize: 50,
      alignSelf: 'center',
      color: 'white'
   },
   button: {
      width: windowWidth / 3,
      alignSelf: 'center',
   },
   signupbox: {
      flexDirection: 'row',
      alignSelf: 'center',
      marginTop: 60,
   },
   signuptext: {
      color: 'lightblue'
   },
   signupsentence: {
      color: 'white'
   },
   forgot: {
      alignSelf: 'center',
      fontSize: 15,
      color: 'lightblue',
      marginTop: 20
   },
   btn: {
      width: '45%',
      height: '7%',
      backgroundColor: '#fd9827',
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: 20,
      marginTop: '10%'
   },
   btntext: {
      color: "white",
      fontSize: 20,
   },
})
