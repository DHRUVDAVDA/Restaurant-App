import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import { getUserfrominternal, getdata, storeUsersorder } from '../http/storedata';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../redux/actions/Action';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Bill({navigation}) {

    BackHandler.addEventListener('hardwareBackPress',handlebackbtn)

  function handlebackbtn(){
    navigation.navigate('Fooddetail');
    return true;
  }

       
const [user , setUser] = useState('');

  const dispatch = useDispatch();
  const state = useSelector(state => state);
  console.log('state billing',state);

    const route = useRoute();
    const foodid = route.params.food_id;
    const url = route.params.url;
    const foodname = route.params.foodname;
    const restname = route.params.restname;
    const counter = route.params.counter;
    const price = route.params.foodprice;
    const total = price*counter;
    const user_id = user;
    const category = route.params.foodcat;
    const restadd = route.params.restadd

    const userOrder = {
        user_id:user_id,
        name:foodname,
        id:foodid,
        url:url,
        restaurant_name:restname,
        quantity:counter,
        price:price,
        category:category,
        restaurant_address:restadd
     };

     async function Buybtn(){
    
        const serverStored =await getdata();
            AsyncStorage.getItem('user').then((response) =>{
                const internalStored = JSON.parse(response);
                console.log('internall',response);
                console.log('Serverr' , serverStored);
                const email = internalStored.email;
                console.log('emaillll',email);
                const user = serverStored.find(x => x.email === email);
                console.log(user);
                console.log(user.id);
                setUser(user.id);
            })
    
             storeUsersorder(userOrder);
            navigation.navigate('Orders',dispatch(addItemToCart(userOrder)))
        }
    return (
        <View style={Styles.container}>
            <View style={Styles.headerbar}>
                <Text style={Styles.headertxt}>Final Billing</Text>
            </View>

            <View style={Styles.img}>
                <Image style={Styles.img} source={{ uri: url }} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 20, marginHorizontal: 10 }}>
                <Text style={Styles.pricehead}>Detail</Text>
                <View style={{ flex: 1, height: 1, backgroundColor: 'white' }}></View>
            </View>

            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <Text style={Styles.fields}>Food name - {foodname}</Text>
                <Text style={Styles.fields}>Restaurant name - {restname}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 20, marginHorizontal: 10 }}>
                <Text style={Styles.pricehead}>PRICING</Text>
                <View style={{ flex: 1, height: 1, backgroundColor: 'white' }}></View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                <View style={Styles.pricefields}>
                    <Text style={Styles.pricetext}>Food name</Text>
                    <Text style={Styles.pricetext}>{foodname}</Text>
                </View>

                <View style={Styles.pricefields}>
                    <Text style={Styles.pricetext}>Quantity</Text>
                    <Text style={Styles.pricetext}>{counter}</Text>
                </View>

                <View style={Styles.pricefields}>
                    <Text style={Styles.pricetext}>Price</Text>
                    <Text style={Styles.pricetext}>{price}</Text>
                </View>
            </View>

            <View style={{ height: 1, backgroundColor: 'white', marginTop: 20, marginHorizontal: 10 }}></View>

            <View style={{ alignItems: 'flex-end', marginRight: 35, marginTop: 20 }}>
                <Text style={Styles.pricetext}>total = {total}</Text>
            </View>

            <View style={{flexDirection:'row' , justifyContent:'space-around' , marginTop:20}}>
                <TouchableOpacity onPress={Buybtn} style={Styles.buybtn}>
                    <Text style={Styles.buytxt}>Add to cart</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Styles.buybtn}>
                    <Text style={Styles.buytxt}>Pay</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Bill;
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#100f1f'
    },
    headerbar: {
        backgroundColor: '#fd9827',
        height: 30,
        justifyContent: 'center'
    },
    headertxt: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    img: {
        width: windowWidth,
        height: windowHeight / 4,
        marginTop: 10
    },
    fields: {
        fontSize: 20,
        color: 'white',
        marginTop: 10,
        marginLeft: 10
    },
    pricehead: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },
    pricefields: {
        alignItems: 'center'
    },
    pricetext: {
        fontSize: 20,
        color: 'white'
    },
    buybtn: {
        backgroundColor: '#fd9827',
        height: 40,
        width: windowWidth / 3,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    buytxt: {
        color: 'white',
        fontSize: 20
    },

})