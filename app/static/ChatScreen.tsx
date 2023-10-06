import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../core/redux/hooks';
import {
  selectDeleteMessageModal,
  selectEditMessageModal,
  selectSelectedMessage,
  setIsShowEditMessage,
  setSelectedMessage,
} from '../core/redux/slices/messageSlice';
import { selectName } from '../core/redux/slices/userSlice';
import { getSocket } from '../core/services/socketApi';
import { Chat, Message } from '../core/types';
import DeleteConfirm from '../shared/DeleteConfirm';
import InputComponent from '../shared/InputComponent';
import MessageItem from '../shared/MessageItem';
import Modal from '../shared/Modal';

type RootStackParamList = {
  MainScreen: undefined;
  ChatScreen: { chat: Chat};
};

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'ChatScreen'>;

export interface ChatScreenProps {
  route: ChatScreenRouteProp;
}

function ChatScreen({ route }: ChatScreenProps) {
  const dispatch = useAppDispatch();
  const { chat } = route.params;
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

  useEffect(() => {
    if (selectedMessage) setText(selectedMessage.text);
  }, [editMessageModal]);

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
      getSocket()?.emit('message', messageData);
      setText('');
    }
  };

  const updateMessage = () => {
    if (text.trim().length) {
      let messageData = {
        message: selectedMessage,
        text,
      };
      getSocket()?.emit('updateMessage', messageData);
      dispatch(setSelectedMessage(null));
      dispatch(setIsShowEditMessage(false));
      setText('');
    }
  };

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
