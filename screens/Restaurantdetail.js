import React from "react";
import { View, StyleSheet, Dimensions, Text, Image, BackHandler } from 'react-native'
import { restaurants } from "../sample restaurant/rest";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Restaurantdetail = ({ navigation, route }) => {

    BackHandler.addEventListener('hardwareBackPress', handlebackbtn)
    function handlebackbtn() {
        navigation.navigate('Toptab');
        return true;
    }

    const restname = route.params?.name;

    const result = restaurants.find(x => x.name === restname);
    console.log("response from restaurant detail", result);

    return (
        <View style={Style.container}>
            <View style={Style.head}>
                <Text style={Style.headtxt}>{restname.toUpperCase()}</Text>
            </View>
            <Image style={Style.resimg} source={{ uri: result.url }} />
            <Text style={Style.timingtxt}>Timing{'\n'} {result.timing}</Text>
        </View>
    )
}
export default Restaurantdetail;
const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#100f1f'
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
    timingtxt: {
        fontSize: 20,
        color: 'white'
    }
})