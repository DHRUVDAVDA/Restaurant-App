import React, { useState, useEffect, useRef } from "react";
import {
  Text, View, StyleSheet, Image, TouchableOpacity, TextInput,
  Dimensions, FlatList, Pressable, BackHandler, ActivityIndicator
} from 'react-native';
import MapView, { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Restaurants = ({ navigation }) => {

  BackHandler.addEventListener('hardwareBackPress', handlebackbtn)
  function handlebackbtn() {
    BackHandler.exitApp();
    return true;
  }

  const [click, setClick] = useState(false);
  const [searchText, setSearchText] = useState();
  const [restaurantData, setRestaurantData] = useState([]);
  const [fetched, setFetched] = useState(true);

  const flatListRef = useRef(null);
  const mapRef = useRef(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 23.0356435,
    longitude: 72.504261,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {                                      //FETCH CURRENTLOCATION
    Geolocation.getCurrentPosition(
      position => {
        setMapRegion({ latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421, });
      },
      error => {
        console.log(error);
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 1000 },
    );
  }, []);

  console.log('map region', mapRegion);

  useEffect(() => {          //FETCH NEAREST RESTAURANT DATA
    if (mapRegion) {
      const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${mapRegion.latitude},${mapRegion.longitude}&radius=500&type=restaurant&key=AIzaSyBYo5s0uQPFgc8qafyO0Rzejpe78bi4ezw`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          setRestaurantData(data.results);
          console.log(data.results.menu);
          setFetched(false);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [mapRegion]);

  const searchFilteredData = searchText                     //FILTER RESTAURANT
    ? restaurantData.filter((x) =>
      x.name.toLowerCase().includes(searchText.toLowerCase())
    )
    : restaurantData;

  function displayMap() {
    setClick(true);
  }

  const handleMarkerPress = (restaurant) => {
    const index = restaurantData.indexOf(restaurant);
    flatListRef.current.scrollToIndex({ index })

    mapRef.current.animateToRegion({
      latitude: restaurant.geometry.location.lat,
      longitude: restaurant.geometry.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  return (
    <View style={Style.container}>

      {click ? (
        <View style={{ flex: 2 }}>
          <MapView
            style={Style.map}
            region={mapRegion}
            ref={mapRef}
          >

            {restaurantData.map((restaurant) => (
              <Marker
                key={restaurant.place_id}
                coordinate={{
                  latitude: restaurant.geometry.location.lat,
                  longitude: restaurant.geometry.location.lng,
                }}
                title={restaurant.name}
                description={restaurant.vicinity}
                onPress={() => handleMarkerPress(restaurant)}
              />
            ))}
            <Marker
              coordinate={{ latitude: mapRegion.latitude, longitude: mapRegion.longitude }}
              title="your are here"
            >
              <View>
                <Image
                  source={require('../Images/current.png')}
                  style={{ width: 80, height: 80 }}
                  resizeMode="contain"
                />
              </View>
            </Marker>
          </MapView>
          <View style={{ position: 'absolute', bottom: 55, left: 50, right: 50 }}>
            <FlatList
              horizontal
              pagingEnabled
              data={restaurantData}
              ref={flatListRef}
              keyExtractor={(item) => item.place_id}
              renderItem={({ item }) => {
                const photoReference = item.photos && item.photos.length > 0 && item.photos[0].photo_reference;
                const photoUrl = photoReference && `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=AIzaSyBYo5s0uQPFgc8qafyO0Rzejpe78bi4ezw`;
                return (
                  <TouchableOpacity onPress={() => handleMarkerPress(item)}>
                    <View style={{ height: windowHeight / 5, width: windowWidth - 100, backgroundColor: 'lightgrey', alignItems: 'center' }}>
                      <View style={{ flexDirection: 'row', width: windowWidth - 40, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15, color: 'black' }}>{item.name} ⭐{item.rating}</Text>
                      </View>
                      <Image style={{ height: windowHeight / 6, width: windowWidth / 1.5 }} source={{ uri: photoUrl }} />
                    </View>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
          <TouchableOpacity onPress={() => { setClick(false) }} style={{ position: 'absolute', right: 5 }}>

            <Image style={{ height: 30, width: 30 }} source={require('../Images/cross.png')} />

          </TouchableOpacity>
        </View>)
        : (<View style={Style.container}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

            <TextInput onChangeText={(text) => { setSearchText(text) }}
              value={searchText} placeholder="search by name" placeholderTextColor='white' style={Style.search}></TextInput>

            <TouchableOpacity onPress={() => { displayMap() }}>
              <Image style={Style.locationpng} source={require('../Images/location.png')} />
            </TouchableOpacity>
          </View>
          {fetched ? (<View><ActivityIndicator size={"large"} color={'#fd9827'} /></View>)
            : (<View style={{ marginBottom: 50 }}>
              <FlatList
                data={searchFilteredData}
                keyExtractor={(item) => item.place_id}
                renderItem={({ item }) => {
                  const photoReference = item.photos && item.photos.length > 0 && item.photos[0].photo_reference;
                  const photoUrl = photoReference && `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=AIzaSyBYo5s0uQPFgc8qafyO0Rzejpe78bi4ezw`;
                  return (
                    <Pressable onPress={() => navigation.navigate('Restaurantdetail', { item: item, url: photoUrl })}>
                      <View style={Style.cardcontainer}>
                        {photoUrl ? (<Image source={{ uri: photoUrl }} style={Style.resimg} />) : (<View><Text>no image found</Text></View>)}


                        <View style={Style.txtview}>

                          <Text style={Style.resname}>{item.name} ⭐{item.rating}</Text>

                          <View style={Style.restiming}>
                            <Image style={Style.clockimg} source={require('../Images/clock.png')} />
                            <Text style={Style.timetxt}>{item.opening_hours ? 'Open' : 'Closed'}</Text>
                          </View>

                          <View style={Style.resaddress}>
                            <Image style={Style.addressimg} source={require('../Images/location.png')} />
                            <Text style={Style.addresstxt}>{item.vicinity}</Text>
                          </View>

                        </View>
                      </View>
                    </Pressable>
                  )
                }}
              />
            </View>)}

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
    height: 35,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    width: windowWidth / 1.8,
  },
  restiming: {
    flexDirection: 'row',
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
    width: windowWidth / 1.9,
    height: 50,
    marginTop: 5
  },
  addressimg: {
    height: 15,
    width: 15,
    tintColor: '#fd9827'
  },
  addresstxt: {
    marginLeft: 5,
  }
});