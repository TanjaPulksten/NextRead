import { StatusBar } from 'expo-status-bar';
import React from 'react';
import BlankSpacer from "react-native-blank-spacer";
import { ImageBackground, StyleSheet, } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import FindBooks from "./pages/searchbooks.js";
import WishList from "./pages/wishlist.js";
import Map from "./pages/map.js";
import BookDetails from "./pages/bookdetails.js";
import AddWish from "./pages/components/addtowishlist.js";
import WishListDetails from "./pages/wishdetails.js";

const Stack = createStackNavigator();

function FrontPage({navigation}) {
  return (
    <SafeAreaView style={styles.safecontainer}>
      <ImageBackground source={require("./pages/images/frontpg-small.jpg")} style={styles.image}>
        <Text h1 h1Style={{color:"white"}}>NextRead</Text>
        <Text h3 h3Style={{color:"white"}}>Find your next favorite book!</Text>
        <BlankSpacer height={330} />
        <Button
          title="Find new books"
          buttonStyle={styles.button}
          titleStyle={{fontSize: 20}}
          onPress={() => navigation.navigate('Find Books')}
        />
        <BlankSpacer height={10} />
        <Button
          title="Wish List"
          buttonStyle={styles.button}
          titleStyle={{fontSize: 20}}
          onPress={() => navigation.navigate('Wish List')}
        />
        <BlankSpacer height={10} />
        <Icon
          name="explore"
          type="material"
          color="#CDCDCD"
          size={40}
          onPress={() => navigation.navigate('Map')}
        />
      </ImageBackground>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={FrontPage}
          options= {{headerShown: false}}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options= {{headerShown: false}}
        />
        <Stack.Screen
          name="Find Books"
          component={FindBooks}
          options= {{headerShown: false}}
        />
        <Stack.Screen
          name="Book Details"
          component={BookDetails}
          options= {{headerShown: false}}
        />
        <Stack.Screen
          name="Add Wish"
          component={AddWish}
          options= {{headerShown: false}}
        />
        <Stack.Screen
          name="Wish List"
          component={WishList}
          options= {{headerShown: false}}
        />
        <Stack.Screen
          name="Wish Details"
          component={WishListDetails}
          options= {{headerShown: false}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safecontainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#723711",
    width: 170,
  },
});
