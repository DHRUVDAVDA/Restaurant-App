import React from "react";
import {View , Text ,TextInput , StyleSheet} from "react-native"

function Inputfield({placeholder , value , onChangeText}){
    return(
        <View >
          <TextInput style={Styles.field} placeholder={placeholder} value={value} onChangeText={onChangeText} placeholderTextColor='white'/>
        </View>
    )
}
export default Inputfield;
const Styles=StyleSheet.create({
   field:{
    fontSize:15,
    borderRadius:10,
    margin:20,
    marginTop:20,
    padding:10,
    color:'white',
    borderColor:'white',
    borderBottomWidth:1,
   }
})