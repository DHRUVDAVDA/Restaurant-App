import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions, Button, Image, ScrollView , Alert ,TextInput , TouchableOpacity, StatusBar } from "react-native"
import { storeUser } from "../http/storedata";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { async } from "@firebase/util";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function Signup({navigation}) {

    const [name , setName] = useState('');
    const [no , setNo] = useState('');
    const [email, setEmail] = useState('');
    const [password , setPassword] = useState('');
   

     function storeinStorage(){
      const localUserdata = {
        name: name,
        no:+no,
        email: email,
        password:password,
        issignup:'true'
      }
      AsyncStorage.setItem('user',JSON.stringify(localUserdata));
      console.log('locallllll',localUserdata);
     
    }

    function signuphandler(){
        const userData = {
            name: name,
            no:+no,
            email: email,
            password:password,
            issignup:'true'
        };
        
        if( userData.name === "" || userData.no === "" || userData.email === "" || userData.password === ""){
           Alert.alert("enter valid detail")
          
        }
        else{
           
            console.log('uploaded on firebase',userData);
            storeUser(userData , storeinStorage()); 
            navigation.navigate('Tobtab');
        }
    }

    return (
        <ScrollView>
             <StatusBar backgroundColor="#100f1f"/>
        <View style={Styles.container}>
       
            <Text style={Styles.heading}>Create a new account</Text>
        
            <Text style={Styles.loginheading}>Sign_up</Text>
            
            <TextInput 
            placeholder="name" 
            placeholderTextColor="white"
            value={name} 
            onChangeText={(text)=>setName(text)} 
            style={Styles.inputfield}
            />

            <TextInput 
            placeholder="enter your no." 
            placeholderTextColor="white"
            value={no} 
            onChangeText={(text)=>setNo(text)} 
            style={Styles.inputfield}
            />

            <TextInput 
            placeholder="enter  your email"
            placeholderTextColor="white" 
            value={email} 
            onChangeText={(text)=>setEmail(text)}
            style={Styles.inputfield} 
            />

            <TextInput 
            placeholder="enter password" 
            placeholderTextColor="white"
            value={password} 
            onChangeText={(text)=>setPassword(text)}
            style={Styles.inputfield} 
            />

        <TouchableOpacity onPress={signuphandler} style={Styles.btn}>
         <Text style={Styles.btntext}>Sign up</Text>
        </TouchableOpacity>
       
        </View>
        </ScrollView>
    )
}
export default Signup;
const Styles = StyleSheet.create({
    container: {
        height: windowHeight,
        backgroundColor: '#100f1f',
    justifyContent:'center'    
    },
    heading: {
        fontSize: 15,
        alignSelf: 'center',
        marginTop: '2%',
        fontStyle: 'italic',
        color: 'white'
    },
    loginheading: {
        fontSize: 50,
        alignSelf: 'center',
        marginTop: 10,
        color: 'white'
    },
    signupbox: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 30
    },
    signuptext: {
        color: 'red'
    },
    image: {
        height: 20,
        opacity: 0.3,
        alignSelf: 'center'
    },
    inputfield:{
        borderRadius:10,
        borderBottomWidth:1,
        borderColor:'white',
        margin:20,
        padding:10,
        color:'white'
    },
    btn:{
        width:'45%',
        height:'7%',
        backgroundColor:'#fd9827',
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center',
        borderRadius:20,
        marginTop:'10%'
     },
     btntext:{
        color:"white",
        fontSize:20,
     },
})
