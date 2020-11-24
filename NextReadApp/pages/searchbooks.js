import { StatusBar } from 'expo-status-bar';
import React, { useState }  from 'react';
import BlankSpacer from "react-native-blank-spacer";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground, StyleSheet, Keyboard, View, FlatList } from 'react-native';
import { Text, Input, Button, Icon, ListItem } from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector';

import Genres from "./components/genres.js"
import BookDetails from "./bookdetails.js"


export default function FindBooks({navigation}) {

  const [author, setAuthor] = useState("");
  const [keyword, setKeyword] = useState("");
  const [genre, setGenre] = useState("");
  const [note, setNote] = useState("");
  const [books, setBooks] = useState([]);

  const data = Genres();


  const findBooks = () => {
    Keyboard.dismiss();

    if(keyword == "" && genre == "" && author == "") {
    setNote("Use search inputs!") //search with nothing is not ok

    } else {
      //set up for google api search:
      const trimAuthor = author.replace(/\s+/g, '');
      let setSubject = ""
      if(genre !== "") {
        setSubject = '"' + genre + '"';
      }
      const fields = "&fields=items(id,volumeInfo(title,authors,description,categories,imageLinks))" //restrict fields in responseJson
      const googlekey = "AIzaSyCWpMbiOJD8n3ckMVORvrstAMliZJ0Cbdk"

      //url contains: user inputs, response field restictions, max number of results and language preference
      const url = "https://www.googleapis.com/books/v1/volumes?q=" + keyword + "+subject:" + setSubject + "+inauthor:" + trimAuthor + fields + "&maxResults=15&langRestrict=en&key=" + googlekey

      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if(Object.keys(responseJson).length != 0 ) {
          setBooks(responseJson.items)
          setNote("")
        } else {
          setNote("No Books. Try another search.")
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("Error. Try another search.");
      });
    }
  }

// renderItem constructs the list of books. If statement skips books that have no author or category (genre) => fixes app crash
  const renderItem = ({ item }) => {
    if(item.volumeInfo.hasOwnProperty("authors") === true && item.volumeInfo.hasOwnProperty("categories") === true){
      return(
        <ListItem
          key={item.id}
          bottomDivider
          containerStyle= {{backgroundColor:"rgba(114, 55, 17, .4)",}}
          onPress={() => navigation.navigate('Book Details', item)}
        >
          <ListItem.Content>
            <ListItem.Title style={{fontSize: 18, color:"#CDCDCD"}}> {item.volumeInfo.title} </ListItem.Title>
            {item.volumeInfo.authors.map((author, index) => (
              <ListItem.Subtitle key={index} style={{color:"#CDCDCD"}}> {author} </ListItem.Subtitle>
            ))}
          </ListItem.Content>
          <ListItem.Chevron name="more-horiz" type= "material"/>
        </ListItem>
      )}
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
          <Text h2 h2Style={{color:"#F5F5F6"}}>Find new books!</Text>

          <BlankSpacer height={10} />
          <Input
            label={"Author"}
            placeholder = {"Last Name, First Name"}
            labelStyle={{color:"white", marginLeft: 5}}
            containerStyle={{ width: '68%', marginBottom: -15 }}
            inputStyle={styles.textinput}
            clearButtonMode = "always"
            onChangeText = {author => setAuthor(author)}
            value = {author}
          />
          <Input
            label={"Free Search"}
            placeholder = {"Key word"}
            containerStyle={{ width: '68%', marginBottom: -10 }}
            labelStyle={{color:"white", marginLeft: 5}}
            inputStyle = {styles.textinput}
            clearButtonMode = "always"
            autoCapitalize='none'
            onChangeText = {keyword => setKeyword(keyword)}
            value = {keyword}
          />
          <ModalSelector data={data} optionTextStyle={{color: "#723711"}} onChange={option => {setGenre(option.label)}}>
            <Input
              inputStyle={{color:"black", fontSize: 17, textAlign:"center",}}
              containerStyle={styles.picker}
              editable={false}
              placeholder="Select Genre"
              value={genre}
            />
          </ModalSelector>

          <BlankSpacer height={10} />
          <Button
            title="Find books"
            buttonStyle={styles.button}
            titleStyle={{fontSize: 20}}
            onPress={() => findBooks()}
          />

          <BlankSpacer height={10} />
          <Text style={{color:"white", marginBottom: 5}}>{note}</Text>
          <FlatList
            data = {books}
            renderItem = {renderItem}
            extraData = {note}
            style = {{width:"100%"}}
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
  button: {
    backgroundColor: "#723711",
    width: 170,
  },
  picker: {
    width: 120,
    height: 42,
    backgroundColor: '#F5F5F6',
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  textinput: {
    backgroundColor: '#F5F5F6',
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    padding: 5,
  },
});
