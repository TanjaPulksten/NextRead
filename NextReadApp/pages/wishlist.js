import { StatusBar } from 'expo-status-bar';
import React from 'react';
import BlankSpacer from "react-native-blank-spacer";
import { ImageBackground, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button } from 'react-native-elements';

export default function WishList({navigation}) {
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
          <Button
            title="Placeholder"
            buttonStyle={styles.button}
            titleStyle={{fontSize: 20}}
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
});
