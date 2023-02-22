import React, { useState, useEffect } from "react";
import {
  Text, View, StyleSheet, Image, TouchableOpacity, Button, TextInput,
  Dimensions, PermissionsAndroid, FlatList, Pressable ,BackHandler
} from 'react-native';
import MapView, { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { Cloves, Mcd, restaurants } from "../sample restaurant/rest";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Restaurants = ({navigation}) => {

  BackHandler.addEventListener('hardwareBackPress',handlebackbtn)
  function handlebackbtn(){
   navigation.goBack();
    return true;
  }

  useEffect(() => {
    getLocation();
    setData(restaurants);
  }, [])

  const [data, setData] = useState();
  const [click, setClick] = useState(false);
  const [city, setCity] = useState({ latitude: 0, longitude: 0 });
  const [searchText, setSearchText] = useState();
  const [loc, setLoc] = useState([])

  const getLocation = () => {                 //FETCHING CURRENT LOCATION
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setCity({ latitude: position.coords.latitude, longitude: position.coords.longitude })
      },
      error => {
        console.log(error.code, error.message);
        setLoc(false);
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 },
    );
    console.log("city", city);
  };

  const searchFilteredData = searchText                     //FILTER RESTAURANT
    ? data.filter((x) =>
      x.name.toLowerCase().includes(searchText.toLowerCase())
    )
    : data;

    function displayMap() {
      setClick(true);
      getLocation();
    }

  return (
    <View style={Style.container}>
      <View style={{ flexDirection: 'row',justifyContent:'center' , alignItems:'center' }}>

        <TextInput onChangeText={(text) => {setSearchText(text)}}
          value={searchText} placeholder="search by name" placeholderTextColor='white' style={Style.search}></TextInput>

        <TouchableOpacity onPress={() => { displayMap() }}>
          <Image style={Style.locationpng} source={require('../Images/location.png')} />
        </TouchableOpacity>
      </View>

      {click ? (<View style={{ flex: 2 }}>
        <MapView
          style={Style.map}
          initialRegion={{
            latitude: city.latitude,
            longitude: city.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={city}>
            <View>
              <Image source={require('../Images/current.png')} style={{ height: 70, width: 70 }} />
            </View>
          </Marker>
          <Marker coordinate={Mcd} />
          <Marker coordinate={Cloves} />
        </MapView>
        <TouchableOpacity onPress={() => { setClick(false) }} style={{ position: 'absolute', right: 5 }}>

          <Image style={{ height: 30, width: 30 }} source={require('../Images/cross.png')} />

        </TouchableOpacity>
      </View>)
        : (<View style={{ flex: 2 }}>

          <FlatList
            data={searchFilteredData}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => {
              return (
                <Pressable onPress={()=> navigation.navigate('Restaurantdetail' ,{name:item.name})}>
                  <View style={Style.cardcontainer}>

                    <Image source={{ uri: item.url }} style={Style.resimg} />

                    <View style={Style.txtview}>

                      <Text style={Style.resname}>{item.name}</Text>

                      <View style={Style.restiming}>
                        <Image style={Style.clockimg} source={require('../Images/clock.png')} />
                        <Text style={Style.timetxt}>{item.timing}</Text>
                      </View>

                      <View style={Style.resaddress}>
                        <Image style={Style.addressimg} source={require('../Images/location.png')} />
                        <Text style={Style.addresstxt}>{item.address}</Text>
                      </View>

                    </View>
                  </View>
                </Pressable>
              )
            }}
          />
        </View>)}
    </View>
  )
}
export default Restaurants;
const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100f1f'
  },
  search: {
    borderWidth: 1,
    height: 40,
    width: windowWidth / 1.2,
    margin: 10,
    fontSize: 15,
    paddingLeft: 10,
    borderRadius:15,
    borderColor:'white',
    color:'white'
  },
  map: {
    flex: 2
  },
  locationpng: {
    height: 30,
    width: 30,
    tintColor:'#fd9827'
  },
  cardcontainer: {
    backgroundColor: 'lightgrey',
    margin: 10,
    height: windowHeight / 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20
  },
  resimg: {
    height: windowHeight / 8,
    width: windowWidth / 4,
    marginLeft: 10,
    borderRadius: 20
  },
  txtview: {
    marginLeft: 10
  },
  resname: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  restiming: {
    flexDirection: 'row',
    marginTop: 5
  },
  clockimg: {
    height: 15,
    width: 15,
    tintColor:'#fd9827'
  },
  timetxt: {
    marginLeft: 5
  },
  resaddress: {
    flexDirection: 'row',
    marginTop: 5,
    width: windowWidth / 1.9,
    height:50
  },
  addressimg: {
    height: 15,
    width: 15,
    tintColor:'#fd9827'
  },
  addresstxt: {
    marginLeft: 5
  }
});