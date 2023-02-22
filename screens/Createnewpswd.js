import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions, Button, TouchableOpacity, Image, ScrollView, Alert, StatusBar } from "react-native"
import Inputfield from "../components/Input";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getdata, updatePassword } from "../http/storedata";
import { useRoute } from "@react-navigation/native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Login({ navigation }) {

    const route = useRoute();

    const [email, seEmail] = useState('');
    const [pswd, setPswd] = useState('');

    async function Updatepswd(userData) {

        const usersdata = await getdata();
        console.log(usersdata);

        const result = usersdata.filter(x => x.email === email);
        const resulttruefalse = usersdata.some(x => x.email === email);
        console.log("resssssss", result);

        const item = usersdata.find(x => x.email === email);
        console.log('itemmmm',item);
       if(item){
        item.password = pswd;
        const id= item.id;
        updatePassword(id,item);   
    }
       

        if (resulttruefalse === true) {
            console.log(result);
            navigation.navigate('Toptab');
        } else {
            Alert.alert("enter valid email")
        }



    }
    return (
        <View style={Styles.container}>
             <StatusBar backgroundColor="#100f1f"/>
            <Text style={Styles.heading}>Create new password</Text>

            <Inputfield
                value={email}
                onChangeText={(text) => seEmail(text)}
                placeholder={"enter your email"} />

            <Inputfield
                value={pswd}
                onChangeText={(text) => setPswd(text)}
                placeholder={"enter new password"} />

            <TouchableOpacity onPress={Updatepswd} style={Styles.btn}>
                <Text style={Styles.btntext}>Submit</Text>
            </TouchableOpacity>
            
        </View>
    )
}
export default Login;
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#100f1f',
        justifyContent: 'center'
    },
    heading: {
        alignSelf: 'center',
        color: 'white',
        fontStyle: 'italic',
        fontSize: 15,
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
