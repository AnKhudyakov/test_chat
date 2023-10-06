import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface InputComponentProps {
  changeTextHandler: (text: string) => void;
  value: string;
  sendMessage: () => void;
}

const InputComponent: React.FC<InputComponentProps> = ({
  changeTextHandler,
  value,
  sendMessage,
}) => {
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={changeTextHandler}
        onSubmitEditing={sendMessage}
        value={value}
        placeholder="Type a message"
        returnKeyType="done"
        returnKeyLabel="done"
        underlineColorAndroid="transparent"
      />
      <Pressable style={styles.inputButton} onPress={sendMessage}>
        <Icon name="paper-plane" color={'black'} size={20} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 5,
    gap: 10,
  },
  textInput: {
    height: 50,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: 'transparent',
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 1,
  },
  inputButton: {
    display: 'flex',
    height: 50,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#fff',
    elevation: 1,
  },
});

export default InputComponent;
