import React, {Component} from 'react';
import {View, StatusBar, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import Main from './src/Main';
import store from './src/redux';
import SplashScreen from 'react-native-splash-screen';

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <View style={styles.flex}>
        <StatusBar barStyle="dark-content" backgroundColor="#E8E8E8" />
        <Provider store={store}>
          <Main />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
