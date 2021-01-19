import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StatusBar,
  TextInput,
} from 'react-native';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Feather';

import {connect} from 'react-redux';
import {ThemeProvider} from 'styled-components';
const mapStateToProps = (state) => ({theme: state.themeReducer.theme});

class NoteEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      data: null,
      unid: this.props.route.params.unid,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }

  onRefresh() {
    this.setState({isFetching: true}, () => {
      this.getData();
    });
  }

  getData = () => {
    database()
      .ref(
        `/users/${this.props.route.params.user.uid}/notes/${this.state.unid}`,
      )
      .once('value')
      .then((snapshot) => {
        let title = snapshot.child('title').val();
        this.setState({title: title});

        let textData = snapshot.child('textData').val();
        this.setState({textData: textData});

        let createdDateTime = snapshot.child('createdDateTime').val();
        this.setState({createdDateTime: createdDateTime});

        let updatedDateTime = snapshot.child('updatedDateTime').val();
        this.setState({updatedDateTime: updatedDateTime});
      });

    this.setState({isFetching: false});
  };

  deleteNote() {
    database()
      .ref(
        `/users/${this.props.route.params.user.uid}/notes/${this.state.unid}`,
      )
      .remove();
    this.props.navigation.goBack();
  }

  updateData = () => {
    this.state.title == ''
      ? database()
          .ref(
            `/users/${this.props.route.params.user.uid}/notes/${this.state.unid}`,
          )
          .update({title: 'Untitled note', textData: this.state.textData})
      : database()
          .ref(
            `/users/${this.props.route.params.user.uid}/notes/${this.state.unid}`,
          )
          .update({title: this.state.title, textData: this.state.textData});
  };

  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <View
          style={{
            flex: 1,
            backgroundColor: this.props.theme.background2,
            justifyContent: 'flex-start',
            padding: 15,
          }}>
          <View
            style={{
              height: 5,
              width: 36,
              alignSelf: 'center',
              borderRadius: 5,
              backgroundColor: this.props.theme.fill,
            }}
          />
          <View
            style={{
              height: 50,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <TextInput
              style={{
                flex: 1,
                backgroundColor: '#00000000',
                fontSize: 26,
                fontWeight: '600',
                color: this.props.theme.label,
              }}
              onChangeText={(title) => this.setState({title})}
              onEndEditing={() => this.updateData()}
              value={String(this.state.title)}
              placeholder="Untitled note"
              placeholderTextColor={this.props.theme.placeholder}
            />
            <Icon
              onPress={() => this.deleteNote()}
              style={{
                width: 50,
                alignSelf: 'center',
                height: 50,
                padding: 12,
                color: this.props.theme.red,
              }}
              name="trash-2"
              size={26}
            />
          </View>

          <TextInput
            style={{
              flex: 1,
              backgroundColor: '#00000000',
              fontSize: 17,
              color: this.props.theme.label,
              textAlignVertical: 'top',
            }}
            multiline={true}
            onChangeText={(textData) => this.setState({textData})}
            onEndEditing={() => this.updateData()}
            value={String(this.state.textData)}
            placeholder="Type here"
            placeholderTextColor={this.props.theme.placeholder}
          />
        </View>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps)(NoteEditModal);
