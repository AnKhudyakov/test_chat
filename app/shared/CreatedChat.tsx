import { View, Text, TextInput, Pressable } from 'react-native';
import React, { Dispatch, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Socket } from 'socket.io-client';
import { selectName } from '../core/redux/slices/userSlice';
import { useAppSelector } from '../core/redux/hooks';

type CreatedChatCardProps = {
  setVisible: Dispatch<React.SetStateAction<boolean>>;
  socket: Socket | null;
};

function CreatedChat({ setVisible, socket }: CreatedChatCardProps) {
  const userName = useAppSelector(selectName);
  const [chatName, setChatName] = useState('');
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const closeModal = () => setVisible(false);

  const handleCreateRoom = () => {
    if (chatName) {
      socket?.emit('createChat', { name: chatName, userName });
      closeModal();
    } else {
      setError(true);
    }
  };
  return (
    <View>
      <Text style={styles.modalsubheading}>Enter Chat name</Text>
      <TextInput
        style={[
          styles.modalinput,
          { borderBottomWidth: focus ? 2 : 1 },
          { borderColor: error ? 'red' : '#000' },
        ]}
        placeholder="Type chat name here..."
        onChangeText={(value) => setChatName(value)}
        onFocus={() => setFocus(true)}
      />

      <View style={styles.modalbuttonContainer}>
        <Pressable style={styles.modalbutton} onPress={handleCreateRoom}>
          <Text style={styles.modaltext}>CREATE</Text>
        </Pressable>
        <Pressable
          style={[styles.modalbutton, { backgroundColor: '#ee7053' }]}
          onPress={closeModal}
        >
          <Text style={styles.modaltext}>CANCEL</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalbutton: {
    width: '45%',
    height: 45,
    backgroundColor: '#61dbfc',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  modalbuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modaltext: {
    color: '#fff',
  },
  modalinput: {
    padding: 10,
  },
  modalsubheading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CreatedChat;
