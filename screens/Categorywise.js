import React, { useEffect, useState } from "react";
import { useRoute } from '@react-navigation/native';
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View, Image, ActivityIndicator, BackHandler } from 'react-native';
import { getFooddata } from "../http/storedata";



const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Categorywise = ({ navigation }) => {

    useEffect(() => {
        fetchData();
    }, [])

    BackHandler.addEventListener('hardwareBackPress', handlebackbtn)

    function handlebackbtn() {
        navigation.navigate('Toptab');
        return true;
    }

    const route = useRoute();
    const [data, setData] = useState();
    const [fetching, setFetching] = useState(true)

    const category = route.params.category;

    async function fetchData() {
        const fooddata = await getFooddata();
        const filtered = fooddata.filter(x => x.category == category)
        console.log('filtered', filtered);
        setData(filtered);
        setFetching(false)
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <View style={Style.container}>
            <Text style={Style.head}>{category.toUpperCase()}</Text>
            {fetching ? (<View><ActivityIndicator style={Style.loader} size={"large"} color='#fd9827' /></View>) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <Pressable onPress={() => { navigation.navigate('Fooddetail', { foodid: item.id }) }}>
                                <View style={Style.cartcontainer}>
                                    <View style={Style.imgview}>
                                        <Image style={Style.img} source={{ uri: item.url }} />
                                    </View>
                                    <View style={Style.txtview}>
                                       
                                        <Text style={[Style.txt,{fontWeight:'bold',color:'white'}]}>{capitalizeFirstLetter(item.name)}</Text>

                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={Style.txtfields}>From - </Text>
                                            <Text style={[Style.txt, { color: '#fd9827' }]}>{item.restaurant_name}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={Style.txtfields}>Price - </Text>
                                            <Text style={[Style.txt, { color: '#fd9827' }]}>$ {item.price}</Text>
                                        </View>

                                    </View>
                                </View>
                            </Pressable>
                        )
                    }}
                />
            )}

        </View>
    )
}
export default Categorywise;
const Style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#100f1f'
    },
    head: {
        fontSize: 25,
        color: 'white',
        alignSelf: 'center'
    },
    loader: {
        height: windowHeight,
        backgroundColor: '#100f1f'
    },
    cartcontainer: {
        height: windowHeight / 5,
        width: windowWidth,
        borderBottomWidth: 0.5,
        borderColor: 'white',
        marginTop: 5,
        flexDirection: 'row',
    },
    imgview: {
        height: windowHeight / 8,
        width: windowWidth / 4,
        backgroundColor: 'white',
        borderRadius: 20,
        alignSelf: 'center',
        marginLeft: 20
    },
    img: {
        height: windowHeight / 8,
        width: windowWidth / 4,
        backgroundColor: 'white',
        borderRadius: 20,
        alignSelf: 'center'
    },
    txtview: {
        marginLeft: 20,
        justifyContent: 'center',
    },
    txtfields: {
        fontSize: 20,
        color: 'white',
    },
    txt: {
        fontSize: 20,
        color: 'white',
        width: windowWidth / 2
    }
})