import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

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
    <View style={{ flexDirection: 'row', width:"100%" }}>
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
      <TouchableHighlight
        style={styles.inputButton}
        underlayColor="#fff"
        onPress={sendMessage}
      >
        <Text>Send</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: 'transparent',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 1,
  },
  inputButton: {
    display: 'flex',
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 10,
    backgroundColor: '#fff',
    elevation: 1,
  },
});

export default InputComponent;
