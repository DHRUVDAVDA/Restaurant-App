import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Alert, StatusBar } from "react-native";
import Inputfield from "../components/Input";
import { getdata } from "../http/storedata";
import AsyncStorage from "@react-native-async-storage/async-storage";

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


   function storeinStorage() {
      const localUserdata = {
         name: name,
         no: no,
         email: email,
         password: password,
         issignup: 'true'
      }
      AsyncStorage.setItem('user', JSON.stringify(localUserdata));
      console.log('locallllll', localUserdata);

   }

   async function Authentication() {
      const usersdata = await getdata();
      console.log('userdataaaa', usersdata);
      const result = usersdata.some(x => x.email === email);
      console.log("resssssss", result);
      const resul = usersdata.some(x => x.password === password);
      console.log('passsss', resul);

      if (result === true && resul === true) {
         navigation.navigate('Toptab');
         storeinStorage();
      }
      else {
         Alert.alert("enter valid detail")
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

            <Inputfield
               value={email}
               onChangeText={(text) => setEmail(text)}
               placeholder='enter your email' />

            <Inputfield
               value={password}
               onChangeText={(text) => setPassword(text)}
               placeholder='enter your password' />

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
