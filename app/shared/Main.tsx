import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../core/redux/hooks';
import { selectName, setIsShowModalExit } from '../core/redux/slices/userSlice';
import ChatScreen from '../static/ChatScreen';
import LoginScreen from '../static/LoginScreen';
import MainScreen from '../static/MainScreen';

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();

const MainStackScreen = () => (
  <MainStack.Navigator>
    <MainStack.Screen
      name="MainScreen"
      component={MainScreen}
      options={{ headerShown: false }}
    />
    <MainStack.Screen
      name="ChatScreen"
      component={ChatScreen as React.FunctionComponent<{}>}
    />
  </MainStack.Navigator>
);

const Main = () => {
  const dispatch = useDispatch();
  const name = useAppSelector(selectName);
  return (
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
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              if(name)
              dispatch(setIsShowModalExit(true));
              navigation.navigate('Login');
            },
          })}
          options={{
            headerShown: false,
            tabBarLabelStyle: {
              marginBottom: 5,
            },
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color, size }) => (
              <Icon
                name={name ? 'sign-out' : 'sign-in'}
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({
  icon: {
    padding: 10,
  },
});
