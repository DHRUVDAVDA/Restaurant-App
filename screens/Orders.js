import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, FlatList, Pressable, TouchableOpacity, Button, BackHandler, ScrollView } from 'react-native'
import { getOrderdata } from '../http/storedata';
import { ActivityIndicator } from 'react-native-paper';
import { Reducers } from '../redux/reducers/Reducers';
import { useDispatch, useSelector } from 'react-redux';
import { incrementCount, removeItemFromCart } from '../redux/actions/Action';
import { decrementQty, deleteMyFood, incrementQty } from '../newredux/myFoodSlice';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



const Orders = ({ navigation }) => {

    // const [data, setData] = useState('');
    const [total, setTotal] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const [empty, setEmpty] = useState(false)

    const dispatch = useDispatch();
    const cartData = useSelector(state => state.food);

    BackHandler.addEventListener('hardwareBackPress', handlebutton)

    function handlebutton() {
        navigation.navigate('Toptab');
        return true;
    }
    useEffect(() => {
        if (cartData.length === 0) {
            setEmpty(true)
        }
    },[])


    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };
    // async function getOrder() {
    //     const orderdata = await getOrderdata();
    //     setData(orderdata);
    //     setDatafetch(false);
    // }
    // console.log(amount);


    return (
        <View style={Styles.container}>
            {empty ? (<View style={Styles.optionalmsg}><Text style={Styles.optionaltxt}>No any Food added</Text></View>) :
                (
                    <View style={Styles.container}>

                        <FlatList
                            data={cartData}
                            onRefresh={onRefresh}
                            refreshing={refreshing}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => {
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

                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            if (item.quantity == 1) {
                                                                dispatch(deleteMyFood(index))
                                                            } else {
                                                                dispatch(decrementQty(item.id))
                                                            }
                                                        }}
                                                        style={Styles.incrementerbtn}>

                                                        <Text style={Styles.quantitytxt}>-</Text>
                                                    </TouchableOpacity>
                                                    <View style={Styles.counterview}>
                                                        <Text style={Styles.txt}>{item.quantity}</Text>
                                                    </View>

                                                    <TouchableOpacity
                                                        onPress={() => { dispatch(incrementQty(item.id)) }} style={Styles.incrementerbtn}>
                                                        <Text style={Styles.quantitytxt}>+</Text>
                                                    </TouchableOpacity>

                                                </View>

                                                <Text style={Styles.txt}>total - ${item.price * item.quantity}</Text>
                                                <TouchableOpacity onPress={() => { dispatch(deleteMyFood(index)) }}>
                                                    <View style={Styles.deletepng}>
                                                        <Image style={Styles.deletepng} source={require('../Images/bin.png')} />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </Pressable>
                                )
                            }
                            } />

                        <View style={Styles.bottomtab}>
                            <Text style={Styles.bottomtxt}>Amount - $ {cartData.reduce((accum, item) => accum + item.price * item.quantity, 0)}</Text>
                            <TouchableOpacity style={Styles.bottombtn}>
                                <Text style={Styles.bottomtxt}>Pay</Text>
                            </TouchableOpacity>
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
    optionalmsg: {
        justifyContent: 'center',
        height: '100%',
        width: windowWidth
    },
    optionaltxt: {
        fontSize: 20,
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
        marginLeft: 10,
        marginTop: 5
    },
    counterview: {
        width: 40,
        alignItems: 'center'
    },
    txt: {
        fontSize: 20,
        color: 'white',
        marginTop: 5,
        marginHorizontal: 10,
    },
    deletepng: {
        height: 30,
        width: 30,
        alignSelf: 'center',
    },
    bottomtab: {
        backgroundColor: '#fd9827',
        flexDirection: 'row',
        height: windowHeight / 11,
        alignItems: 'center',
        width: windowWidth,
        borderRadius: 30,
        justifyContent: 'space-around'
    },
    bottomtxt: {
        fontSize: 20,
        color: 'white',
    },
    bottombtn: {
        width: windowWidth / 4,
        height: 40,
        backgroundColor: 'grey',
        alignItems: 'center',
        borderRadius: 10,
        justifyContent: 'center'
    },
    incrementerbtn: {
        height: 30,
        width: 30,
        backgroundColor: '#fd9827',
        alignItems: 'center',
        justifyContent: 'center'
    },
    quantitytxt: {
        fontSize: 20,
        color: 'white',
    }
})