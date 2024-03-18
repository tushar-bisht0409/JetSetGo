import React from 'react';
import { Dimensions } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import { Theme } from './src/utils/theme';
import ResultScreen from './src/screens/ResultScreen';
import configureStore from './src/store/configureStore';
import { Provider } from 'react-redux';

const Stack = createStackNavigator();
export const { width, height } = Dimensions.get('window');
const store = configureStore();

function App(): React.JSX.Element {

  return (
    <Provider store={store}>
      <NavigationContainer theme={Theme}>
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ResultScreen" component={ResultScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
