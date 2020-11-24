import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect }  from 'react';
import BlankSpacer from "react-native-blank-spacer";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground, StyleSheet, View, FlatList, Share } from 'react-native';
import { Text, Input, Button, Icon, Image, ListItem } from 'react-native-elements';
import { Rating, AirbnbRating } from 'react-native-ratings';


export default function WishListDetails({route, navigation}) {

  const book = route.params
  const image = book.cover


  const shareBook = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this great book! \n' + book.title + " by " + book.authors[0],
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message)
    }
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
            onPress={() => navigation.navigate('Wish List')}
          />
        </View>

        <View style={styles.container1}>
          <Text h2 h2Style={{color:"white", textAlign:"center"}}>{book.title}</Text>
          {book.authors[0].map((author, index) => (
            <Text key={index} style={{color:"white", fontSize: 15}}> {author} </Text>
          ))}
        </View>

        <AirbnbRating
          count={5}
          reviews={["Interesting 🧐", "Sounds Good! 😚", "Wow 🤗", "Sounds amazing! 🤩", "💯 Unbelievable 💯"]}
          isDisabled={true}
          defaultRating={book.rating}
          size={35}
          reviewColor={"#CDCDCD"}
          reviewSize={20}
          starContainerStyle={{marginTop:-8}}
        />

        <BlankSpacer height={10} />
        <View style={styles.container2}>
          <Image
            source={{uri: image}}
            style={{width: 100, height:150, margin: 10, justifyContent: 'center'}}
          />
          <Text numberOfLines={13} style={{color:"white", fontSize: 17, maxWidth:"70%", marginLeft:10}}>{book.description}</Text>
        </View>


        <View style={{justifyContent: 'center', alignItems: 'center',}}>

          <BlankSpacer height={10} />
          <Text style={{color:"white",}}>Added on {book.date}</Text>

          <BlankSpacer height={15} />
          <Icon
            name="share-variant"
            type="material-community"
            size={45}
            color="#CDCDCD"
            onPress={shareBook}
          />
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
  container1: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    color: "#CDCDCD",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
  },
  container2: {
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
    backgroundColor:"rgba(114, 55, 17, .5)",
    maxHeight: 320,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
  },
  backbtn: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 5,
  },
  button: {
    backgroundColor: "#723711",
    width: 170,
  },
});
