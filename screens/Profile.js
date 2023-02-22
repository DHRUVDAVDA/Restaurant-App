import React, { useEffect, useState } from "react";
import {StyleSheet, Text, View , Dimensions ,TouchableOpacity, BackHandler} from 'react-native'
import { getdata } from "../http/storedata";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Profile({navigation}){

  BackHandler.addEventListener('hardwareBackPress',handlebackbtn)
  function handlebackbtn(){
   navigation.goBack();
    return true;
  }

    function updateinStorage(){
        const localUserdata = {
          name: name,
          no:+no,
          email: email,
          password:password,
          issignup:'false'
        }
        AsyncStorage.setItem('user',JSON.stringify(localUserdata));
        console.log('locallllll',localUserdata);
        navigation.navigate('Firstscreen');
      }


    const [name , setName] = useState('');
    const [no , setNo] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('')

    useEffect(()=>{
        fetchData();
    })

    function fetchData(){
        try {
            AsyncStorage.getItem('user').then((response) =>
            { 
                let parsed  = JSON.parse(response);
              console.log(response);
             
        
              setName(parsed.name);
              setNo(parsed.no);
              setEmail(parsed.email);
              setPassword(parsed.password);
            });
          }
          catch (error) {
            console.log(error);
          }
    }

return(
    <View style={Styles.contailer}>
        <Text style={Styles.heading}>Profile</Text>
        {/* <Text style={Styles.fields}>name = {name}</Text>
        <Text style={Styles.fields}>no = {no}</Text> */}
        <Text style={Styles.fields}>email = {email}</Text>
        <Text style={Styles.fields}>password = {password}</Text>

        <TouchableOpacity onPress={updateinStorage} style={Styles.btn}>
         <Text style={Styles.btntext}>Log out</Text>
        </TouchableOpacity>
    </View>
)}
export default Profile;
const Styles = StyleSheet.create({
    contailer:{
      height:windowHeight,
      backgroundColor:'#100f1f'
    },
    heading:{
        fontSize:30,
        fontWeight:'bold',
        alignSelf:'center',
        marginTop:30
    },
    fields:{
        fontSize:20,
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