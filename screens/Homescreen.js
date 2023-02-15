import React, { useEffect, useState } from "react";
import {
    Image, ScrollView, StyleSheet, Text, View, Dimensions,
    TouchableOpacity, StatusBar, FlatList, Pressable, ActivityIndicator, BackHandler
} from "react-native"
import { getFooddata } from "../http/storedata";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/actions/Action";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




function Homescreen({ navigation, id }) {

    useEffect(() => {
        fetchData();
    }, []);


    const dispatch = useDispatch();
    const items = useSelector(state => state);
    console.log(items);

    BackHandler.addEventListener('hardwareBackPress',handlebackbutton)

    BackHandler.removeEventListener('hardwareBackPress',handlebackbutton)

    function handlebackbutton(){
     BackHandler.exitApp();
     return true;
     
    }


    const [isfetching, setIsfetching] = useState(true)
    const [data, setData] = useState('');

    async function fetchData() {
        const fooddata = await getFooddata();
        console.log('food on homescreen', fooddata);
        setData(fooddata);
        setIsfetching(false);
    }
   
    return (
        <ScrollView style={Style.container}>

            {isfetching ?
                (<View><ActivityIndicator style={Style.loader} size={"large"} color='#fd9827' /></View>)
                :
                (
                    <View>
                        <StatusBar backgroundColor="#100f1f" />
                        <Image style={Style.headimage} source={require('./foodhead.jpg')} />

                        <TouchableOpacity onPress={() => navigation.navigate('profile')} style={Style.menupngtouch}>
                            <Image style={Style.menupng} source={require('./menu.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Upload')} style={Style.cartpngtouch}>
                            <Image style={Style.cartpng} source={require('./upload.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Orders')} style={Style.uploadpngtouch}>
                            <Image style={Style.cartpng} source={require('./carts.png')} />
                        </TouchableOpacity>


                        <View>

                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 20, marginHorizontal: 20 }}>
                                <Text style={Style.foodcathead}>Food category</Text>
                                <View style={{ flex: 1, height: 1, backgroundColor: 'white' }}></View>
                            </View>
                            <FlatList
                                horizontal={true}
                                data={data}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => {
                                    return (
                                        <Pressable>
                                            <View style={Style.fooditem}>
                                                <View style={Style.foodcat}>
                                                    <Image style={Style.foodimg} source={{ uri: item.url }} />
                                                </View>
                                                <Text style={Style.cattag}>{item.category}</Text>
                                            </View>
                                        </Pressable>
                                    )
                                }
                                } />
                            <ScrollView>

                                <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 20, marginHorizontal: 20 }}>
                                    <Text style={Style.foodcathead}>Food</Text>
                                    <View style={{ flex: 1, height: 1, backgroundColor: 'white' }}></View>
                                </View>


                                <FlatList
                                    horizontal={true}
                                    data={data}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item , index }) => {
                                        return (item.id,

                                            <Pressable onPress={() => navigation.navigate('Fooddetail', { foodid: item.id })}>
                                                <View style={Style.fooditem}>
                                                    <View style={Style.foodcat}>
                                                        <Image style={Style.foodimg} source={{ uri: item.url }} />
                                                    </View>
                                                    <Text style={Style.cattag}>{item.name}</Text>
                                                    <Text style={Style.foodprice}>${item.price}</Text>
                                                    <TouchableOpacity onPress={()=>{
                                                      dispatch(addItemToCart(item));
                                                    }} style={Style.buybtn}>
                                                        <Text style={Style.buytxt}>add cart</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </Pressable>

                                        )
                                    }
                                    } />

                            </ScrollView>
                        </View>
                    </View>
                )}
        </ScrollView>
    );
}
export default Homescreen;

const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#100f1f'
    },
    loader: {
        height: windowHeight,
        backgroundColor: '#100f1f'
    },
    menupng: {
        height: 10,
        width: 10
    },
    headimage: {
        height: windowHeight / 4,
        width: windowWidth,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    menupng: {
        height: 30,
        width: 30,
        tintColor: 'grey',
    },
    cartpng: {
        height: 30,
        width: 30
    },
    uploadpng: {
        height: 30,
        width: 30
    },
    menupngtouch: {
        position: 'absolute',
        height: 30,
        width: 30,
        right: 10,
        top: 10
    },
    cartpngtouch: {
        position: 'absolute',
        height: 30,
        width: 30,
        right: 50,
        top: 10
    },
    uploadpngtouch: {
        position: 'absolute',
        height: 30,
        width: 30,
        right: 90,
        top: 10
    },
    foodcathead: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    fooditem: {

    },
    foodcat: {
        height: windowWidth / 3,
        width: windowWidth / 3,
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 20
    },
    foodimg: {
        height: windowWidth / 3,
        width: windowWidth / 3,
        backgroundColor: 'white',
        borderRadius: 20
    },
    cattag: {
        color: 'white',
        marginLeft: 30,
        fontWeight: 'bold',
        fontSize: 18
    },
    foodprice: {
        color: 'white',
        marginLeft: 30,
        fontSize: 15
    },
    buybtn: {
        backgroundColor: '#fd9827',
        height: 25,
        width: 80,
        marginLeft: 30,
        marginTop: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buytxt: {
        color: 'white'
    }

})