import { StatusBar } from 'expo-status-bar';
import React from 'react';
import BlankSpacer from "react-native-blank-spacer";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground, StyleSheet, View, Share } from 'react-native';
import { Text, Icon, Image } from 'react-native-elements';

import AddWish from "./components/addtowishlist";


export default function BookDetails({route, navigation}) {

  const book = route.params
  const image = book.volumeInfo.imageLinks.thumbnail


  const shareBook = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this great book! \n' + book.volumeInfo.title + " by " + book.volumeInfo.authors[0],
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
            onPress={() => navigation.navigate('Find Books')}
          />
        </View>

        <View style={styles.container}>
          <Text h2 h2Style={{color:"white", textAlign:"center"}}>{book.volumeInfo.title}</Text>
          {book.volumeInfo.authors.map((author, index) => (
            <Text key={index} style={{color:"white", fontSize: 17}}> {author} </Text>
          ))}
        </View>

        <View style={styles.container1}>
          {book.volumeInfo.categories.map((category, index) => (
              <Text key={index} style={{color:"white", fontSize: 15, fontStyle: 'italic'}}> {category} </Text>
          ))}
        </View>

        <BlankSpacer height={10} />
        <View style={styles.container2}>
          <Image
            source={{uri: image}}
            style={{width: 100, height:150, margin: 10, justifyContent: 'center'}}
          />
          <Text numberOfLines={13} style={{color:"white", fontSize: 17, maxWidth:"70%", marginLeft:10}}>{book.volumeInfo.description}</Text>
        </View>

        <BlankSpacer height={10} />
        <View style={{flexDirection: "row", justifyContent: 'center', alignItems: 'center',}}>
          <Icon
            name="favorite"
            type="material"
            size={50}
            color="#D63F32"
            onPress={() => navigation.navigate('Add Wish', book)}
          />
          <BlankSpacer width={10} />
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
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    color: "#CDCDCD",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
  },
  container1: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    color: "#CDCDCD",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
  },
  container2: {
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
    backgroundColor:"rgba(114, 55, 17, .5)",
    maxHeight: 300,
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
});
