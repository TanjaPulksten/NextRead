import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect }  from 'react';
import BlankSpacer from "react-native-blank-spacer";
import { ImageBackground, StyleSheet, View, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Input, Button, Icon, ListItem } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

export default function FindBooks({navigation}) {

  const [author, setAuthor] = useState("");
  const [keyword, setKeyword] = useState("");
  const [genre, setGenre] = useState("Adventure");
  const [params, setParams] = useState("");
  const [books, setBooks] = useState([]);

  const [genreValues, setGenreValues] = useState([
    {id:0, genre: ""},
    {id:1, genre: "Adventure"},
    {id:2, genre: "Action"},
    {id:3, genre: "Historical"},
    {id:4, genre: "Fantasy"},

    // "Adventure", "Action", "Children's", "Crime", "Cyberpunk",
    // "Historical", "Horror", "Fantasy", "Fiction", "Mystery","Non-Fiction", "Novel",
    // "Quest", "Romance", "Science Fiction", "Thriller", "Young Adult",
  ]);


  // Hakee kirjat Google Booksista
  const findBooks = () => {
    console.log("Book search started")

    if(keyword == "" && genre == "" && author == "") {
    console.log("nope")
    } else {

      const trimAuthor = author.replace(/\s+/g, '');
      const fields = "&fields=items(id,volumeInfo(title,authors,description,categories,imageLinks))"
      const googlekey = "AIzaSyCWpMbiOJD8n3ckMVORvrstAMliZJ0Cbdk"

      const url = "https://www.googleapis.com/books/v1/volumes?q=" + keyword + "+subject:" + genre + "+inauthor:" + trimAuthor + fields+ "&langRestrict=en&key=" + googlekey
      console.log(url)

      //https://www.googleapis.com/books/v1/volumes?q=+subject:+inauthor:Maas,SarahJ.&fields=items(id,volumeInfo(title,authors,description,categories,imageLinks))&langRestrict=en&key=AIzaSyCWpMbiOJD8n3ckMVORvrstAMliZJ0Cbdk

      fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setBooks(responseJson.items)
      })

      .catch((error) => {
        Alert.alert('Error: ', error);
      });

      console.log("Kirjat:")
      console.log(books)
    }
  }


  // KESKEN ei toimi! Pitäskö kirjadata tallentaa kuitenkin firebaseen ja sitten vaan aina uuden haun alkaessa luoda uusi lista / tyhjentää vanha lista jos sellainen on?
  const renderItem = ({ book }) => (

    <ListItem key={book.id} bottomDivider>
      {console.log(book)}
      <ListItem.Content>
        <ListItem.Title> {book.volumeInfo.title} </ListItem.Title>
        {/* <ListItem.Subtitle> {book.authors} </ListItem.Subtitle> */}
      </ListItem.Content>
      {/* <ListItem.Chevron name="favorite"/> */}
    </ListItem>
  )

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
            containerStyle={{ width: '68%', marginBottom: -15 }}
            labelStyle={{color:"white", marginLeft: 5}}
            inputStyle = {styles.textinput}
            clearButtonMode = "always"
            autoCapitalize='none'
            onChangeText = {keyword => setKeyword(keyword)}
            value = {keyword}
          />

          <Picker
            selectedValue={genre}
            style={{width:200}}
            itemStyle={{backgroundColor: "rgba(114, 55, 17, .3)", color: "white", borderRadius: 25,}}
            onValueChange={(itemValue, itemIndex) =>
                setGenre(itemValue)}
          >
            {genreValues.map((item) => {
              return <Picker.Item label={item.genre} value={item.genre} key={item.id} />
            })}
          </Picker>

          <BlankSpacer height={10} />
          <Button
            title="Find books"
            buttonStyle={styles.button}
            titleStyle={{fontSize: 20}}
            onPress={findBooks}
          />

          <FlatList
            data = {books}
            renderItem = {renderItem}
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
    height: 40,
    width: 200,
    color: "white",
    backgroundColor: '#F5F5F6',
    borderColor: "gray",
    borderWidth: 2,
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
