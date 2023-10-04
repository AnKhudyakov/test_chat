import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { useAppSelector, useAppDispatch } from '../core/redux/hooks';
import { selectName, setName } from '../core/redux/slices/userSlice';

interface LoginScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

function LoginScreen({ navigation }: LoginScreenProps) {
  const name = useAppSelector(selectName);
  const dispatch = useAppDispatch();
  const [error, setError] = useState<boolean>(false);

  const onSubmitFuction = () => {
    if (name) {
      navigation.navigate('MainScreen', { name });
    } else {
      setError(true);
    }
  };

  return (
    <View style={styles.loginWrapper}>
      <Text style={styles.mainTitle}>Login</Text>
      <TextInput
        style={[
          styles.textInput,
          { borderColor: error ? 'red' : '#000' },
        ]}
        onChangeText={(text) => dispatch(setName(text))}
        onSubmitEditing={onSubmitFuction}
        value={name}
        placeholder="Type your nickname here..."
        underlineColorAndroid="transparent"
      />
      <TouchableHighlight
        style={styles.inputButton}
        onPress={onSubmitFuction}
        underlayColor="#61dbfc"
      >
        <Text>Login</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  loginWrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  mainTitle: {
    fontSize: 20,
    paddingTop: 60,
    paddingBottom: 15,
  },
  secondaryTitle: {
    fontSize: 16,
    paddingBottom: 20,
  },
  textInput: {
    height: 50,
    padding: 10,
    borderBottomWidth: 1,
    width: '90%',
  },
  inputButton: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 40,
    backgroundColor: '#61dbfc',
    elevation: 1,
  },
});

export default LoginScreen;
