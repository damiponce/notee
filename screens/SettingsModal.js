import React, {Component} from 'react';
import {
  Button,
  View,
  Text,
  Switch,
  FlatList,
  Image,
  Appearance,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';

import {connect} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import {switchTheme} from '../redux/actions';
import {lightTheme, darkTheme} from '../styles/theme';

const mapStateToProps = (state) => ({theme: state.themeReducer.theme});
const mapDispatchToProps = {switchTheme};

class SettingsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      darkModeSwitch: this.props.theme.mode === 'dark' ? true : false,
      data: [{key: 0, height: 80, icon: 'log-out'}],
    };
  }

  componentDidMount() {
    Appearance.addChangeListener(({colorScheme}) => {
      this.setState({
        darkModeSwitch: this.props.theme.mode === 'dark' ? true : false,
      });
    });
    return () => {
      Appearance.removeChangeListener();
    };
  }

  toggleDarkMode = () => {
    <ThemeProvider theme={this.props.theme}>
      {this.state.darkModeSwitch == false
        ? (this.setState({
            darkModeSwitch: true,
          }),
          this.props.switchTheme(darkTheme))
        : (this.setState({
            darkModeSwitch: false,
          }),
          this.props.switchTheme(lightTheme))}
    </ThemeProvider>;
  };

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <View
          style={{
            height: 450,
            backgroundColor: this.props.theme.background3,
            justifyContent: 'flex-start',
            padding: 15,
          }}>
          <View
            style={{
              height: 5,
              width: 36,
              alignSelf: 'center',
              borderRadius: 5,
              backgroundColor: this.props.theme.gray2,
            }}
          />
          <View style={{flex: 1, flexDirection: 'column'}}>
            <View
              style={{
                height: 80,
                borderColor: 'blue',
                borderWidth: 0,
                flexDirection: 'row',
                marginVertical: 25,
              }}>
              {/* <Icon
                  style={{
                    width: 50,
                    alignSelf: 'center',
                    height: 50,
                    padding: 12,
                    color: '#aaa',
                  }}
                  name={this.state.icon}
                  size={26}
                /> */}
              <Image
                style={{
                  aspectRatio: 1,
                  height: 80 * 0.8,
                  alignSelf: 'center',
                  borderRadius: 80 / 2,
                  backgroundColor: this.props.theme.fill,
                }}
                source={{uri: this.props.user.photoURL}}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  marginHorizontal: 20,
                }}>
                {this.props.user.displayName ? (
                  <Text
                    style={{
                      textAlign: 'left',
                      justifyContent: 'center',
                      fontSize: 22,
                      fontWeight: '700',
                      color: this.props.theme.label,
                    }}>
                    {this.props.user.displayName}
                  </Text>
                ) : null}
                <Text
                  style={{
                    textAlign: 'left',
                    color: this.props.theme.label2,
                  }}>
                  {this.props.user.emailVerified
                    ? this.props.user.email
                    : 'No e-mail linked.'}
                </Text>
              </View>
              <Icon
                onPress={() => auth().signOut()}
                style={{
                  width: 50,
                  alignSelf: 'center',
                  height: 50,
                  padding: 12,
                  color: this.props.theme.red,
                }}
                name="log-out"
                size={26}
              />
            </View>
            <View
              style={{
                height: 43,
                borderColor: 'blue',
                borderWidth: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 17, color: this.props.theme.label}}>
                Dark Mode
              </Text>
              <Switch
                onValueChange={this.toggleDarkMode}
                value={this.state.darkModeSwitch}
              />
            </View>
            {/* <View
              style={{
                height: 43,
                borderColor: 'blue',
                borderWidth: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 17, color: this.props.theme.label}}>
                Fuck Mode
              </Text>
              <Switch />
            </View> */}
          </View>
          {/* <FlatList
          style={{
            backgroundColor: '',
            flex: 1,
          }}
          bounces="false"
          data={this.state.data}
          renderItem={({item}) => {
            return (
              
            );
          }}
        /> */}
        </View>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);

// <View
//           style={{
//             backgroundColor: 'black',
//             height: 20,
//             justifyContent: 'flex-start',
//             flexDirection: 'row',
//           }}></View>
