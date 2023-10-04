import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Chat, Message } from '../core/types';
import FlatListComponent from '../shared/FlatListComponent';
import InputComponent from '../shared/InputComponent';
import { useAppSelector } from '../core/redux/hooks';
import { selectName } from '../core/redux/slices/userSlice';

type RootStackParamList = {
  MainScreen: undefined;
  ChatScreen: { chat: Chat };
};

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'ChatScreen'>;

export interface ChatScreenProps {
  route: ChatScreenRouteProp;
}

function ChatScreen({ route }: ChatScreenProps) {
  const { chat } = route.params;
  const name = useAppSelector(selectName);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [text, setText] = useState('');

  const flatListRef = useRef<FlatList | null>(null);

  useEffect(() => {
    if (chat && chat.messages.length) setMessages(chat.messages);
  }, [chat]);

  const onReceivedMessage = (newMessages: Message[]) => {
    setMessages(newMessages);
  };

  const changeTextHandler = (newText: string) => {
    setText(newText);
  };

  const sendMessage = () => {
    const notEmpty = text.trim().length > 0;
    if (notEmpty) {
      let messageModel = {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: {
          _id: '',
          name,
          avatar: 'https://placebeard.it/140x140',
        },
      };
   //   socket.emit('message', messageModel);
      setMessages([...messages, messageModel]);
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={messages}
        keyExtractor={(item) => item._id.toString()}
        ref={flatListRef}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) => <FlatListComponent item={item} />}
      />
      <InputComponent
        changeTextHandler={changeTextHandler}
        onSubmitEditing={() => sendMessage()}
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