import React, { useEffect, useState } from "react";
import {
  View, Text, ScrollView, Image, Dimensions, StyleSheet,
  TouchableOpacity, ActivityIndicator, Alert, BackHandler, ToastAndroid
} from "react-native";
import { getFooddata } from "../http/storedata";
import { useDispatch, useSelector } from "react-redux";
import { addMyFood } from "../newredux/myFoodSlice";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Fooddetail = ({ navigation, route }) => {

  useEffect(() => {
    getFooddetail();
  }, [])

  const dispatch = useDispatch();
  const state = useSelector(state => state.food);
  console.log(state);

  BackHandler.addEventListener('hardwareBackPress', handlebackbtn)
  function handlebackbtn() {
    navigation.navigate('Toptab');
    return true;
  }

  const food_id = route.params?.foodid;

  const [data, setData] = useState('');
  const [isloading, setIsloading] = useState(true);
  const [counter, setCounter] = useState(1);

  async function getFooddetail() {
    const Fooddata = await getFooddata();
    const result = Fooddata.find(x => x.id === food_id);
    console.log("response from food detail", result);

    setData(result);
    setIsloading(false);
  }

  const userOrder = {
    name: data.name,
    id: food_id,
    url: data.url,
    restaurant_name: data.restaurant_name,
    quantity: counter,
    price: data.price,
    category: data.category,
    restaurant_address: data.restaurant_address
  };

  function Incrementer() {
    setCounter(counter + 1);
  }
  function Decrementer() {
    if (counter !== 0) {
      setCounter(counter - 1);
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function Buybtn() {
    if (counter !== 0) {
      navigation.navigate('Orders', (dispatch(addMyFood(userOrder))))
      ToastAndroid.showWithGravity('added',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      )
    }
    else {
      Alert.alert("please select quantity")
    }
    
  }

  

  return (
    <ScrollView>
      {isloading ? (<View><ActivityIndicator style={Style.loader} size={"large"} color="#fd9827" /></View>)
        : (

          <View style={Style.container}>

            <View style={Style.headimage}>
              <Image style={Style.headimage} source={{ uri: data.url }} />
            </View>

            <Text style={Style.foodname}>{capitalizeFirstLetter(data.name)}</Text>

            <View style={Style.fieldview}>
              <Text style={Style.field}>Restaurant name - </Text>
              <Text style={Style.fieldresponse}>{data.restaurant_name}</Text>
            </View>

            <View style={Style.fieldview}>
              <Text style={Style.field}>Restaurant addresss - </Text>
              <Text style={Style.fieldresponse}>{data.restaurant_address}</Text>
            </View>
           
            <View style={Style.fieldview}>
              <Text style={Style.field}>Food price - </Text>
              <Text style={Style.fieldresponse}>{data.price}</Text>
            </View>
          
              <Text style={[Style.field , {alignSelf:'center' , marginTop:10}]}>Select Quantity</Text>
              <View style={{ flexDirection: 'row', marginTop: 20 , alignSelf:'center'}}> 

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

             <View style={{flexDirection:'row' , justifyContent:'space-around' , width:windowWidth ,}}>
                <TouchableOpacity onPress={Buybtn} style={Style.buybtn}>
                    <Text style={Style.buytxt}>Add to cart</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Style.buybtn}>
                    <Text style={Style.buytxt}>Pay</Text>
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
    alignSelf: 'center',
    marginTop: 10
  },
  fieldview: {
    marginLeft:10,
    marginTop: 10,
    width: windowWidth,
    justifyContent: 'center'
  },
  field: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  fieldresponse: {
    fontSize: 20,
    color: '#fd9827',
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