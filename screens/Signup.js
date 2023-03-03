import React, { useState } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView, Alert, TextInput, TouchableOpacity, StatusBar } from "react-native";
import { storeUser } from "../http/storedata";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from '@react-native-firebase/auth'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function Signup({ navigation }) {

    const [name, setName] = useState('');
    const [no, setNo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [noError, setNoError] = useState();
    const [nameError, setNameError] = useState();
    const [emailError, setEmailError] = useState();
    const [passError, setPassError] = useState();


    function storeinStorage() {                               //OBJECT WILL BE STORED IN ASYNC STORAGE
        const localUserdata = {
            name: name,
            no: +no,
            email: email,
            password: password,
            issignup: 'true'
        }
        AsyncStorage.setItem('user', JSON.stringify(localUserdata));     //SETTING DATA IN ASYNC STORAGE
        console.log('locallllll', localUserdata);

    }

    function signuphandler() {
        const userData = {
            name: name,
            no: +no,
            email: email,
            password: password,
            issignup: 'true'
        };

        var nameValid = false;
        if (name === '') {
            setNameError('Enter valid name')
        }
        else {
            setNameError('');
            nameValid = true
        }

        var noValid = false;
        if (no.length < 10) {
            setNoError('Enter minimum 10 letter')
        }
        else {
            setNoError('');
            noValid = true;
        }


        var emailValid = false;
        if(email.length == 0){
            setEmailError("Email is required");
        }        
        else if(email.length < 6){
            setEmailError("Email should be minimum 6 characters");
        }      
        else if(email.indexOf(' ') >= 0){        
            setEmailError('Email cannot contain spaces');                          
        }    
        else{
            setEmailError("")
            emailValid = true
        }

        var passwordValid = false;
        if (password === '' || password.length < 6) {
            setPassError('Enter valid password with minimum 6 letters which includes special characters , alphabets , numbers')
        }
        else {
            setPassError('');
            passwordValid = true
        }

        if (nameValid && noValid && emailValid && passwordValid) {
            auth().createUserWithEmailAndPassword(email, password)
            .then(()=>{ navigation.navigate('Toptab')
            storeinStorage();
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              setEmailError('That email address is already in use!');
            }
        
            if (error.code === 'auth/invalid-email') {
              setEmailError('That email address is invalid!');
            }
        
            console.error(error);
          });
        }
    }

    return (
        <ScrollView>
            <StatusBar backgroundColor="#100f1f" />
            <View style={Styles.container}>

                <Text style={Styles.heading}>Create a new account</Text>

                <Text style={Styles.loginheading}>Sign_up</Text>

                <View>
                    <TextInput
                        placeholder="name"
                        placeholderTextColor="white"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={Styles.inputfield}
                    />
                </View>
                {nameError &&
                    <Text style={{ color: 'red', marginLeft: 20 }}>{nameError}</Text>
                }

                <View>
                    <TextInput
                        placeholder="Enter your no."
                        placeholderTextColor="white"
                        keyboardType={"number-pad"}
                        value={no}
                        onChangeText={(text) => setNo(text)}
                        style={Styles.inputfield}
                    />
                </View>
                {noError &&
                    <Text style={{ color: 'red', marginLeft: 20 }}>{noError}</Text>
                }

                <View>
                    <TextInput
                        placeholder="Enter your email"
                        placeholderTextColor="white"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={Styles.inputfield}
                    />
                </View>
                {emailError &&
                    <Text style={{ color: 'red', marginLeft: 20 }}>{emailError}</Text>
                }

                <View>
                <TextInput
                    placeholder="Enter password"
                    placeholderTextColor="white"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    style={Styles.inputfield}
                />
                </View>
                {passError &&
                    <Text style={{ color: 'red', marginLeft: 20 }}>{passError}</Text>
                }


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
        justifyContent: 'center'
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
    inputfield: {
        borderRadius: 10,
        borderBottomWidth: 1,
        borderColor: 'white',
        margin: 20,
        padding: 10,
        color: 'white'
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
