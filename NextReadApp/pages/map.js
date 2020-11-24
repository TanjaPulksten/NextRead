import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import BlankSpacer from "react-native-blank-spacer";
import { ImageBackground, StyleSheet, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Icon } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import * as Location from 'expo-location';


export default function Map({navigation}) {

  const [data, setData] = useState({latitude:60.16952, longitude: 24.93545});
  const [places, setPlaces] = useState([]);

    useEffect(() => {getMyLocation();}, []);

    // Permission to use location & get user location
    const getMyLocation = async () => {
      try {
        let { status } = await Location.requestPermissionsAsync();

        if (status !== "granted") {
          Alert.alert("No permission to access location");
        } else {
          let mylocation = await Location.getCurrentPositionAsync({});
          setData(mylocation.coords)
          console.log("my location set")
        }
      } catch (error) {
        Alert.alert('Error: ', error);
      }
    }

    useEffect(() => {findLocation();}, [data]);

    // Search nearby book stores via Google Places
    const findLocation = () => {
      console.log("start search")
      const googlekey = "GOOGLE_KEY"

      const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + data.latitude +","+ data.longitude + "&radius=1500&type=book_store&key=" + googlekey

      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {

        var resPlaces = []
          for(let googlePlace of responseJson.results) {
            var place = {}
            var lat = googlePlace.geometry.location.lat;
            var lng = googlePlace.geometry.location.lng;
            var coordinate = {
              latitude: lat,
              longitude: lng,
            }

            place['coordinate'] = coordinate
            place['placeVicinity'] = googlePlace.vicinity
            place['placeName'] = googlePlace.name

            resPlaces.push(place);
          }
        setPlaces(resPlaces);
      })
      .catch((error) => {
        Alert.alert('Error: ', error);
      });

    }

  return (
    <SafeAreaView style={styles.safecontainer}>
      <ImageBackground source={require("./images/bgimg-small-dark.jpg")} style={styles.image}>
        <View style={styles.backbtn}>
          <Icon
            name="reply"
            type="material"
            color="#CDCDCD"
            size={40}
            onPress={() => navigation.navigate('Home')}
          />
        </View>
        <View style={styles.container}>
        <Text h2 h2Style={{color:"white", textAlign: "center"}}>Find your nearest {"\n"} Book Stores</Text>

        <BlankSpacer height={10} />
        <MapView
          provider={ PROVIDER_GOOGLE }
          style= {styles.map}
          showsUserLocation={true}
          region={{
            latitude: data.latitude,
            longitude: data.longitude,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221,
          }}
        >
          {places.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.placeName}
              description={marker.placeVicinity}
            />
          ))}
        </MapView>
        <BlankSpacer height={15} />
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safecontainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backbtn: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
  },
  map: {
    flex: 1,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
});
