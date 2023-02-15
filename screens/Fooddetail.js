import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, Dimensions, StyleSheet, 
  TouchableOpacity, ActivityIndicator, Alert, BackHandler } from "react-native"
import { getFooddata } from "../http/storedata";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Fooddetail = ({ navigation, route }) => {

  BackHandler.addEventListener('hardwareBackPress',handlebackbtn)

  function handlebackbtn(){
    navigation.navigate('Homescreen');
    return true;
  }

  useEffect(() => {
    getFooddetail();
  }, [])


  const food_id = route.params?.foodid;

  const [data, setData] = useState('');
  const [url, setUrl] = useState('');
  const [foodname, setFoodname] = useState('');
  const [foodprice, setFoodprice] = useState('');
  const [foodcat, setFoodcat] = useState('');
  const [restname, setRestname] = useState('');
  const [restadd, setRestadd] = useState('');
  const [isloading, setIsloading] = useState(true);
  const [counter, setCounter] = useState(0);

  async function getFooddetail() {
    const Fooddata = await getFooddata();
    const result = Fooddata.find(x => x.id === food_id);
    console.log("response from food detail", result);
    
    setData(result);
    setUrl(result.url);
    setFoodname(result.name);
    setFoodprice(result.price);
    setFoodcat(result.category);
    setRestname(result.restaurant_name);
    setRestadd(result.restaurant_address);
    setFoodcat(result.category);
    setIsloading(false);
  }

  function Incrementer() {
    setCounter(counter + 1);
  }
  function Decrementer() {
    if (counter !== 0) {
      setCounter(counter - 1);
    }
  }

  function Buybtn() {
    if (counter !== 0) {
      navigation.navigate('Bill', { food_id, counter, url, foodname, foodprice,restadd, restname,food_id,foodcat })
    }
    else {
      Alert.alert("please select quantity")
    }
  }

  return (
    <ScrollView>
      {isloading ? (<View><ActivityIndicator style={Style.loader} size={"large"} color="#fd9827" /></View>)
        : (
          <View>
            <View style={Style.container}>

              <View style={Style.headimage}>
                <Image style={Style.headimage} source={{ uri: url }} />
              </View>

              <Text style={Style.foodname}>{foodname}</Text>
              <Text style={Style.restname}>restaurant name - {restname}</Text>
              <Text style={Style.restname}>restaurant address - {restadd}</Text>
              <Text style={Style.restname}>food price - ${foodprice}</Text>
              <Text style={Style.restname}>Select Quantity</Text>
              <View style={{ flexDirection: 'row', marginTop: 20 }}>

                <TouchableOpacity onPress={Decrementer} style={Style.incrementerbtn}>
                  <Text style={Style.quantitytxt}>-</Text>
                </TouchableOpacity>

                <View style={{ width: 70, alignItems: 'center' }}>
                  <Text style={Style.quantitytxt}>{counter}</Text>
                </View>

                <TouchableOpacity onPress={Incrementer} style={Style.incrementerbtn}>
                  <Text style={Style.quantitytxt}>+</Text>
                </TouchableOpacity>

              </View>

              <TouchableOpacity onPress={Buybtn} style={Style.buybtn}>
                <Text style={Style.buytxt}>buy</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
    </ScrollView>
  )
}
export default Fooddetail;
const Style = StyleSheet.create({
  container: {
    height: windowHeight,
    backgroundColor: '#100f1f',
    alignItems: 'center'
  },
  loader: {
    height: windowHeight,
    backgroundColor: '#100f1f'
  },
  headimage: {
    height: windowHeight / 4,
    width: windowWidth,

  },
  foodname: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20,
    alignSelf: 'center'
  },
  restname: {
    fontSize: 20,
    color: 'white',
    marginTop: 20,
    alignSelf: 'center'
  },
  buybtn: {
    backgroundColor: '#fd9827',
    height: 40,
    width: windowWidth / 2,
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
  quantity: {
    height: 40,
    width: windowWidth / 4,
    backgroundColor: 'white',
    borderRadius: 20,
    marginTop: 20,
  },
  plusicon: {
    fontSize: 40,
  },
  incrementerbtn: {
    height: 40,
    width: 30,
    backgroundColor: '#fd9827',
    alignItems: 'center',
    justifyContent: 'center'
  },
  quantitytxt: {
    fontSize: 30,
    color: 'white'
  }

})