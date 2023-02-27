import Geolocation from "@react-native-community/geolocation";
import React, { useEffect, useState } from "react";
import { View, Text, Image } from 'react-native'
import MapView, { Marker } from "react-native-maps";


const Restloc = ({ navigation, route }) => {

    const [loc, setoc] = useState({ latitude: 0, longitude: 0 });
    const [crnt, setCrnt] = useState({ latitude: 0, longitude: 0 });

    
    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                setCrnt({ latitude: position.coords.latitude, longitude: position.coords.longitude })
            }
        )
    }, [])

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        const lat = await route.params?.lat;
        const lng = await route.params?.lng;
        setoc({ latitude: lat, longitude: lng })
    }
    console.log(loc);

    return (
        <View style={{ flex: 1, backgroundColor: 'lightblue' }}>
            <MapView
                style={{ flex: 2 }}
                initialRegion={{
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
                />
                <Marker
                    coordinate={{ latitude: crnt.latitude, longitude: crnt.longitude }}
                >
                    <View>
                        <Image
                            source={require('../Images/current.png')}
                            style={{ width: 80, height: 180 }}
                            resizeMode="contain"
                        />
                    </View>
                </Marker>
            </MapView>
        </View>
    )
}
export default Restloc