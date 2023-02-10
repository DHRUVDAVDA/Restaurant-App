import React from "react"
import { Image, StyleSheet, Text, View ,TextInput, ScrollView , TouchableOpacity } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Dimensions} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import Punjabi from "./Punjabi";
import { useState } from "react";

const App = ({navigation}) =>{
 const [name , setName] = useState("restaurant")

  const BottomTab = createBottomTabNavigator();
  const windowWidth = Dimensions.get('window').width;

 const handleToggle=()=>{
    if(name=="restaurant"){
      setName("welcome")
    }
    else{
      setName("restaurant")
    }
  }


  return(
 <View style={Styles.container}>
  <TouchableOpacity onPress={handleToggle}>
    <Text style={Styles.header}>{name} </Text>
    </TouchableOpacity>
    <TextInput style={Styles.search} placeholder="search you favourite food"></TextInput>
    <View>
    <ScrollView horizontal={true} pagingEnabled={true} style={{marginTop:10}}>
      
      <Image
      style={{width:windowWidth, height:200}}
      source={require("./sale.png")}
      />
       <Image 
      style={{width:windowWidth, height:200}}
      source={require("./sale.png")}
      />
    </ScrollView>
    </View>
    <Text style={Styles.dishes}>Dishes</Text>
    <ScrollView style={{marginTop:10}}>
        <View style={{flexDirection:'row',justifyContent:'center'}}>
        <TouchableOpacity onPress={()=> navigation.navigate(Punjabi) }>
            <View style={{height:windowWidth/2-10 , width:windowWidth/2-10 , backgroundColor:'red',marginRight:5}}></View>
            </TouchableOpacity>
            <View style={{height:windowWidth/2-10 , width:windowWidth/2-10 , backgroundColor:'red'}}></View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
            <View style={{height:windowWidth/2-10 , width:windowWidth/2-10 , backgroundColor:'red',marginRight:5}}></View>
            <View style={{height:windowWidth/2-10 , width:windowWidth/2-10 , backgroundColor:'red'}}></View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
            <View style={{height:windowWidth/2-10 , width:windowWidth/2-10 , backgroundColor:'red',marginRight:5}}></View>
            <View style={{height:windowWidth/2-10 , width:windowWidth/2-10 , backgroundColor:'red'}}></View>
        </View>
    </ScrollView>
 </View>
  )
};

const Styles = StyleSheet.create({
  container:{
    flex:1
  },
  header:{
    fontSize:20,
    alignSelf:'center',
    marginTop:5
  },
  search:{
    borderColor:'black',
    borderWidth:1,
    height:40,
    paddingLeft:5,
    borderRadius:10,
    margin:10
  },
  dishes:{
    fontSize:20,
    alignSelf:'center',
    marginTop:10
  }
})

export default App
