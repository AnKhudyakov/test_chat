import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Socket } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../core/redux/hooks';
import { selectChatList, selectIsShowModalExit, selectName } from '../core/redux/slices/userSlice';
import { connectSocket, getSocket } from '../core/services/socketApi';
import { Chat } from '../core/types';
import ChatItem from '../shared/ChatItem';
import Modal from '../shared/Modal';
import CreatedChat from '../shared/CreatedChat';
import ExitConfirm from '../shared/ExitConfirm';

interface MainScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

export default function MainScreen({ navigation }: MainScreenProps) {
  const name = useAppSelector(selectName);
  const dispatch = useAppDispatch();
  // const isShowModalExit = useAppSelector(selectIsShowModalExit);
  const chatList = useAppSelector(selectChatList);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  useEffect(() => {
    connectSocket(name, dispatch);
    setSocket(getSocket())
  }, []);

  useEffect(() => {
    setSelectedChat(
      chatList.find((chat) => chat._id === selectedChat?._id) || null
    );
  }, [chatList]);

  useEffect(() => {
    if (selectedChat) {
      navigation.navigate('ChatScreen', { chat: selectedChat, socket });
    }
  }, [selectedChat]);

  const selectChat = (chat: Chat) => {
    setSelectedChat(chat);
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
          data={chatList}
          renderItem={({ item }) => (
            <Pressable onPress={() => selectChat(item)}>
              <ChatItem chat={item} />
            </Pressable>
          )}
          keyExtractor={(item) => item._id}
        />
        {visible ? (
          <Modal>
            <CreatedChat setVisible={setVisible} socket={socket} />
          </Modal>
        ) : (
          <Pressable
            onPress={() => setVisible(true)}
            style={{ position: 'absolute', bottom: 15, right: 20, width: 50 }}
          >
            <View style={styles.buttonAdd}>
              <Text
                style={{ color: 'white', fontSize: 24, textAlign: 'center' }}
              >
                +
              </Text>
            </View>
          </Pressable>
        )}
      </View>
       {/* {isShowModalExit && <Modal>
        <ExitConfirm/>
        </Modal>} */}
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyles: {
    width: 200,
    height: 200,
    borderRadius: 35,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonAbout: {
    alignSelf: 'flex-end',
    width: '20%',
    backgroundColor: '#61dbfc',
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonAdd: {
    width: '100%',
    backgroundColor: '#38758f',
    padding: 10,
    borderRadius: 50,
  },
});
