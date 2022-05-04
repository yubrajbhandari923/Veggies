import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../components/BackGround';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
// import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../helpers/validators';
import {AuthContext} from '../routes/AuthProvider';

export default function RegisterScreen({navigation}) {
  const {register, whichProcessIsHappenningNow} = useContext(AuthContext);
  const [name, setName] = useState({value: 'Biamrsh Bhusal', error: ''});
  const [email, setEmail] = useState({
    value: 'beemarsh.bhusal@gmail.com',
    error: '',
  });
  const [password, setPassword] = useState({value: 'Bhusal12', error: ''});

  const onSignUpPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const nameError = nameValidator(name.value);

    if (emailError || passwordError || nameError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      setName({...name, error: nameError});
      return;
    }

    register(name.value, email.value, password.value);
  };

  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({value: text, error: ''})}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
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
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{marginTop: 24}}
        disabled={whichProcessIsHappenningNow == 'REGISTER-EMAIL'}
        loading={whichProcessIsHappenningNow == 'REGISTER-EMAIL'}>
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LOGIN_SCREEN')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
  },
  link: {
    color: theme.colors.primary,
    fontSize: 16,
    marginLeft: 10,
  },
});
