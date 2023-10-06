import React from 'react';
import { StyleSheet, View } from 'react-native';

type ModalProps = {
  children: React.ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalWindow}>{children}</View>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
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
    backgroundColor: '#f5fcff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    gap: 10,
  },
});
