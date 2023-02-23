import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text, Image, BackHandler, ActivityIndicator, FlatList, Pressable } from 'react-native'
import { restaurants } from "../sample restaurant/rest";
import { getFooddata } from "../http/storedata";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Restaurantdetail = ({ navigation, route }) => {

    const [data, setData] = useState();
    const [resdata, setResdata] = useState();
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetchFooddata();
    }, [])

    async function fetchFooddata() {
        const fooddata = await getFooddata();
        console.log(fooddata);
        const result = fooddata.filter(x => x.restaurant_name === restname);
        console.log('food response inside restaurant page', result);
        setData(result);
        const resultt = restaurants.find(x => x.name === restname);
        console.log('hhhhhhhh', resultt);
        setResdata(resultt);
        setFetching(false);
    }

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
            {fetching ? (<View><ActivityIndicator size={'large'} color={'#fd9827'} /></View>) :
                (<View style={Style.container}>
                    <Image style={Style.resimg} source={{ uri: result.url }} />

                    <View>
                        <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold' }}>Timing</Text>
                        <Text style={{ fontSize: 15, color: '#fd9827', fontWeight: 'bold' }}>  {resdata.timing}</Text>
                    </View>

                    <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold', alignSelf: 'center', marginTop: 10 }}>
                        Dishes from {restname}</Text>

                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <Pressable onPress={() => { navigation.navigate('Fooddetail', { foodid: item.id }) }}>
                                    <View style={Style.card}>
                                        <View style={Style.imgview}>
                                            <Image style={Style.img} source={{ uri: item.url }} />
                                        </View>
                                        <View style={Style.txtview}>

                                            <Text style={[Style.txt, { color: '#fd9827' }]}>{item.name.toUpperCase()}</Text>
                                            <Text style={Style.txt}>Price - $ {item.price}</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            )
                        }}
                    />
                </View>)}

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