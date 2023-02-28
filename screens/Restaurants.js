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

  const handleMarkerPress = (restaurant) => {           //HANDLES MARKER PRESS OF FLATLIST PRESS
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
          <View style={Style.Flatlistonmap}>
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
                    <View style={Style.Flatcard}>
                      <View style={Style.Flattxtimgcontainer}>
                        <Text style={Style.Flattxt}>{item.name} ⭐{item.rating}</Text>
                      </View>
                      <Image style={Style.Flatimg} source={{ uri: photoUrl }} />
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
              value={searchText} placeholder="Search by name" placeholderTextColor='white' style={Style.search}></TextInput>

            <TouchableOpacity onPress={() => { displayMap() }}>
              <Image style={Style.locationpng} source={require('../Images/location.png')} />
            </TouchableOpacity>
          </View>
          {fetched ? (<View><ActivityIndicator size={"large"} color={'#fd9827'} /></View>)
            : (<View>
              <FlatList
                contentContainerStyle={{ paddingBottom: 80 }}
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

                        </View>

                        <View style={Style.timeview}>
                          <Image source={require('../Images/clock.png')} style={Style.clockimg} />
                          <Text style={Style.timetxt}>{item.opening_hours ? 'Open' : 'Closed'}</Text>
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
  Flatlistonmap: {
    position: 'absolute',
    bottom: 55,
    left: 50,
    right: 50
  },
  Flatcard: {
    height: windowHeight / 5,
    width: windowWidth - 100,
    backgroundColor: 'lightgrey',
    alignItems: 'center'
  },
  Flattxtimgcontainer: {
    flexDirection: 'row',
    width: windowWidth - 40,
    justifyContent: 'center'
  },
  Flattxt: {
    fontSize: 15,
    color: 'black'
  },
  Flatimg: {
    height: windowHeight / 6,
    width: windowWidth / 1.5
  },
  cardcontainer: {
    backgroundColor: 'lightgrey',
    marginTop: 15,
    height: windowHeight / 4.2,
    width: windowWidth - 40,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignSelf: 'center'
  },
  resimg: {
    height: windowHeight / 4.2,
    width: windowWidth - 40,
    marginLeft: 10,
    marginRight: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  txtview: {
    width: windowWidth - 40,
    opacity: 0.8,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'lightgrey',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: 10,
  },
  resname: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center'
  },
  timeview: {
    width: windowWidth / 5,
    height: windowHeight / 28,
    position: 'absolute',
    flexDirection: 'row',
    right: 7,
    top: 7,
    backgroundColor: 'black',
    opacity: 0.7,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  clockimg: {
    height: 20,
    width: 20,
    tintColor: '#fd9827'
  },
  timetxt: {
    marginLeft: 3,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15
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