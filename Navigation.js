import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import React, {Component} from 'react';
import {Pressable, View, Button, Dimensions, Appearance} from 'react-native';
import MainScreen from './screens/MainScreen';
import NoteEditModal from './screens/NoteEditModal';
import SettingsModal from './screens/SettingsModal';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Feather';

import {ThemeProvider} from 'styled-components';
import {connect} from 'react-redux';
import {switchTheme} from './redux/actions';
import {lightTheme, darkTheme} from './styles/theme';

const mapStateToProps = (state) => ({theme: state.themeReducer.theme});
const mapDispatchToProps = {switchTheme};

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Appearance.addChangeListener(({colorScheme}) => {
      colorScheme === 'light'
        ? this.props.switchTheme(lightTheme)
        : this.props.switchTheme(darkTheme);
    });
    return () => {
      Appearance.removeChangeListener();
    };
    return (
      <ThemeProvider theme={this.props.theme}>
        {this.props.switchTheme(darkTheme)}
      </ThemeProvider>
    );
  }

  render() {
    const Stack = createStackNavigator();

    return (
      <ThemeProvider theme={this.props.theme}>
        <NavigationContainer style={{backgroundColor: 'black'}}>
          <Stack.Navigator
            initialRouteName={'Main'}
            headerMode={'none'}
            options={{cardStyle: {backgroundColor: 'transparent'}}}>
            <Stack.Screen
              name="Main"
              component={MainScreen}
              initialParams={{user: this.props.user}}
              options={({navigation, routes}) => ({
                headerStyle: {
                  backgroundColor: this.props.theme.background,
                },
                headerTitleStyle: {
                  color: this.props.theme.blue,
                  fontSize: 20,
                  fontWeight: '500',
                },
                headerTitle: 'notee',
                headerLeft: () => (
                  <Pressable onPress={() => sheetRef.current.snapTo(0)}>
                    <Icon
                      style={{
                        height: 30,
                        width: 30,
                        margin: 12,
                        color: this.props.theme.blue,
                      }}
                      name="more-horizontal"
                      size={30}
                    />
                  </Pressable>
                ),

                headerRight: () => (
                  <Pressable onPress={() => createNote(this.props.user)}>
                    <Icon
                      style={{
                        height: 30,
                        width: 30,
                        margin: 12,
                        color: this.props.theme.blue,
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
              initialParams={{user: this.props.user}}
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
              initialParams={{user: this.props.user}}
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
      </ThemeProvider>
      // <View style={{alignSelf: 'center'}}>
      //   <Text style={{fontSize: 50}}>Welcome {user.email}</Text>
      //   <Button title="Sign out" onPress={() => auth().signOut()} />
      // </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
