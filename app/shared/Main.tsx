import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../core/redux/hooks';
import { selectName, setIsShowModalExit } from '../core/redux/slices/userSlice';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  selectChatList,
  selectIsShowSearch,
  setFilteredChatList,
  setIsShowSearch,
  setSelectedChat,
} from '../core/redux/slices/chatSlice';
import {
  selectIsShowEditMessage,
  selectSelectedMessage,
  setDeleteMessageModal,
  setEditMessageModal,
  setIsShowEditMessage,
  setSelectedMessage,
} from '../core/redux/slices/messageSlice';
import ChatScreen from '../static/ChatScreen';
import LoginScreen from '../static/LoginScreen';
import MainScreen from '../static/MainScreen';

const Tab = createBottomTabNavigator();
const MainStack = createStackNavigator();

const MainStackScreen = () => {
  const dispatch = useAppDispatch();
  const isShowSearch = useAppSelector(selectIsShowSearch);
  const chatList = useAppSelector(selectChatList);
  const selectedMessage = useAppSelector(selectSelectedMessage);
  const isShowEditMessage = useAppSelector(selectIsShowEditMessage);

  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    if (search) {
      const filteredChat = chatList.filter((chat) =>
        chat.name.toLowerCase().includes(search.toLowerCase())
      );
      dispatch(setFilteredChatList(filteredChat));
    } else {
      dispatch(setFilteredChatList(chatList));
    }
  }, [search, chatList]);

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Main"
        component={MainScreen}
        options={{
          title: '',
          headerLeft: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
              }}
            >
              {isShowSearch && (
                <Pressable
                  onPress={() => {
                    dispatch(setIsShowSearch(false));
                  }}
                >
                  <Icon name="angle-left" color={'black'} size={40} />
                </Pressable>
              )}
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: 20,
              }}
            >
              {isShowSearch ? (
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setSearch(text)}
                  value={search}
                  placeholder="Search chat..."
                  underlineColorAndroid="transparent"
                ></TextInput>
              ) : (
                <Pressable
                  onPress={() => {
                    dispatch(setIsShowSearch(true));
                  }}
                >
                  <Icon name="search" color={'black'} size={26} />
                </Pressable>
              )}
            </View>
          ),
        }}
      />
      <MainStack.Screen
        name="Chat"
        component={ChatScreen as React.FunctionComponent<{}>}
        options={({ navigation }) => ({
          headerLeft: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
              }}
            >
              {isShowEditMessage ? (
                <Pressable
                  onPress={() => {
                    dispatch(setIsShowEditMessage(false));
                    dispatch(setSelectedMessage(null));
                  }}
                >
                  <Icon name="remove" color={'black'} size={26} />
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => {
                    dispatch(setSelectedChat(null));
                    navigation.goBack();
                  }}
                >
                  <Icon name="angle-left" color={'black'} size={40} />
                </Pressable>
              )}
            </View>
          ),
          headerRight: () => (
            <View>
              {isShowEditMessage && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingRight: 20,
                    gap: 20,
                  }}
                >
                  <Pressable
                    onPress={() => {
                      dispatch(setEditMessageModal(true));
                    }}
                  >
                    <Icon name="edit" color={'black'} size={26} />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      dispatch(setDeleteMessageModal(true));
                    }}
                  >
                    <Icon name="trash" color={'black'} size={26} />
                  </Pressable>
                </View>
              )}
            </View>
          ),
        })}
      />
    </MainStack.Navigator>
  );
};

const Main = () => {
  const dispatch = useDispatch();
  const name = useAppSelector(selectName);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Login">
          <Tab.Screen
            name="MainScreen"
            component={MainStackScreen}
            listeners={({ navigation }) => ({
              tabPress: (e) => {
                e.preventDefault();
                dispatch(setSelectedChat(null));
                navigation.navigate('MainScreen');
              },
            })}
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
                if (name) dispatch(setIsShowModalExit(true));
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
    </GestureHandlerRootView>
  );
};

export default Main;

const styles = StyleSheet.create({
  icon: {
    padding: 10,
  },
  textInput: {
    height: 40,
    padding: 10,
    borderBottomWidth: 1,
    minWidth: 250,
  },
});
