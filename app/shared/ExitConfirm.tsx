import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../core/redux/hooks';
import {
  selectName,
  setIsShowModalExit,
  setName,
} from '../core/redux/slices/userSlice';
import { getSocket } from '../core/services/socketApi';

function ExitConfirm() {
  const dispatch = useAppDispatch();
  const name = useAppSelector(selectName);
  const closeModal = () => dispatch(setIsShowModalExit(false));

  const handleExit = () => {
    if (name) {
      dispatch(setName(''));
      closeModal();
      const socket = getSocket();
      socket?.disconnect();
    }
  };

  return (
    <View>
      <Text style={styles.modalsubheading}>Log out from Chat?</Text>
      <View style={styles.modalbuttonContainer}>
        <Pressable style={styles.modalbutton} onPress={handleExit}>
          <Text style={styles.modaltext}>EXIT</Text>
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

export default ExitConfirm;
