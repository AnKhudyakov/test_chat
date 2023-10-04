import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Message } from '../core/types';

interface FlatListComponentProps {
  item: Message;
}

function FlatListComponent({ item }: FlatListComponentProps) {

  return (
    <View
      style={[
        {
          display: 'flex',
          alignItems: item.user._id === "" ? 'flex-end' : 'flex-start',
        },
      ]}
    >
      <View style={styles.listItemContainer}>
        <Image style={styles.imageStyles} source={{ uri: item.user.avatar }} />
        <View style={{ flexDirection: 'column', gap: 10 }}>
          <Text style={styles.date}>
            {' '}
            {item.createdAt.toString().slice(0, 24)}
          </Text>
          <Text style={styles.listItem}>{item.text}</Text>
        </View>
      </View>
      <View style={styles.marginBottom} />
    </View>
  );
}

export default FlatListComponent;

const styles = StyleSheet.create({
  listItem: {
    width: 'auto',
    maxWidth: '80%',
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 14,
  },
  marginBottom: {
    height: 5,
    backgroundColor: 'transparent',
  },
  date: {
    whiteSpace: 'normal',
    fontWeight: 'bold',
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 1,
  },
  imageStyles: {
    width: 50,
    height: 50,
    borderRadius: 35,
    marginLeft: 10,
    marginRight: 10,
  },
});
