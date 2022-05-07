import React, {useState, useContext, useEffect} from 'react';
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
// import BackButton from '../components/BackButton'
import {theme} from '../core/theme';

import {emailValidator, passwordValidator} from '../helpers/validators';
import {AuthContext} from '../routes/AuthProvider';
import {errorCodeBasedOnFrbCode} from '../helpers/firebaseErrorCodesMessage';
import SwitchMode from '../components/switchMode';
import {loginScreenStyles as styles} from '../styles/AuthStyles';
import AsyncStorage from '@react-native-community/async-storage';

export default function LoginScreen({navigation, route}) {
  const {
    googleLogin,
    login,
    whichProcessIsHappenningNow,
    setWhichProcessIsHappenningNow,
    setMessage,
    facebookLogin,
    mode,
    setMode,
  } = useContext(AuthContext);

  const [email, setEmail] = useState({value: 'anup8eguy@gmail.com', error: ''});
  const [password, setPassword] = useState({value: 'Bhusal12', error: ''});

  const onLoginPressed = () => {
    // Just Validators for LOGIN
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }

    // Now do the login
    login(email.value, password.value);
  };

  // When the component mounts set the mode
  useEffect(() => {
    if (route.params?.mode) {
      setMode(route.params.mode);
      AsyncStorage.setItem('mode', route.params.mode);
    }
  }, []);

  // When the component mounts, lets decied whether he is a farmer or a consumer
  return (
    <Background>
      <SwitchMode navigation={navigation} referer="login" />
      <Logo style={{marginBottom: 20}} />

      {/*  */}

      {/* <Header>LOGIN</Header> */}

      <View style={styles.socialContainer}>
        <SocialButtons
          provider="GOOGLE"
          process={whichProcessIsHappenningNow}
          disabled={whichProcessIsHappenningNow == 'LOGIN-GOOGLE'}
          onPress={() =>
            googleLogin()
              .then(user => {
                setWhichProcessIsHappenningNow(null);
              })
              .catch(e => {
                setWhichProcessIsHappenningNow(null);
                setMessage(true, true, e.message);
                // if (__DEV__) console.log(e);
              })
          }
        />
        <SocialButtons
          provider="FACEBOOK"
          process={whichProcessIsHappenningNow}
          onPress={() => {
            facebookLogin()
              .then(user => {
                setWhichProcessIsHappenningNow(null);
                console.log(user);
              })
              .catch(e => {
                setWhichProcessIsHappenningNow(null);
                setMessage(
                  true,
                  true,
                  e.code ? errorCodeBasedOnFrbCode(e.code) : "Couldn't Login",
                );
                if (__DEV__) console.log(e);
              });
          }}
        />
      </View>

      <Text style={{marginTop: 10, color: theme.colors.primary}}>OR</Text>

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

      {/* Password here */}
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      {/* Forgot Password Here */}
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('FORGOT_PASSWORD_SCREEN')}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button Here */}
      <Button
        mode="contained"
        onPress={onLoginPressed}
        disabled={whichProcessIsHappenningNow == 'LOGIN-EMAIL'}
        loading={whichProcessIsHappenningNow == 'LOGIN-EMAIL'}>
        Login
      </Button>
      <View style={styles.row}>
        <Text style={styles.instead}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.replace(
              mode == 'FARMER'
                ? 'REGISTER_SCREEN-FARMER'
                : 'REGISTER_SCREEN-CONSUMER',
              {mode: null},
            )
          }>
          <Text style={styles.link}>Sign up</Text>
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
