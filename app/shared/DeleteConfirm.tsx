import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppDispatch } from '../core/redux/hooks';
import {
  setDeleteMessageModal,
  setIsShowEditMessage,
  setSelectedMessage,
} from '../core/redux/slices/messageSlice';
import { getSocket } from '../core/services/socketApi';
import { setIsShowModalDelete, setSelectedChat } from '../core/redux/slices/chatSlice';

type DeleteConfirmProps = {
  id: string | undefined;
  variant: string;
};

function DeleteConfirm({ id, variant }: DeleteConfirmProps) {
  const dispatch = useAppDispatch();

  const closeModal = () => {
    if (variant === 'chat') {
      dispatch(setSelectedChat(null));
      dispatch(setIsShowModalDelete(false));
    } else if (variant === 'message') {
      dispatch(setDeleteMessageModal(false));
    }
  };

  const handleDelete = () => {
    if (variant === 'chat') {
      getSocket()?.emit('removeChat', id);
      closeModal();
    } else if (variant === 'message') {
      getSocket()?.emit('removeMessage', id);
      dispatch(setSelectedMessage(null));
      dispatch(setIsShowEditMessage(false));
      closeModal();
    }
  };

  return (
    <View
      style={{ backgroundColor: 'transparent', width: '100%', padding: 10 }}
    >
      <Text style={styles.modalsubheading}>Delete this Chat?</Text>
      <View style={styles.modalbuttonContainer}>
        <Pressable style={styles.modalbutton} onPress={handleDelete}>
          <Text style={styles.modaltext}>DELETE</Text>
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
    width: '30%',
    height: 30,
    backgroundColor: '#61dbfc',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 15,
  },
  modalbuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  modaltext: {
    color: '#fff',
  },
  modalinput: {
    padding: 10,
  },
  modalsubheading: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DeleteConfirm;
