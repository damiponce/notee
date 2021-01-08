import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import auth from '@react-native-firebase/auth';

export class SettingsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      navigation: this.props.route.params.navigation,
      data: [{key: 0, height: 80, icon: 'log-out'}],
    };
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '',
          justifyContent: 'flex-start',
          padding: 15,
        }}>
        <View
          style={{
            height: 5,
            width: 36,
            alignSelf: 'center',
            borderRadius: 5,
            backgroundColor: '#999',
            marginBottom: 25,
          }}
        />
        <View style={{flex: 1}}>
          <View
            style={{
              height: 80,
              borderColor: 'blue',
              borderWidth: 0,
              flexDirection: 'row',
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
              }}
              source={{uri: this.props.route.params.user.photoURL}}
            />
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                marginHorizontal: 20,
              }}>
              {this.props.route.params.user.displayName ? (
                <Text
                  style={{
                    textAlign: 'left',
                    justifyContent: 'center',
                    fontSize: 22,
                    fontWeight: '700',
                  }}>
                  {this.props.route.params.user.displayName}
                </Text>
              ) : null}
              <Text
                style={{
                  textAlign: 'left',
                  color: '#555',
                }}>
                {this.props.route.params.user.emailVerified
                  ? this.props.route.params.user.email
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
                color: '#f33',
              }}
              name="log-out"
              size={26}
            />
          </View>
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
    );
  }
}

// <View
//           style={{
//             backgroundColor: 'black',
//             height: 20,
//             justifyContent: 'flex-start',
//             flexDirection: 'row',
//           }}></View>
