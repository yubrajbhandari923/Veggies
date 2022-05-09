import {View, Text} from 'react-native';
import React, {useState, useContext} from 'react';
import ModalLayout from './ModalLayout';
import {UserUpdateStyles as styles} from '../../styles/ModalStyles';
import TextInput from '../TextInput';
import Button from '../Button';
import {AuthContext} from '../../routes/AuthProvider';
import {phoneValidator} from '../../helpers/validators';

export default function EmailVerify({navigation}) {
  const {whichProcessIsHappenningNow, updatePhone} = useContext(AuthContext);
  const [phone, setPhone] = useState({value: '', error: ''});

  const sendCode = () => {
    const phoneError = phoneValidator(phone.value);
    if (phoneError) {
      setPhone({...phone, error: phoneError});
      return;
    }

    updatePhone(phone.value);
  };
  return (
    <ModalLayout>
      <View style={styles.container}>
        <Text style={styles.title}> Update Phone Number </Text>

        <View style={styles.inputContainer}>
          <TextInput
            label="Phone Number"
            returnKeyType="next"
            value={phone.value}
            onChangeText={text => setPhone({value: text, error: ''})}
            error={phone.error}
            errorText={phone.error}
            autoCapitalize="none"
            keyboardType="phone-pad"
            initialText="+977"
          />
        </View>
        <Button
          mode="contained"
          onPress={sendCode}
          style={{marginTop: 24}}
          disabled={whichProcessIsHappenningNow == 'UPDATE-PHONE'}
          loading={whichProcessIsHappenningNow == 'UPDATE-PHONE'}>
          Update
        </Button>
      </View>
    </ModalLayout>
  );
}
