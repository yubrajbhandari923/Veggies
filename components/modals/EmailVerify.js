import {View, Text} from 'react-native';
import React, {useState, useContext} from 'react';
import ModalLayout from './ModalLayout';
import {VerifyEmailStyles as styles} from '../../styles/ModalStyles';
import Button from '../Button';
import {AuthContext} from '../../routes/AuthProvider';
import {emailValidator} from '../../helpers/validators';

export default function EmailVerify({navigation}) {
  const {whichProcessIsHappenningNow, verifyMail, user} =
    useContext(AuthContext);

  const [company, domain] = user.auth.currentUser.email.split('@');
  const securedMail = `${company[0]}${new Array(company.length).join(
    '*',
  )}@${domain}`;

  return (
    <ModalLayout style={{height: '45%'}}>
      <View style={styles.container}>
        <Text style={styles.title}> Verify E-mail</Text>

        <Text style={styles.description}>
          A verification page will be send to {securedMail}
        </Text>

        <Text style={styles.note}>Note: Check spam folder</Text>

        <Button
          mode="contained"
          onPress={verifyMail}
          style={{marginTop: 24}}
          disabled={whichProcessIsHappenningNow == 'VERIFY-EMAIL'}
          loading={whichProcessIsHappenningNow == 'VERIFY-EMAIL'}>
          SEND MAIL
        </Button>
      </View>
    </ModalLayout>
  );
}
