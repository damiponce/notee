import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {Appearance} from 'react-native';
import {LoginScreen} from './screens/LoginScreen';
import Navigation from './Navigation';
import auth from '@react-native-firebase/auth';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import themeReducer from './redux/themeReducer';
import {setCustomText} from 'react-native-global-props';
import {switchTheme} from './redux/actions';
import {lightTheme, darkTheme} from './styles/theme';

function App() {
  const store = createStore(
    combineReducers({themeReducer}),
    applyMiddleware(thunk),
  );

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

  const customTextProps = {
    style: {
      fontSize: 16,
    },
  };
  setCustomText(customTextProps);

  return (
    <Provider store={store}>
      <Navigation user={user} />
    </Provider>
  );
}

export default App;
