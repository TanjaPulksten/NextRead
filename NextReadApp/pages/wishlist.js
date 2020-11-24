import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import BlankSpacer from "react-native-blank-spacer";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground, StyleSheet, View, FlatList } from 'react-native';
import { Text, ListItem, Icon } from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector';

import firebase from "./components/firebase.js";


export default function WishList({navigation}) {

  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [update, setUpdate] = useState("");

  const sortOptions = [
    {key: 0, label: "Oldest to Newest"},
    {key: 1, label: "Newest to Oldest"},
    {key: 2, label: "Highest Rating First"},
    {key: 3, label: "Lowest Rating First"},
  ];

  useEffect(() => {
      firebase.database().ref('WishList/').on('value', snapshot => {
        const fbdata = snapshot.val();
        const books = Object.values(fbdata);
        setData(books);
        setSortedData(books);
      });
    }, []);


    const deleteBook = (item) => {
      firebase.database().ref('WishList/' + item.key).remove();
    }

    const sortWishList = (sort) => {
      if(sort == "Oldest to Newest"){
        setSortedData(data) //Firebase is oldest to newest by default
        setUpdate("Oldest")

      } else if (sort == "Newest to Oldest") {
        let newestList = data
        newestList.reverse()
        setSortedData(newestList) //reversing Firebase makes newest to oldest
        setUpdate("Newest first")

      } else if (sort == "Highest Rating First") {
        let highestList = data
        highestList.sort((a,b) => a.rating - b.rating);
        highestList.reverse()
        setSortedData(highestList) //sorting ratings numerically and reversing gives higest ratings first
        setUpdate("Start with best books")

      } else if (sort == "Lowest Rating First") {
        let lowestList = data
        lowestList.sort((a,b) => a.rating - b.rating);
        setSortedData(lowestList) //sorting ratings numerically gives lowest rating first
        setUpdate("Lowest ratings go")
      }
    }

    const renderItem = ({ item }) => {
      return(
        <ListItem
          key={item.id}
          bottomDivider
          containerStyle= {{backgroundColor:"rgba(114, 55, 17, .4)",}}
          onPress={() => navigation.navigate('Wish Details', item)}
          onLongPress={() => deleteBook(item)}
        >
          <ListItem.Content>
            <ListItem.Title style={{fontSize: 18, color:"#CDCDCD"}}> {item.title} </ListItem.Title>
            {item.authors[0].map((author, index) => (
              <ListItem.Subtitle key={index} style={{color:"#CDCDCD"}}> {author} </ListItem.Subtitle>
            ))}
          </ListItem.Content>
          <ListItem.Chevron name="more-horiz" type= "material"/>
        </ListItem>
      )
    }

  return (
    <SafeAreaView style={styles.container}>
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
          <Text h2 h2Style={{color:"white"}}>My Wish List</Text>

          <BlankSpacer height={10} />
          <ModalSelector
            data={sortOptions}
            initValue="Sort Books"
            selectTextStyle={{color: "white"}}
            optionTextStyle={{color: "#723711"}}
            onChange={option => {sortWishList(option.label)}}
          />

          <BlankSpacer height={10} />
          <FlatList
            data = {sortedData}
            extraData={update}
            renderItem = {renderItem}
            style = {{width:"90%"}}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
  },
  backbtn: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 5,
  },
});
