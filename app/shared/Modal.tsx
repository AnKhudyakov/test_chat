import { View, Text, TextInput, Pressable } from 'react-native';
import React, { Dispatch, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Socket } from 'socket.io-client';
import { selectName } from '../core/redux/slices/userSlice';
import { useAppSelector } from '../core/redux/hooks';

type ModalProps = {
  setVisible: Dispatch<React.SetStateAction<boolean>>;
  socket: Socket | null;
};

const Modal = ({ setVisible, socket }: ModalProps) => {
  const userName = useAppSelector(selectName);
  const [chatName, setChatName] = useState('');
  const [focus, setFocus] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const closeModal = () => setVisible(false);

  const handleCreateRoom = () => {
    if (chatName) {
      console.log(chatName);
      socket?.emit('createChat', { name: chatName, userName });
      closeModal();
    } else {
      setError(true);
    }
  };
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalWindow}>
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
    </View>
  );
};

export default Modal;

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
  modalContainer: {
    position: 'absolute',
    top: -20,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalWindow: {
    width: '90%',
    minHeight: 180,
    backgroundColor: '#f5fcff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    gap: 10,
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
