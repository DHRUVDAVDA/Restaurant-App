import React, { useEffect, useState } from "react";
import {
    Image, ScrollView, StyleSheet, Text, View, Dimensions,
    TouchableOpacity, StatusBar, FlatList, Pressable, ActivityIndicator, BackHandler, RefreshControl
} from "react-native";
import { getFooddata } from "../http/storedata";
import { useSelector } from "react-redux";
import { SliderBox } from 'react-native-image-slider-box';
import { LogBox } from "react-native";

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

    const items = useSelector(state => state.food);   //USE TO SHOW NO. OF AVAILABLE FOOD IN CART
    console.log(items);

    BackHandler.addEventListener('hardwareBackPress', handlebackbutton)  //HANDLES HARDWARE BACKHANDLER
    function handlebackbutton() {
        BackHandler.exitApp();
        return true;
    }

    const [isfetching, setIsfetching] = useState(true);
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

    function capitalizeFirstLetter(string) {                //TO CAPITALIZE FIRST LETTER
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <View style={Style.container}>
            {isfetching ?
                (<View><ActivityIndicator style={Style.loader} size={"large"} color='#fd9827' /></View>)
                :
                (
                    <View>
                        <StatusBar backgroundColor="#100f1f" />

                        <View style={Style.headerview}>

                            <View style={{ position: 'absolute', left: 10, alignSelf: 'center' }}>

                                <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                                    <Image style={Style.menupng} source={require('../Images/menu.png')} />
                                </TouchableOpacity>

                            </View>

                            <Text style={Style.headertxt}>Foodie</Text>

                            <View style={Style.headericonview}>

                                <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
                                    <Image style={Style.cartpng} source={require('../Images/carts.png')} />

                                    <View style={Style.headercounter}>
                                        <Text style={{ fontSize: 12, color: '#fd9827' }}>{items.length}</Text>
                                    </View>

                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => navigation.navigate('Upload')}>
                                    <Image style={Style.uploadpng} source={require('../Images/upload.png')} />
                                </TouchableOpacity>

                            </View>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

                            <SliderBox images={images} autoplay={true} circleLoop={true} autoplayInterval={4000}/>

                            <View>

                                <View style={Style.foodcatheadview}>
                                    <Text style={Style.foodcathead}>Food category</Text>
                                    <View style={Style.line}></View>
                                </View>
                                <FlatList
                                    horizontal={true}
                                    data={catdata}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item) => item.category}
                                    renderItem={({ item }) => {
                                        const category = item.category;
                                        return (
                                            <Pressable onPress={() => navigation.navigate('Categorywisefood', { category })}>
                                                <View>
                                                    <View style={Style.foodcat}>
                                                        <Image style={Style.foodimg} source={{ uri: item.url }} />
                                                    </View>
                                                    <Text style={Style.cattag}>{capitalizeFirstLetter(item.category)}</Text>
                                                </View>
                                            </Pressable>
                                        )
                                    }
                                    } />
                                <ScrollView>

                                    <View style={Style.foodcatheadview}>
                                        <Text style={Style.foodcathead}>Food</Text>
                                        <View style={Style.line}></View>
                                    </View>


                                    <FlatList
                                        contentContainerStyle={{ paddingBottom: 60 }}
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
                                                        <Text style={Style.cattag}>{capitalizeFirstLetter(item.name)}</Text>
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
                        </ScrollView>
                    </View>
                )}
        </View>
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
    headerview: {
        height: 50,
        width: windowWidth,
        backgroundColor: '#100f1f',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    headertxt: {
        fontSize: 20,
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    headericonview: {
        flexDirection: 'row',
        position: 'absolute',
        right: 10,
        alignSelf: 'center'
    },
    headercounter: {
        height: 18,
        width: 18,
        position: 'absolute',
        backgroundColor: '#100f1f',
        borderRadius: 20,
        marginLeft: 20,
        bottom: 25,
        alignItems: 'center',
        justifyContent: 'center'
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
        width: 30,
        marginHorizontal: 10
    },
    foodcatheadview: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 20
    },
    foodcathead: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    line: {
        marginLeft: 5,
        flex: 1,
        height: 1,
        backgroundColor: 'white',
    },
    foodcat: {
        height: windowWidth / 4,
        width: windowWidth / 4,
        backgroundColor: 'white',
        marginTop: 20,
        marginHorizontal: 20,
        marginBottom: 10,
        borderRadius: 20,
        borderColor: 'white'
    },
    foodimg: {
        height: windowWidth / 4,
        width: windowWidth / 4,
        backgroundColor: 'white',
        borderRadius: 20
    },
    cattag: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'center'
    },
    foodprice: {
        color: '#fd9827',
        alignSelf: 'center',
        fontSize: 15
    },
    buybtn: {
        backgroundColor: '#fd9827',
        height: 25,
        width: windowWidth/6,
        marginTop: 5,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
        alignSelf: 'center'
    },
    buytxt: {
        color: 'white',
        fontSize:12
    }
})