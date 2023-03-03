import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Alert, StyleSheet, Text } from 'react-native';
import Inputfield from "../components/Input";
import auth from '@react-native-firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

const Resetpswd = ({ navigation }) => {

    useEffect(() => {
        Get();
    }, [])

    const route = useRoute();

    const [name, setName] = useState('');
    const [no, setNo] = useState('');
    const [email, seEmail] = useState('');
    const [password , setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [emailError, setEmailError] = useState();
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');

    async function Get() {
        const name = await route.params?.name;
        const no = route.params?.no;
        const password =route.params?.password;
        setName(name);
        setNo(no);
        setPassword(password);
        console.log('heyy', name);
    }

    function storeinStorage() {
        const localUserdata = {
            name: name,
            no: no,
            email: email,
            password: newPassword,
            issignup: 'true'
        }
        AsyncStorage.setItem('user', JSON.stringify(localUserdata));
        navigation.navigate('profile');
        console.log('locallllll', localUserdata);

    }


    function Updatepswd() {

        var emailValid = false;
        if (email.length == 0) {
            setEmailError("Email is required");
        }
        else if (email.length < 6) {
            setEmailError("Email should be minimum 6 characters");
        }
        else if (email.indexOf(' ') >= 0) {
            setEmailError('Email cannot contain spaces');
        }
        else {
            setEmailError("")
            emailValid = true
        }

        var oldPasswordValid = false;
        if (oldPassword.length == 0) {
            setOldPasswordError('old password required')
        }
        else if(oldPassword !== password){
            setOldPasswordError("password doesn't match")
        }
        else {
            setOldPasswordError('')
            oldPasswordValid = true
        }

        var newPasswordValid = false;
        if (newPassword.length == 0) {
            setNewPasswordError('new password required')
        }
        else {
            setNewPasswordError('')
            newPasswordValid = true
        }

        if (emailValid && oldPasswordValid && newPasswordValid) {
           
            auth().signInWithEmailAndPassword(email , oldPassword)
        const user = (auth().currentUser);
        user.updatePassword(newPassword)
            .then(storeinStorage())
            
            .catch((error)=>{
               if(error.code.includes('The password is invalid or the user does not have a password.'))
               {
                setNewPasswordError('invalid password')
               }
               else{
                navigation.navigate('profile')
               }
            });
        }

    }

    return (
        <View style={{ flex: 1, backgroundColor: '#100f1f' }}>
            <View>
                <Inputfield
                    value={email}
                    onChangeText={(text) => seEmail(text)}
                    placeholder={"enter your email"} />
            </View>
            {emailError &&
                <Text style={{ color: 'red', marginLeft: 20 }}>{emailError}</Text>
            }

            <View>
                <Inputfield
                    value={oldPassword}
                    onChangeText={(text) => setOldPassword(text)}
                    placeholder='enter old password' />
            </View>
            {oldPasswordError &&
                <Text style={{ color: 'red', marginLeft: 20 }}>{oldPasswordError}</Text>
            }

            <View>
                <Inputfield
                    value={newPassword}
                    onChangeText={(text) => setnewPassword(text)}
                    placeholder='enter new password' />
                     </View>
                     {newPasswordError &&
                <Text style={{ color: 'red', marginLeft: 20 }}>{newPasswordError}</Text>
            }    

                <TouchableOpacity onPress={Updatepswd} style={Style.btn}>
                    <Text style={Style.btntext}>Submit</Text>
                </TouchableOpacity>
           

        </View>
    )
}
export default Resetpswd;
const Style = StyleSheet.create({
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