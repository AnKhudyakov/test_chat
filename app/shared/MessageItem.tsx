import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Message } from '../core/types';
import { useAppSelector } from '../core/redux/hooks';
import {
  selectName,
} from '../core/redux/slices/userSlice';
import { selectSelectedMessage } from '../core/redux/slices/messageSlice';

interface FlatListComponentProps {
  item: Message;
}

function MessageItem({ item }: FlatListComponentProps) {
  const name = useAppSelector(selectName);
  const selectedMessage = useAppSelector(selectSelectedMessage);
  return (
    <View
      style={[
        {
          display: 'flex',
          alignItems: item.user.name === name ? 'flex-end' : 'flex-start',
        },
      ]}
    >
      <View
        style={[
          styles.listItemContainer,
          { opacity: selectedMessage?._id === item._id ? 0.5 : 1 },
        ]}
      >
        <Image
          style={styles.imageStyles}
          source={{ uri: 'https://placebeard.it/140x140' }}
        />
        <View style={{ flexDirection: 'column', gap: 10, maxWidth: '70%' }}>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            <Text style={styles.name}>{item.user.name}</Text>
            <Text style={styles.date}>
              {item.createdAt.toString().slice(0, 10)}{' '}
              {item.createdAt.toString().slice(11, 19)}
            </Text>
          </View>
          <Text style={styles.listItem}>{item.text}</Text>
        </View>
      </View>
      <View style={styles.marginBottom} />
    </View>
  );
}

export default MessageItem;

const styles = StyleSheet.create({
  listItem: {
    width: 'auto',
    maxWidth: '100%',
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 14,
  },
  marginBottom: {
    height: 5,
    backgroundColor: 'transparent',
  },
  date: {
    fontSize: 12,
    opacity: 0.5,
  },
  name: {
    whiteSpace: 'normal',
    fontWeight: 'bold',
    fontSize: 12,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 1,
    maxWidth: '100%',
  },
  imageStyles: {
    width: 50,
    height: 50,
    borderRadius: 35,
    marginLeft: 10,
    marginRight: 10,
  },
});
