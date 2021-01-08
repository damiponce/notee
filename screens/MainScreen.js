import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StatusBar,
  FlatList,
} from 'react-native';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Feather';

export class MainScreen extends Component {
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
    return <View style={{height: 1, backgroundColor: '#e0e0e0'}} />;
  };

  empty = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text
          style={{
            fontSize: 16,
            color: '#bbb',
            alignSelf: 'center',
          }}>
          Your notebook is empty!
        </Text>
      </View>
    );
  };

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
          <FlatList
            style={{flex: 1}}
            contentContainerStyle={{flexGrow: 1}}
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
                    backgroundColor: '#fafafa',
                    height: 80,
                    flex: 1,
                    justifyContent: 'space-between',
                    padding: 12,
                    flexDirection: 'row',
                  }}>
                  <View style={{flexDirection: 'column'}}>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 22,
                        fontWeight: '600',
                        color: '#000',
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 17,
                        color: '#555',
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
                        color: '#dd0',
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
                        color: '#ddd',
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
    );
  }
}

export default MainScreen;
