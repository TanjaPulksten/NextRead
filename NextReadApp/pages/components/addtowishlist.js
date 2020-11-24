import { StatusBar } from 'expo-status-bar';
import React, { useState }  from 'react';
import BlankSpacer from "react-native-blank-spacer";
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Rating, AirbnbRating } from 'react-native-ratings';
import moment from 'moment';
import firebase from "./firebase.js";


export default function AddWish({route, navigation}) {

  const book = route.params

  const id = book.id;
  const title = book.volumeInfo.title;
  const authors = [book.volumeInfo.authors];
  const genres = [book.volumeInfo.categories];
  const description = book.volumeInfo.description;
  const cover = book.volumeInfo.imageLinks.thumbnail;

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(true);

  const [rating, setRating] = useState(1);
  const [notification, setNotification] = useState("");


  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  }

  const addToWishList = () => {
    const fbDate = moment(date).format('LL'); //Firebase doesen't understand Date(), moment gives string "November 17, 2020"

    var newBook = firebase.database().ref('WishList/').push();
    newBook.set({
      'title': title, "authors": authors, "genres": genres, "date": fbDate,
      "description": description, "cover": cover, "rating": rating, "id": id, "key": newBook.key,
    })
    setNotification("Book added to Wish List!")
    setTimeout(() => {navigation.navigate('Find Books')}, 1500)
  }

  return(
    <SafeAreaView style={styles.safecontainer}>
    <ImageBackground source={require("../images/bgimg-small-dark.jpg")} style={styles.image}>
      <BlurView intensity={80} tint="dark" style={{height:"100%"}}>
        <View style={styles.backbtn}>
          <Icon
            name="reply"
            type="material"
            color="#CDCDCD"
            size={40}
            onPress={() => navigation.navigate('Book Details')}
          />
        </View>

        <BlankSpacer height={10} />
        <View style={styles.container1}>
          <Text h2 h2Style={{color:"white", textAlign:"center"}}>Add {title} to your Wish List</Text>

          <BlankSpacer height={10} />
          <AirbnbRating
            count={5}
            reviews={["Interesting 🧐", "Sounds Good! 😚", "Wow 🤗", "Sounds amazing! 🤩", "💯 Unbelievable 💯"]}
            defaultRating={1}
            size={35}
            reviewColor={"#CDCDCD"}
            reviewSize={20}
            starContainerStyle={{marginTop:-8}}
            onFinishRating={rating => setRating(rating)}
          />

          <BlankSpacer height={10} />
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="spinner"
              onChange={onDateChange}
              textColor="#CDCDCD"
              style={{height: 150, width:"90%",}}
            />
          )}

          <BlankSpacer height={20} />
          <Button
            title=" ADD "
            buttonStyle={styles.button}
            titleStyle={{fontSize: 20}}
            onPress={() => addToWishList()}
          />

          <BlankSpacer height={10} />
          <Text style={{color:"#CDCDCD"}}>{notification}</Text>
        </View>
      </BlurView>
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
    justifyContent: 'center',
    color: "#CDCDCD",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 10,
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
