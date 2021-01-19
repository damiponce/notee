import React, {Component} from 'react';
import {SafeAreaView, View, Button, StatusBar} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '400248842598-m40u9gp5pj0e7te68ercmk5sfvih8v13.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export class LoginScreen extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle="default" />
        <View
          style={{
            flex: 1,
            marginTop: StatusBar.currentHeight,
            justifyContent: 'center',
          }}>
          <Button
            style={{backgroundColor: 'red'}}
            title="Google Sign-In"
            onPress={() => onGoogleButtonPress()}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default LoginScreen;
