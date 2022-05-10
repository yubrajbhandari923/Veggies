import React, {useState, useContext} from 'react';
import {
  TouchableOpacity,
  View,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../components/BackGround';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {forgotPasswordStyles as styles} from '../styles/AuthStyles';

import {emailValidator} from '../helpers/validators';
import {AuthContext} from '../routes/AuthProvider';

export default function ForgotPassword({navigation}) {
  const {whichProcessIsHappenningNow, resetPassword} = useContext(AuthContext);

  const [email, setEmail] = useState({value: '', error: ''});

  const onResetPressed = () => {
    // Just Validators
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({...email, error: emailError});
      return;
    }

    // Now send the reset mail
    resetPassword(email.value);
  };

  return (
    <Background>
      <Logo />

      {/*  */}

      <Header>PASSWORD RESET</Header>

      <TextInput
        label="Enter your email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      {/* Login Button Here */}
      <Button
        mode="contained"
        onPress={onResetPressed}
        disabled={whichProcessIsHappenningNow == 'RESET-PASSWORD'}
        loading={whichProcessIsHappenningNow == 'RESET-PASSWORD'}>
        SEND EMAIL
      </Button>
      <View style={styles.row}>
        <Text style={styles.instead}>Login Instead?</Text>
        <TouchableOpacity onPress={() => navigation.replace('LOGIN_SCREEN')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const SocialButtons = ({provider, process, ...props}) => {
  return (
    <Pressable style={styles.socialButton} {...props}>
      <Image
        source={
          provider == 'GOOGLE'
            ? require('../assets/icons/google.png')
            : require('../assets/icons/facebook.png')
        }
        style={styles.socialIcon}
      />
      <Text
        style={{
          fontWeight: '700',
          color: provider == 'GOOGLE' ? '#b63429' : '#3b5999',
        }}>
        {provider}
      </Text>
      {(provider == 'GOOGLE' && process == 'LOGIN-GOOGLE') ||
      (provider == 'FACEBOOK' && process == 'LOGIN-FACEBOOK') ? (
        <ActivityIndicator size="small" color="#ccc" />
      ) : null}
    </Pressable>
  );
};
