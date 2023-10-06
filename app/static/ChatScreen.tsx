import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Socket } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../core/redux/hooks';
import { selectName } from '../core/redux/slices/userSlice';
import { Chat, Message } from '../core/types';
import MessageItem from '../shared/MessageItem';
import InputComponent from '../shared/InputComponent';
import {
  selectDeleteMessageModal,
  selectEditMessageModal,
  selectSelectedMessage,
  setIsShowEditMessage,
  setSelectedMessage,
} from '../core/redux/slices/messageSlice';
import Modal from '../shared/Modal';
import DeleteConfirm from '../shared/DeleteConfirm';

type RootStackParamList = {
  MainScreen: undefined;
  ChatScreen: { chat: Chat; socket: Socket };
};

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'ChatScreen'>;

export interface ChatScreenProps {
  route: ChatScreenRouteProp;
}

function ChatScreen({ route }: ChatScreenProps) {
  const dispatch = useAppDispatch();
  const { chat, socket } = route.params;
  const selectedMessage = useAppSelector(selectSelectedMessage);
  const editMessageModal = useAppSelector(selectEditMessageModal);
  const name = useAppSelector(selectName);
  const deleteMessageModal = useAppSelector(selectDeleteMessageModal);
  const [messages, setMessages] = useState<Message[]>(chat.messages);
  const [text, setText] = useState('');

  const flatListRef = useRef<FlatList | null>(null);

  useEffect(() => {
    if (chat) setMessages(chat.messages);
  }, [chat]);

  const changeTextHandler = (newText: string) => {
    setText(newText);
  };

  const sendMessage = () => {
    if (text.trim().length) {
      let messageData = {
        text,
        name,
        chatId: chat._id,
      };
      socket.emit('message', messageData);
      setText('');
    }
  };

  const updateMessage = () => {
    if (text.trim().length) {
      let messageData = {
        message: selectedMessage,
        text,
      };
      socket.emit('updateMessage', messageData);
      dispatch(setSelectedMessage(null));
      dispatch(setIsShowEditMessage(false));
      setText('');
    }
  };

  useEffect(() => {
    if (selectedMessage) setText(selectedMessage.text);
  }, [editMessageModal]);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={messages}
        keyExtractor={(item) => item._id}
        ref={flatListRef}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) => (
          <Pressable
            onLongPress={() => {
              dispatch(setSelectedMessage(item));
              dispatch(setIsShowEditMessage(true));
            }}
          >
            <MessageItem item={item} />
          </Pressable>
        )}
      />
      <InputComponent
        changeTextHandler={changeTextHandler}
        value={text}
        sendMessage={editMessageModal ? updateMessage : sendMessage}
      />
      {deleteMessageModal && (
        <Modal>
          <DeleteConfirm id={selectedMessage?._id} variant="message" />
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#295061',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 10,
  },
  list: {
    width: '100%',
  },
});

export default ChatScreen;
