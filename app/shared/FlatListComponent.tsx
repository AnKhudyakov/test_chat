import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Message } from '../core/types';
import { useAppSelector } from '../core/redux/hooks';
import { selectName } from '../core/redux/slices/userSlice';

interface FlatListComponentProps {
  item: Message;
}

function FlatListComponent({ item }: FlatListComponentProps) {
  const name = useAppSelector(selectName);
  return (
    <View
      style={[
        {
          display: 'flex',
          alignItems: item.user.name === name ? 'flex-end' : 'flex-start',
        },
      ]}
    >
      <View style={styles.listItemContainer}>
        <Image
          style={styles.imageStyles}
          source={{ uri: 'https://placebeard.it/140x140' }}
        />
        <View style={{ flexDirection: 'column', gap: 10 }}>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Text style={styles.name}>{item.user.name}</Text>
          <Text style={styles.date}>
            {' '}
            {item.createdAt.toString().slice(0, 24)}
          </Text>
          </View>
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
    opacity: 0.5,
  },
  name: {
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
