import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Chat } from '../core/types';

type ChatItemProps = {
  chat: Chat;
};

export default function ChatItem({ chat }: ChatItemProps) {
  
  return (
    <View
      style={[
        {
          display: 'flex',
          alignItems: 'flex-start',
          width: '100%',
          gap: 15,
        },
      ]}
    >
      <View style={[styles.listItemContainer, { flexDirection: 'column' }]}>
        <Text style={styles.author}>Created by {chat.author.name}</Text>
        <Text style={styles.listItem}>{chat.name}</Text>
        <Text style={styles.date}>{chat.createdAt.slice(0,10)}{" "}{chat.createdAt.slice(11,19)}</Text>
      </View>
      <View style={styles.marginBottom} />
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    width: 'auto',
    maxWidth: '80%',
    padding: 20,
    borderRadius: 5,
    fontSize: 14,
  },
  date: {
    opacity: 0.6,
    fontSize: 10,
  },
  author: {
    //opacity: 0.6,
    fontSize: 10,
  },
  marginBottom: {
    height: 5,
    backgroundColor: 'transparent',
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
