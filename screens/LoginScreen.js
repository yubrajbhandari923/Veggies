import React, {useState, useContext, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
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

export default function LoginScreen({navigation}) {
  const {
    googleLogin,
    login,
    whichProcessIsHappenningNow,
    setWhichProcessIsHappenningNow,
    setMessage,
    facebookLogin,
  } = useContext(AuthContext);

  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

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

  return (
    <Background>
      <Logo />

      {/*  */}

      <Header>LOGIN</Header>

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
          onPress={() => navigation.navigate('ResetPasswordScreen')}>
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
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.replace('REGISTER_SCREEN')}>
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

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    color: theme.colors.primary,
    fontSize: 16,
    marginLeft: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  socialButton: {
    width: 145,
    height: 50,
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 7,
  },
  socialIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
});
