import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text, Image, BackHandler, ActivityIndicator, TouchableOpacity } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Restaurantdetail = ({ navigation, route }) => {

    useEffect(() => {
        getData();
    }, [])

    const [fetching, setFetching] = useState(true);
    const [data, setData] = useState();
    const [url, setUrl] = useState();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();


    BackHandler.addEventListener('hardwareBackPress', handlebackbtn)
    function handlebackbtn() {
        navigation.goBack();
        return true;
    }

    async function getData() {
        const item = await route.params?.item;
        const photo = await route.params?.url;
        setUrl(photo);
        console.log(item);
        setLat(item.geometry.location.lat);
        setLng(item.geometry.location.lng)
        setData(item);
        setFetching(false);
    }
    return (
        <View style={Style.container}>

            {fetching ? (<View><ActivityIndicator size={"large"} color={'#fd9827'} /></View>) : (
                <View style={Style.container}>
                    <View style={Style.head}>
                        <Text style={Style.headtxt}>{data.name.toUpperCase()}</Text>
                    </View>
                    <Image style={Style.resimg} source={{ uri: url }} />
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={Style.ratingtxt}>Rating - </Text>
                        <Text style={Style.txt}>⭐{data.rating}</Text>
                    </View>
                    <View style={{ width: '70%', flexDirection: 'row', marginTop: 10 }}>
                        <Text style={Style.ratingtxt}>Address - </Text>
                        <Text style={Style.txt}>{data.vicinity}</Text>
                    </View>

                    <TouchableOpacity onPress={() => { navigation.navigate('Restlocation',{lat:lat , lng:lng}) }} style={{ height: 30, borderRadius: 20, marginTop: 10, width: windowWidth / 1.5, backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: 'grey' }}>Take me to the destination</Text>
                    </TouchableOpacity>
                </View>)}
        </View>
    )
}
export default Restaurantdetail;
const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#100f1f',
        alignItems: 'center'
    },
    head: {
        height: 40,
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    headtxt: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    resimg: {
        height: windowHeight / 4,
        width: windowWidth,
        marginTop: 10
    },
    ratingtxt: {
        fontSize: 20,
        color: 'white'
    },
    card: {
        height: windowHeight / 5,
        width: windowWidth,
        borderBottomWidth: 0.5,
        borderColor: 'white',
        marginTop: 5,
        flexDirection: 'row',
    },
    imgview: {
        height: windowHeight / 7,
        width: windowWidth / 3,
        backgroundColor: 'white',
        borderRadius: 20,
        alignSelf: 'center',
        marginLeft: 20
    },
    img: {
        height: windowHeight / 7,
        width: windowWidth / 3,
        backgroundColor: 'white',
        borderRadius: 20,
        alignSelf: 'center'
    },
    txtview: {
        marginLeft: 20,
        justifyContent: 'center',
    },
    txt: {
        fontSize: 20,
        color: 'white'
    }
})