import {View, Text} from 'react-native';
import React, {useState, useContext} from 'react';
import ModalLayout from './ModalLayout';
import {UserUpdateStyles as styles} from '../../styles/ModalStyles';
import TextInput from '../TextInput';
import Button from '../Button';
import {AuthContext} from '../../routes/AuthProvider';
import {nameValidator} from '../../helpers/validators';

export default function UsernameUpdate({navigation}) {
  const {whichProcessIsHappenningNow, updateUsername} = useContext(AuthContext);
  const [username, setUsername] = useState({value: '', error: ''});

  const update = () => {
    const nameError = nameValidator(username.value);
    if (nameError) {
      setUsername({...username, error: nameError});
      return;
    }

    updateUsername(username.value);
  };
  return (
    <ModalLayout>
      <View style={styles.container}>
        <Text style={styles.title}> Update Username </Text>

        <View style={styles.inputContainer}>
          <TextInput
            label="Username"
            returnKeyType="next"
            value={username.value}
            onChangeText={text => setUsername({value: text, error: ''})}
            error={username.error}
            errorText={username.error}
            autoCapitalize="none"
            keyboardType="default"
          />
        </View>
        <Button
          mode="contained"
          onPress={update}
          style={{marginTop: 24}}
          disabled={whichProcessIsHappenningNow == 'UPDATE-USERNAME'}
          loading={whichProcessIsHappenningNow == 'UPDATE-USERNAME'}>
          Update
        </Button>
      </View>
    </ModalLayout>
  );
}
