import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {Pressable, Text, Button} from 'react-native';
import {LoginScreen} from './screens/LoginScreen';
import {MainScreen} from './screens/MainScreen';
import {NoteEditModal} from './screens/NoteEditModal';
import {SettingsModal} from './screens/SettingsModal';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import Icon from 'react-native-vector-icons/Feather';
import SFSymbols from './assets/SFSymbols';

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <LoginScreen />
      </NavigationContainer>
    );
  }

  // create navigation stack
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Main'}>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          initialParams={{user: user}}
          options={({navigation, routes}) => ({
            headerTitleStyle: {color: '#77f', fontSize: 20, fontWeight: '500'},
            headerTitle: 'notee',
            headerLeft: () => (
              <Pressable onPress={() => navigation.navigate('Settings')}>
                <Icon
                  style={{
                    height: 30,
                    width: 30,
                    margin: 12,
                    color: '#77f',
                  }}
                  name="more-horizontal"
                  size={30}
                />
              </Pressable>
            ),

            headerRight: () => (
              <Pressable onPress={() => createNote(user)}>
                <Icon
                  style={{
                    height: 30,
                    width: 30,
                    margin: 12,
                    color: '#77f',
                  }}
                  name="plus"
                  size={30}
                />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="Note Edit"
          component={NoteEditModal}
          initialParams={{user: user}}
          mode="modal"
          options={{
            headerTitle: 'Edit note',
            headerLeft: '',
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsModal}
          initialParams={{user: user}}
          mode="modal"
          options={{
            headerTitle: 'Settings',
            headerLeft: '',
            gestureEnabled: true,
            gestureDirection: 'vertical',
            cardStyleInterpolator:
              CardStyleInterpolators.forModalPresentationIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

    // <View style={{alignSelf: 'center'}}>
    //   <Text style={{fontSize: 50}}>Welcome {user.email}</Text>
    //   <Button title="Sign out" onPress={() => auth().signOut()} />
    // </View>
  );
}

function createNote(user) {
  let unid = uuidv4();
  database()
    .ref(`/users/${user.uid}/notes/${unid}`)
    .set({
      key: unid,
      createdDateTime: '',
      updatedDateTime: '',
      title: Math.random() * 1000,
      textData: '',
      starred: false,
    });
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default App;
