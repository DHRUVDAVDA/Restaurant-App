import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList, Pressable, TouchableOpacity, BackHandler } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQty, deleteMyFood, incrementQty } from '../newredux/myFoodSlice';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Orders = ({ navigation }) => {

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
    }, [])

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    function Total(){
       const total = cartData.reduce((accum, item) => accum + item.price * item.quantity, 0);
       return total;
    }


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

                                            <View style={Styles.txtview}>

                                                <Text style={Styles.txt}>{item.name}</Text>

                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>


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
                                                        <Text style={{ fontSize: 20, color: 'white' }}>{item.quantity}</Text>
                                                    </View>

                                                    <TouchableOpacity
                                                        onPress={() => { dispatch(incrementQty(item.id)) }} style={Styles.incrementerbtn}>
                                                        <Text style={Styles.quantitytxt}>+</Text>
                                                    </TouchableOpacity>

                                                </View>

                                                <Text style={Styles.txt}>${item.price * item.quantity}</Text>

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

                        <View style={Styles.receiptview}>
                            <Text style={{ marginLeft: 10, fontSize: 20, fontWeight: 'bold', color: 'white' }}>Bill Receipt</Text>
                            <View style={Styles.fieldview}>
                                <Text style={Styles.amount}>Items total</Text>
                                <Text style={Styles.amount}>{Total()} $</Text>
                            </View>

                            <View style={Styles.fieldview}>
                                <Text style={Styles.amount}>Offer discount</Text>
                                <Text style={Styles.amount}>- 25 $</Text>
                            </View>

                            <View style={Styles.fieldview}>
                                <Text style={Styles.amount}>Taxes (6%)</Text>
                                <Text style={Styles.amount}>{Total() * 6 / 100} $</Text>
                            </View>

                            <View style={Styles.fieldview}>
                                <View style={Styles.line}></View>
                            </View>

                            <View style={Styles.fieldview}>
                                <Text style={Styles.amount}>Total amount</Text>
                                <Text style={Styles.amount}>{Total()+Total() * 6 / 100 - 25} $</Text>
                            </View>
                        </View>

                        <View style={Styles.bottomtab}>
                            <Text style={Styles.bottomtxt}>Amount - $ {Total()+Total() * 6 / 100 - 25}</Text>
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
        height:windowHeight/10,
        backgroundColor: 'grey',
        justifyContent: 'center'
    },
    txtview: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    counterview: {
        width: 40,
        alignItems: 'center',
    },
    txt: {
        fontSize: 20,
        width:80,
        color: 'white',
    },
    deletepng: {
        height: 30,
        width: 30,
        alignSelf: 'center',
    },
    receiptview: {
        bottom: 0,
        backgroundColor: 'grey',
        height: windowHeight / 5,
        width: windowWidth
    },
    fieldview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10
    },
    amount: {
        fontSize: 17,
        color: 'white'
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'white'
    },
    bottomtab: {
        backgroundColor: '#fd9827',
        flexDirection: 'row',
        height: windowHeight / 11,
        alignItems: 'center',
        width: windowWidth,
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