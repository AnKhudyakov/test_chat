import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppSelector } from '../core/redux/hooks';

import { selectIsShowModalDelete } from '../core/redux/slices/chatSlice';
import { Chat } from '../core/types';
import DeleteConfirm from './DeleteConfirm';

type ChatItemProps = {
  chat: Chat;
  selectedChat: Chat | null;
};

export default function ChatItem({ chat, selectedChat }: ChatItemProps) {
  const isShowModal = useAppSelector(selectIsShowModalDelete);

  if (isShowModal && selectedChat?._id === chat._id) {
    return (
      <View style={styles.modal}>
        <DeleteConfirm id={chat._id} variant="chat" />
      </View>
    );
  }

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
        marginTop: 15,
      }}
    >
      <View style={[styles.listItemContainer, { flexDirection: 'column' }]}>
        <Text style={styles.author}>Created by {chat.author.name}</Text>
        <Text style={styles.listItem}>{chat.name}</Text>
        <Text style={styles.date}>
          {chat.createdAt.slice(0, 10)} {chat.createdAt.slice(11, 19)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    minHeight: 80,
    backgroundColor: '#cccccc',
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 15,
    borderRadius: 10,
  },
  listItem: {
    width: 'auto',
    maxWidth: '80%',
    padding: 10,
    borderRadius: 5,
    fontSize: 14,
  },
  date: {
    opacity: 0.6,
    fontSize: 10,
  },
  author: {
    fontSize: 10,
  },
  listItemContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    backgroundColor: '#F5FCFF',
    elevation: 1,
  },
  imageStyles: {
    width: 35,
    height: 35,
    borderRadius: 35,
    marginLeft: 10,
    marginRight: 10,
  },
});
