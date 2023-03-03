import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, BackHandler } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Profile({navigation}){

  const [name , setName] = useState('');
  const [no , setNo] = useState('');
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('')

  const [issignup , setIssignup] = useState(false)

  useEffect(()=>{
    fetchData();
    AsyncStorage.getItem('user').then((response)=>{
      console.log(response);
      if(response.includes('true')){
      setIssignup(true)
      }
    })
  },[])

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
      {issignup ? ( <View><Text style={Styles.heading}>Profile</Text>
        <Text style={Styles.fields}>name = {name}</Text>
        <Text style={Styles.fields}>no = {no}</Text>
        <Text style={Styles.fields}>email = {email}</Text>
        <Text style={Styles.fields}>password = {password}</Text>

<TouchableOpacity onPress={updateinStorage} style={Styles.btn}>
         <Text style={Styles.btntext}>Log out</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{navigation.navigate('Resetpswd',{name:name , no:no , password:password})}} style={Styles.btn}>
         <Text style={Styles.btntext}>Reset Password</Text>
        </TouchableOpacity></View>):(<View style={{alignSelf:'center'}}><Text style={{marginTop:100,fontSize:20 , color:'white' , fontWeight:'bold'}}>
          you must have log in or create an account</Text>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={Styles.btn1}>
            <Text style={Styles.btntext1}>Log in</Text>
         </TouchableOpacity>

         <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={Styles.btn2}>
            <Text style={Styles.btntext2}>Sign up</Text>
         </TouchableOpacity>
          </View>)}
       
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
        height:'15%',
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
     btn1: {
      width: 120,
      height: 50,
      backgroundColor: '#fd9827',
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: 20,
      marginTop: 50
   },
   btn2: {
      width: 120,
      height: 50,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: 20,
      marginTop: 50
   },
   btntext1: {
      color: "white",
      fontSize: 20,
   },
   btntext2: {
      color: "black",
      fontSize: 20,
   },
})