import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Socket } from 'socket.io-client';
import { useAppSelector } from '../core/redux/hooks';
import { selectName } from '../core/redux/slices/userSlice';
import { Chat, Message } from '../core/types';
import FlatListComponent from '../shared/FlatListComponent';
import InputComponent from '../shared/InputComponent';

type RootStackParamList = {
  MainScreen: undefined;
  ChatScreen: { chat: Chat; socket: Socket };
};

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'ChatScreen'>;

export interface ChatScreenProps {
  route: ChatScreenRouteProp;
}

function ChatScreen({ route }: ChatScreenProps) {
  const { chat, socket } = route.params;

  
  const name = useAppSelector(selectName);
  const [messages, setMessages] = useState<Message[]>(chat.messages);
  const [text, setText] = useState('');

  const flatListRef = useRef<FlatList | null>(null);

  useEffect(() => {
    if (chat && chat.messages.length) setMessages(chat.messages);
  }, [chat]);

  const changeTextHandler = (newText: string) => {
    setText(newText);
  };

  const sendMessage = () => {
    if (text.trim().length) {
      let messageData = {
        text,
        name,
        chatId: chat._id
      };
      socket.emit('message', messageData);
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
        renderItem={({ item }) => <FlatListComponent item={item} />}
      />
      <InputComponent
        changeTextHandler={changeTextHandler}
        value={text}
        sendMessage={sendMessage}
      />
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
