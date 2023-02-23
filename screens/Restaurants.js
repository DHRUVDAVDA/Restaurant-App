import React, { useState, useEffect } from "react";
import {
  Text, View, StyleSheet, Image, TouchableOpacity, Button, TextInput,
  Dimensions, PermissionsAndroid, FlatList, Pressable, BackHandler
} from 'react-native';
import MapView, { Callout, Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { Cloves, Mcd, restaurants } from "../sample restaurant/rest";
import WebView from "react-native-webview";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Restaurants = ({ navigation }) => {

  BackHandler.addEventListener('hardwareBackPress', handlebackbtn)
  function handlebackbtn() {
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
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

        <TextInput onChangeText={(text) => { setSearchText(text) }}
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
          <Marker coordinate={city} title="hallo">
            <View>
              <Image source={require('../Images/current.png')} style={{ height: 40, width: 40 }} />
            </View>
          </Marker>

          <Marker coordinate={restaurants[0].cords} >
            <Callout>
              <View style={{height:100 , width:200}}>
                <WebView source={{uri:restaurants[0].url}} style={{ height: 100, width: 100}} />
                <Text>{restaurants[0].name}</Text>
              </View>
            </Callout>
          </Marker>

          <Marker coordinate={restaurants[1].cords} >
          <Callout>
              <View>
                <WebView source={{uri:restaurants[1].url}} style={{ height: 100, width: 100 }} />
                <Text>{restaurants[1].name}</Text>
              </View>
            </Callout>
          </Marker>

          <Marker coordinate={restaurants[2].cords} >
          <Callout>
              <View>
                <WebView source={{uri:restaurants[2].url}} style={{ height: 100, width: 100 }} />
                <Text>{restaurants[2].name}</Text>
              </View>
            </Callout>
          </Marker>

          <Marker coordinate={restaurants[3].cords} >
          <Callout>
              <View>
                <WebView source={{uri:restaurants[3].url}} style={{ height: 100, width: 100 }} />
                <Text>{restaurants[3].name}</Text>
              </View>
            </Callout>
          </Marker>

          <Marker coordinate={restaurants[4].cords} >
          <Callout>
              <View>
                <WebView source={{uri:restaurants[4].url}} style={{ height: 100, width: 100 , alignSelf:'center' }} />
                <Text>{restaurants[4].name}</Text>
              </View>
            </Callout>
          </Marker>

          <Marker coordinate={restaurants[5].cords} >
          <Callout>
              <View>
                <WebView source={{uri:restaurants[5].url}} style={{ height: 100, width: 100 }} />
                <Text>{restaurants[5].name}</Text>
              </View>
            </Callout>
          </Marker>
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
                <Pressable onPress={() => navigation.navigate('Restaurantdetail', { name: item.name })}>
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
  bubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15
  },
  name: {
    fontSize: 16,
    marginBottom: 5
  },
  search: {
    borderWidth: 1,
    height: 40,
    width: windowWidth / 1.2,
    margin: 10,
    fontSize: 15,
    paddingLeft: 10,
    borderRadius: 15,
    borderColor: 'white',
    color: 'white'
  },
  map: {
    flex: 2
  },
  locationpng: {
    height: 30,
    width: 30,
    tintColor: '#fd9827'
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
    tintColor: '#fd9827'
  },
  timetxt: {
    marginLeft: 5
  },
  resaddress: {
    flexDirection: 'row',
    marginTop: 5,
    width: windowWidth / 1.9,
    height: 50
  },
  addressimg: {
    height: 15,
    width: 15,
    tintColor: '#fd9827'
  },
  addresstxt: {
    marginLeft: 5
  }
});