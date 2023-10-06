import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationScreenProp } from 'react-navigation';
import { useAppDispatch, useAppSelector } from '../core/redux/hooks';
import {
  selectChatList,
  selectFilteredChatList,
  selectIsShowModalDelete,
  selectSelectedChat,
  setIsShowModalDelete,
  setSelectedChat,
} from '../core/redux/slices/chatSlice';
import { selectName } from '../core/redux/slices/userSlice';
import { connectSocket } from '../core/services/socketApi';
import { Chat } from '../core/types';
import ChatItem from '../shared/ChatItem';
import CreatedChat from '../shared/CreatedChat';
import Modal from '../shared/Modal';

interface MainScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

export default function MainScreen({ navigation }: MainScreenProps) {
  const dispatch = useAppDispatch();
  const name = useAppSelector(selectName);
  const chatList = useAppSelector(selectChatList);
  const selectedChat = useAppSelector(selectSelectedChat);
  const isShowModal = useAppSelector(selectIsShowModalDelete);
  const [visible, setVisible] = useState<boolean>(false);
  const filteredChatList = useAppSelector(selectFilteredChatList);
  useEffect(() => {
    if (name) connectSocket(name, dispatch);
  }, [name]);

  useEffect(() => {
    dispatch(
      setSelectedChat(
        chatList.find((chat) => chat._id === selectedChat?._id) || null
      )
    );
  }, [chatList]);

  useEffect(() => {
    if (selectedChat && !isShowModal) {
      navigation.navigate('Chat', { chat: selectedChat });
    }
  }, [selectedChat]);

  const selectChat = (chat: Chat) => {
    dispatch(setSelectedChat(chat));
  };

  if (!name) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#295061',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 24, textAlign: 'center' }}>
          Please login to see chat list
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#295061', paddingTop: 20 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 15,
        }}
      >
        <FlatList
          data={filteredChatList}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => selectChat(item)}
              onLongPress={() => {
                if (item.author.name === name) {
                  dispatch(setIsShowModalDelete(true));
                  selectChat(item);
                } else {
                  Alert.alert('You can only delete your chat!');
                }
              }}
            >
              <ChatItem chat={item} selectedChat={selectedChat} />
            </Pressable>
          )}
          keyExtractor={(item) => item._id}
        />
        {visible ? (
          <Modal>
            <CreatedChat setVisible={setVisible} />
          </Modal>
        ) : (
          <Pressable onPress={() => setVisible(true)} style={styles.container}>
            <View style={styles.buttonAdd}>
              <Icon name="plus" color={'black'} size={26} />
            </View>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 15,
    right: 20,
    width: 46,
  },
  buttonAdd: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    backgroundColor: '#f5fcff',
    padding: 10,
    borderRadius: 50,
  },
});
