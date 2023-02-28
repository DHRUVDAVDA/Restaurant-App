import React, { useState } from "react";
import { TextInput, View, StyleSheet, Dimensions, Text, TouchableOpacity, Alert, PermissionsAndroid, BackHandler } from "react-native";
import { getFooddata, getImg, storeData } from "../http/storedata";

import { storage, storageRef } from "../firebase/Firebaseconfig";
import { uploadBytes , getDownloadURL } from 'firebase/storage'
import { launchImageLibrary } from "react-native-image-picker";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



function Upload() {

    const [foodname, setFoodname] = useState('');
    const [foodprice, setFoodprice] = useState('');
    const [restname, setRestname] = useState('');
    const [restadd, setRestadd] = useState('');
    const [foodcat, setFoodcat] = useState('');
    const [image, setImage] = useState('');
    const [imgname, setImgname] = useState('image name');
    const [url, setUrl] = useState('');


    function Submit() {

        BackHandler.addEventListener('hardwareBackPress',handlebutton)
        function handlebutton(){
            BackHandler.goBack();
            return true
        }

        if (image === '') {
            Alert.alert("select image")
        }
        else {
            const foodData = {
                foodname,
                foodprice,
                foodcat,
                restname,
                restadd,
                url,
                quantity:1

            }
            console.log('fooddddddd', foodData);
          setTimeout(()=>{
            storeData(foodData);
          },5000)
        handleUpload();
        }
    }
    
    const selectImgalert = async () => {
        Alert.alert(
            'Upload Profile Picture',
            ' ',
            [
                {
                    text: 'select from gallery',
                    onPress: () => ImagePicker()
                },
                {
                    text: 'click from camera',
                    onPress: () => grantPermission()
                },
            ],
            { cancelable: true },
        );
    };

    const ImagePicker = async () => {
        // ImagePicker.openPicker({
        //     width: 200,
        //     height: 200,
        //     cropping: true
        // }).then(image => {

        //     console.log("selected image", image)
        //     setImage({
        //         uri: image.path,
        //         width: image.width,
        //         height: image.height,
        //         mime: image.mime,
        //     })
        //     const fn = image.path.substring(image.path.lastIndexOf('/') + 1);
        //     setImgname(fn)
        //     console.log(image.path);
           
        // })
         const result = launchImageLibrary({
            mediaType:'photo',
            quality:1,
         }).then(res => {
            if(!res.didCancel){
                setImage(res.assets[0].uri);
                setImgname(res.assets[0].fileName)
                console.log(res);
                console.log(res.assets[0].uri);
            }
         })
    }
    const handleUpload = async () => {
        const response = await fetch(image);
        const blob = await response.blob();

        const reference = storageRef(storage,`images/${imgname}`);

        uploadBytes(reference , blob).then((snapshot)=>{
            console.log('uploaded');
            getDownloadURL(snapshot.ref).then((downloadUrl)=>{
             console.log('download url',downloadUrl);
             setUrl(downloadUrl);
            })
        })
    }

    //   const picImg = async () => {
    //     try {
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.CAMERA,
    //         {
    //           title: "Cool Photo App Camera Permission",
    //           message:
    //             "Cool Photo App needs access to your camera " +
    //             "so you can take awesome pictures.",
    //           buttonNeutral: "Ask Me Later",
    //           buttonNegative: "Cancel",
    //           buttonPositive: "OK"
    //         }
    //       );
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         console.log("You can use the camera");
    //       } else {
    //         console.log("Camera permission denied");
    //       }
    //     } catch (err) {
    //       console.warn(err);
    //     }
    //     ImagePicker.openPicker({
    //       width: 200,
    //       height: 200,
    //       cropping: true
    //     }).then(image => {

    //       console.log("selected image" , image)
    //       setImage({
    //         uri: image.path,
    //         width: image.width,
    //         height: image.height,
    //         mime: image.mime,
    //       })
    //       const fn = image.path.substring(image.path.lastIndexOf('/')+1);
    //       setImgname(fn)
    //     })

    //   };
    //   const uploadImg = async () => {
    //     console.log("iamgeeee",image);
    //     const data = new FormData();
    //     data.append('name', {
    //       uri: image.uri,
    //       type: image.mime,
    //       name: imgname
    //     });
    // console.log("dataaaa",data);
    //     const res = await fetch(
    //       `https://firebasestorage.googleapis.com/v0/b/restaurant-app-ca9a9.appspot.com/o/${imgname}?uploadType=media`,
    //       {
    //         method: 'post',
    //         body: data,
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //           'Authorization': 'Bearer '
    //         },
    //       });
    //       let responseupload = await res.json();
    //       console.log("resppppppppppppp upload",JSON.stringify(responseupload));
    //       console.log("firebase url",res.url);
    //   };
    return (
        <View style={Styles.container}>
            <Text style={Styles.head}>ADD DATA</Text>
            <TextInput
                value={foodname}
                onChangeText={(text) => setFoodname(text)}
                placeholder="food name"
                placeholderTextColor='white'
                style={Styles.inputfield} />

            <TextInput
                value={foodprice}
                onChangeText={(text) => setFoodprice(text)}
                placeholder="food price"
                placeholderTextColor='white'
                style={Styles.inputfield} />

            <TextInput
                value={foodcat}
                onChangeText={(text) => setFoodcat(text)}
                placeholder="food category"
                placeholderTextColor='white'
                style={Styles.inputfield} />

            <TextInput
                value={restname}
                onChangeText={(text) => setRestname(text)}
                placeholder="restaurant name"
                placeholderTextColor='white'
                style={Styles.inputfield} />

            <TextInput
                value={restadd}
                onChangeText={(text) => setRestadd(text)}
                placeholder="restaurant address"
                placeholderTextColor='white'
                style={Styles.inputfield} />

            <TouchableOpacity onPress={selectImgalert} style={Styles.btn1}>
                <Text style={Styles.btntext1}>Choose image</Text>
            </TouchableOpacity>

            <Text style={Styles.imagename}>{imgname}</Text>
            <Text style={Styles.imagename}>{url}</Text>

            <TouchableOpacity onPress={Submit} style={Styles.btn1}>
                <Text style={Styles.btntext1}>UPLOAD DATA</Text>
            </TouchableOpacity>
        </View>


    )
};
export default Upload;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#100f1f'
    },
    head: {
        fontSize: 20,
        color: 'white',
        alignSelf: "center",
        marginTop: 20
    },
    inputfield: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 20,
        padding: 10,
        margin: 20,
        color:'white'
    },
    imagename: {
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 10,
        color: 'white'
    },
    btn1: {
        width: '45%',
        height: '5%',
        backgroundColor: '#fd9827',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 10
    },
})