import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, FlatList, Pressable, TouchableOpacity, Button, BackHandler, ScrollView } from 'react-native'
import { getOrderdata } from '../http/storedata';
import { ActivityIndicator } from 'react-native-paper';
import { Reducers } from '../redux/reducers/Reducers';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart } from '../redux/actions/Action';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const Orders = ({ navigation }) => {

    const dispatch = useDispatch();

    BackHandler.addEventListener('hardwareBackPress', handlebutton)

    function handlebutton() {
        navigation.navigate('Homescreen');
        return true;
    }

    // const [data, setData] = useState('');

    const cartData = useSelector(state => state);
    
    console.log('cartdata', cartData);

    let sum = cartData.reduce((accum, item) => accum + item.price*item.quantity, 0);
    

    const [counter, setCounter] = useState();
    const [dataFetch, setDatafetch] = useState(false);

    // async function getOrder() {
    //     const orderdata = await getOrderdata();
    //     setData(orderdata);
    //     setDatafetch(false);
   
    // }
    // console.log(amount);



    function Incrementer() {
        setCounter(counter + 1);
        console.log('added');
    }
    function Decrementer() {
        if (counter !== 0) {
            setCounter(counter - 1);
            console.log('minus');
        }
    }
    return (
        <View style={Styles.container}>
            {dataFetch ? (<View><ActivityIndicator /></View>) : (
                <View style={Styles.container}>
                    <Text style={Styles.headtxt}>All Orders</Text>
                    <FlatList
                        data={cartData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => {
                           const counter = item.quantity;
                            return (
                                <Pressable>
                                    <View style={Styles.card}>
                                        <View style={Styles.imgview}>
                                            <Image style={Styles.img} source={{ uri: item.url }} />
                                        </View>
                                        <View style={Styles.txtview}>
                                            <Text style={Styles.txt}>{item.name}</Text>

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                                <Text style={Styles.txt}>quantity - </Text>

                                                <TouchableOpacity onPress={Decrementer} style={Styles.incrementerbtn}>
                                                    <Text style={Styles.quantitytxt}>-</Text>
                                                </TouchableOpacity>
                                                <View style={Styles.counterview}>
                                                    <Text style={Styles.txt}>{counter}</Text>
                                                </View>

                                                <TouchableOpacity onPress={Incrementer} style={Styles.incrementerbtn}>
                                                    <Text style={Styles.quantitytxt}>+</Text>
                                                </TouchableOpacity>

                                            </View>
                                            
                                            <Text style={Styles.txt}>total - ${item.price*item.quantity}</Text>
                                            <TouchableOpacity onPress={() => { dispatch(removeItemFromCart(index)) }}>
                                                <View>
                                                    <Image style={Styles.deletepng} source={require('./bin.png')} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Pressable>
                            )
                        }
                        } />
                    <View style={Styles.bottomtab}>
                        <Text style={Styles.bottomtxt}>Total Amount - $ {sum}</Text>
                        <View style={Styles.bottombtn}>
                            <Button color='grey' title='proceed to pay' />
                        </View>
                    </View>

                </View>
            )}
        </View>
    )
}
export default Orders;
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#100f1f'
    },
    headtxt: {
        fontSize: 30,
        color: 'white',
        alignSelf: 'center'
    },
    card: {
        width: windowWidth,
        backgroundColor: 'grey',
        borderRadius: 30,
        flexDirection: 'row',
        marginTop: 10,
        height: windowHeight / 6
    },
    imgview: {
        width: windowWidth / 3,
        justifyContent: 'center'
    },
    img: {
        height: windowHeight / 7,
        marginLeft: 15,
        width: windowHeight / 7,
        borderRadius: 20
    },
    txtview: {
        marginLeft:10,
        marginTop:5
    },
    counterview:{
        width:30
    },
    txt: {
        fontSize: 20,
        color: 'white',
        marginTop: 5,
        marginHorizontal: 10
    },
    deletepng: {
        height: 30,
        width: 30,
        alignSelf: 'center',
    },
    bottomtab: {
        backgroundColor: '#fd9827',
        height: windowHeight / 9,
        alignItems: 'center',
        width:windowWidth/1.5,
        bottom: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderRadius:30,
        alignSelf:'center'
    },
    bottomtxt: {
        fontSize: 20,
        marginTop: 5,
        color: 'white'
    },
    bottombtn: {
        marginTop: 10
    },
    incrementerbtn: {
        height: 30,
        width: 30,
        backgroundColor: '#fd9827',
        alignItems:'center',
        justifyContent:'center'
    },
    quantitytxt: {
        fontSize: 20,
        color: 'white',
    }
})