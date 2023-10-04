import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Socket, io } from 'socket.io-client';
import { Chat } from '../core/types';
import ChatItem from '../shared/ChatItem';
import { useAppSelector, useAppDispatch } from '../core/redux/hooks';
import {
  selectChatList,
  selectName,
  setChatsList,
} from '../core/redux/slices/userSlice';
import Modal from '../shared/Modal';
import { connectSocket } from '../core/services/socketApi';

interface MainScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

export default function MainScreen({ navigation }: MainScreenProps) {
  const name = useAppSelector(selectName);
  const dispatch = useAppDispatch();
  const chatList = useAppSelector(selectChatList);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    connectSocket(setSocket, name,dispatch );
  }, []);

  const selectChat = (chat: Chat) => {
    navigation.navigate('ChatScreen', { chat });
  };

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
          <Modal setVisible={setVisible} socket={socket} />
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
