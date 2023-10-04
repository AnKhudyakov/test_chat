import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from './app/static/ChatScreen';
import MainScreen from './app/static/MainScreen';
import LoginScreen from './app/static/LoginScreen';
import { Provider } from 'react-redux';
import { store } from './app/core/redux/store';

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();

const MainStackScreen = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="MainScreen" component={MainScreen} options={{headerShown: false,}} />
    <MainStack.Screen name="ChatScreen" component={ChatScreen as React.FunctionComponent<{}>} />
  </MainStack.Navigator>
);

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Login">
        <Tab.Screen
          name="MainScreen"
          component={MainStackScreen}
          options={{
            headerShown: false,
            tabBarLabelStyle: {
              marginBottom: 5,
            },
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            tabBarLabelStyle: {
              marginBottom: 5,
            },
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color, size }) => (
              <Icon name="sign-in" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  icon: {
    padding: 10,
  },
});
