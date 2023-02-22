import React, { useEffect, useState } from "react";
import {
    Image, ScrollView, StyleSheet, Text, View, Dimensions,
    TouchableOpacity, StatusBar, FlatList, Pressable, ActivityIndicator, BackHandler, RefreshControl
} from "react-native"
import { getFooddata } from "../http/storedata";
import { useSelector } from "react-redux";
import {SliderBox} from 'react-native-image-slider-box'
import {LogBox} from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Homescreen({ navigation, id }) {

   

LogBox.ignoreLogs([
"ViewPropTypes will be removed",
"ColorPropType will be removed",
])

    useEffect(() => {                  //FETCH DATA FROM FIREBASE WHILE LOADING
        fetchData();
    }, []);

    const items = useSelector(state => state.food);   //USED TO SHOW NO. OF AVAILABLE FOOD IN CART
    console.log(items);

    BackHandler.addEventListener('hardwareBackPress', handlebackbutton) //HANDLES HARDWARE BACKHANDLER
    function handlebackbutton() {
        BackHandler.exitApp();
        return true;
    }

    const [isfetching, setIsfetching] = useState(true)
    const [data, setData] = useState('');
    const [cartItem, setCartitem] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const [catdata, setCatdata] = useState('');
    

    async function fetchData() {
        const fooddata = await getFooddata();        //FETCH UPLOADED FOOD DATA
        console.log('food on homescreen', fooddata);
        setData(fooddata);
        setIsfetching(false);
        if (items.length > 0) {
            setCartitem(true);
        }
        
        const unique = fooddata               //GET UNIQUE CATEGORY AND URL OBJECT INSIDE ARRAY 
            .map(e => e['category'])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter(obj => fooddata[obj])
            .map(e => fooddata[e]);
        setCatdata(unique)
        console.log(unique.length);

    }
    const onRefresh = () => {      //FOR REFRESHER
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    const images = [
        require('../Images/foodhead.jpg'),
        require('../Images/foodhead2.jpg'),
        require('../Images/foodhead3.jpg'),
        require('../Images/foodhead4.jpg')
    ]

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={Style.container}>

            {isfetching ?
                (<View><ActivityIndicator style={Style.loader} size={"large"} color='#fd9827' /></View>)
                :
                (
                    <View>
                        <StatusBar backgroundColor="#100f1f" />
                        <SliderBox images={images} autoplay={true} circleLoop={true} autoplayInterval={4000}/>
                        <TouchableOpacity onPress={() => navigation.navigate('profile')} style={Style.menupngtouch}>
                            <Image style={Style.menupng} source={require('../Images/menu.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Upload')} style={Style.uploadpngtouch}>
                            <Image style={Style.cartpng} source={require('../Images/upload.png')} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Orders')} style={Style.cartpngtouch}>
                            <Image style={Style.cartpng} source={require('../Images/carts.png')} />

                            <View style={{
                                height: 18, width: 18, position: 'absolute', backgroundColor: '#100f1f', borderRadius: 20,
                                marginLeft: 20, bottom: 32, alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Text style={{ fontSize: 12, color: '#fd9827' }}>{items.length}</Text>
                            </View>

                        </TouchableOpacity>
                        <View>

                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 20, marginHorizontal: 20 }}>
                                <Text style={Style.foodcathead}>Food category</Text>
                                <View style={{ flex: 1, height: 1, backgroundColor: 'white' }}></View>
                            </View>
                            <FlatList
                                horizontal={true}
                                data={catdata}
                                keyExtractor={(item) => item.category}
                                renderItem={({ item }) => {
                                    const category = item.category;
                                    return (
                                        <Pressable onPress={() => navigation.navigate('Categorywisefood', { category })}>
                                            <View>
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
                                    renderItem={({ item, index }) => {
                                        return (item.id,

                                            <Pressable onPress={() => navigation.navigate('Fooddetail', { foodid: item.id })}>
                                                <View>
                                                    <View style={Style.foodcat}>
                                                        <Image style={Style.foodimg} source={{ uri: item.url }} />
                                                    </View>
                                                    <Text style={Style.cattag}>{item.name}</Text>
                                                    <Text style={Style.foodprice}>$ {item.price}</Text>
                                                    <TouchableOpacity onPress={() => {
                                                        navigation.navigate('Fooddetail', { foodid: item.id })
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
        right: 10,
        justifyContent: 'center',
        height: 50
    },
    cartpngtouch: {
        position: 'absolute',
        right: 90,
        justifyContent: 'center',
        height: 50,
    },
    uploadpngtouch: {
        position: 'absolute',
        height: 50,
        width: 30,
        right: 50,
        justifyContent: 'center',
    },
    headimgtxtview: {
        position: 'absolute',
        height: windowHeight / 7,
        width: windowWidth / 2,
        alignItems: 'center',
        marginTop: 60,
        right: 50,
    },
    headimgtxt: {
        position: 'absolute',
        fontSize: 40,
        color: 'black',
        textShadowColor: '#fd9827',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 20
    },
    foodcathead: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    foodcat: {
        height: windowWidth / 3,
        width: windowWidth / 3,
        backgroundColor: 'white',
        marginTop: 20,
        marginHorizontal:20,
        marginBottom:10,
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
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf:'center'
    },
    foodprice: {
        color: 'white',
       alignSelf:'center',
        fontSize: 15
    },
    buybtn: {
        backgroundColor: '#fd9827',
        height: 25,
        width: 80,
        marginTop: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        alignSelf:'center'
    },
    buytxt: {
        color: 'white'
    }

})