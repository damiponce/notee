import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Feather';
import Header from '../Header';
import SettingsModal from './SettingsModal';

import BottomSheet from 'reanimated-bottom-sheet';
// import Animated from 'react-native-reanimated';

import {connect} from 'react-redux';
import {ThemeProvider} from 'styled-components';
const mapStateToProps = (state) => ({theme: state.themeReducer.theme});

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      data: null,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh() {
    this.setState({isFetching: true}, () => {
      this.getNotes();
    });
  }

  getNotes = () => {
    database()
      .ref(`/users/${this.props.route.params.user.uid}/notes`)
      .on('value', (snapshot) => {
        var returnArray = [];
        snapshot.forEach((child) => {
          returnArray.push({
            key: child.key,
            title: child.val().title,
            textPreview: child.val().textData.substring(0, 100),
            starred: child.val().starred,
          });
        });
        this.setState({data: returnArray});
        this.setState({isFetching: false});
      });
  };

  starNote = (unid, starred) => {
    starred
      ? database()
          .ref(`/users/${this.props.route.params.user.uid}/notes/${unid}`)
          .update({starred: false})
      : database()
          .ref(`/users/${this.props.route.params.user.uid}/notes/${unid}`)
          .update({starred: true});
  };

  separator = () => {
    return (
      <ThemeProvider theme={this.props.theme}>
        <View
          style={{height: 1, backgroundColor: this.props.theme.separator}}
        />
      </ThemeProvider>
    );
  };

  empty = () => {
    return (
      <ThemeProvider theme={this.props.theme}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={{
              fontSize: 16,
              color: this.props.theme.label3,
              alignSelf: 'center',
            }}>
            Your notebook is empty!
          </Text>
        </View>
      </ThemeProvider>
    );
  };

  renderSettings = () => {
    return (
      <ThemeProvider theme={this.props.theme}>
        <SettingsModal user={this.props.route.params.user} />
      </ThemeProvider>
    );
  };

  //   fall = new Animated.Value(1);

  //   color: this.props.theme.background,
  //   opacity: Animated.add(0.1, Animated.multiply(this.fall, 0.9)),

  render() {
    const sheetRef = React.createRef(null);
    return (
      <ThemeProvider theme={this.props.theme}>
        <BottomSheet
          ref={sheetRef}
          initialSnap={1}
          snapPoints={[450, 0]}
          borderRadius={14}
          callbackNode={this.fall}
          renderContent={this.renderSettings}
        />
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: this.props.theme.background,
          }}>
          <StatusBar
            translucent
            backgroundColor={this.props.theme.background}
            barStyle={this.props.theme.statusbar}
          />
          <Header height={StatusBar.currentHeight + 44}>
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
            <Text
              style={{
                color: this.props.theme.blue,
                fontSize: 20,
                fontWeight: '500',
              }}>
              notee
            </Text>
            <Pressable onPress={() => createNote(this.props.route.params.user)}>
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
          </Header>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <FlatList
              style={{flex: 1}}
              contentContainerStyle={{
                flexGrow: 1,
                backgroundColor: this.props.theme.background3,
              }}
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
              ListEmptyComponent={this.empty}
              data={this.state.data}
              ItemSeparatorComponent={this.separator}
              renderItem={({item}) => {
                return (
                  <Pressable
                    onPress={() =>
                      this.props.navigation.navigate('Note Edit', {
                        unid: item.key,
                        navigation: this.props.navigation,
                      })
                    }
                    style={{
                      backgroundColor: this.props.theme.background2,
                      height: 80,
                      flex: 1,
                      justifyContent: 'space-between',
                      padding: 12,
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 22,
                          fontWeight: '600',
                          color: this.props.theme.label,
                        }}>
                        {item.title === '' ? '' : item.title}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 17,
                          color: this.props.theme.label2,
                        }}>
                        {item.textPreview}
                      </Text>
                    </View>
                    {item.starred ? (
                      <Icon
                        onPress={() => this.starNote(item.key, item.starred)}
                        style={{
                          width: 50,
                          alignSelf: 'center',
                          height: 50,
                          padding: 14,
                          color: this.props.theme.yellow,
                        }}
                        name="star"
                        size={22}
                      />
                    ) : (
                      <Icon
                        onPress={() => this.starNote(item.key, item.starred)}
                        style={{
                          width: 50,
                          alignSelf: 'center',
                          height: 50,
                          padding: 14,
                          color: this.props.theme.gray5,
                        }}
                        name="star"
                        size={22}
                      />
                    )}
                  </Pressable>
                );
              }}
            />
          </View>
        </SafeAreaView>
      </ThemeProvider>
    );
  }
}

function createNote(user) {
  let unid = uuidv4();
  database().ref(`/users/${user.uid}/notes/${unid}`).set({
    key: unid,
    createdDateTime: '',
    updatedDateTime: '',
    title: 'Untitled note',
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

export default connect(mapStateToProps)(MainScreen);
