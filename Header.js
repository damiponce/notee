import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled, {ThemeProvider} from 'styled-components';
import {View, StatusBar} from 'react-native';

const mapStateToProps = (state) => ({
  theme: state.themeReducer.theme,
});

class Header extends Component {
  render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <View
          style={{
            height: this.props.height,
            borderBottomWidth: 0.5,
            borderColor: this.props.theme.separator,
            backgroundColor: this.props.theme.background,
          }}>
          <View
            style={{
              marginTop: StatusBar.currentHeight,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {this.props.children}
          </View>
        </View>
      </ThemeProvider>
    );
  }
}

export default connect(mapStateToProps)(Header);
