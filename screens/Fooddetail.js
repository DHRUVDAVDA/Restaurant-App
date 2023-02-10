import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, Dimensions, StyleSheet,TouchableOpacity, ActivityIndicator } from "react-native"
import { getFooddata } from "../http/storedata";
import { async } from "@firebase/util";



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Fooddetail = ({ navigation, route }) => {

  const food_id = route.params?.foodid;

  const [data, setData] = useState('');
  const [url, setUrl] = useState('');
  const [foodname, setFoodname] = useState('');
  const [foodprice, setFoodprice] = useState('');
  const [foodcat, setFoodcat] = useState('');
  const [restname, setRestname] = useState('');
  const [restadd, setRestadd] = useState('');
  const [isloading , setIsloading] = useState(true);

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
    setIsloading(false);
  }
  console.log('dataaaa', data);

  useEffect(() => {
    getFooddetail();
  }, [])



  return (
    <ScrollView>
      {isloading ? (<View><ActivityIndicator style={Style.loader} size={"large"} color="#fd9827"/></View>)
    :(
      <View>
      <View style={Style.container}>
        <View style={Style.headimage}>
          <Image style={Style.headimage} source={{ uri: url }} />
        </View>
        <Text style={Style.foodname}>{foodname}</Text>
        <Text style={Style.restname}>restaurant name - {restname}</Text>
        <Text style={Style.restname}>restaurant address - {restadd}</Text>
        <Text style={Style.restname}>food price - {foodprice}</Text>
        <TouchableOpacity style={Style.buybtn}>
        <Text style={Style.buytxt}>add cart</Text>
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
    backgroundColor: '#100f1f'
  },
  loader:{
    height:windowHeight,
    backgroundColor:'#100f1f'
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
  buybtn:{
    backgroundColor:'#fd9827',
    height:40,
    width:windowWidth/2,
    marginTop:20,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center'
},
buytxt:{
    color:'white',
    fontSize:20
}
})