import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {checkIfFirstAppUse} from '../helpers/first_Time_App_OpenCheck';
import VeggiesLogoStartupScreen from '../screens/VeggiesLogoStartupScreen';
import {Provider} from 'react-native-paper';
import {theme} from '../core/theme';
//
import LoginScreen from '../screens/LoginScreen';
import OnBoardingScreen from '../screens/OnboardingScreen';
import StartScreen from '../screens/StartScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPassword from '../screens/ForgotPassword';

export const Stack = createStackNavigator();

export default class AuthStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstAppUse: null,
      isLoading: true,
    };
  }
  componentDidMount() {
    // Check if the app is used for first time, then show the OnBoarding Screen
    let isFirstUse = checkIfFirstAppUse();
    isFirstUse.then(value => {
      this.setState({isFirstAppUse: JSON.parse(value)});
      // When the component mounts, we dont need to show the loader
      this.setState({isLoading: false});
    });
  }

  render() {
    // Show a Loader Until a asynchronous fetch is done
    const initialRoute = this.state.isFirstAppUse
      ? 'ONBOARDING_SCREEN'
      : 'START_SCREEN';
    if (this.state.isLoading) {
      return <VeggiesLogoStartupScreen />;
    } else {
      // Render either OnBoarding Screen or LoginScreen Based on isFirstAppUse state.

      return (
        <Provider theme={theme}>
          <Stack.Navigator
            initialRouteName={initialRoute}
            screenOptions={{headerShown: false}}>
            <Stack.Screen
              component={OnBoardingScreen}
              name="ONBOARDING_SCREEN"
            />
            <Stack.Screen component={StartScreen} name="START_SCREEN" />
            <Stack.Screen
              component={LoginScreen}
              name="LOGIN_SCREEN"
              initialParams={{mode: 'FARMER'}}
            />
            <Stack.Screen
              component={RegisterScreen}
              name="REGISTER_SCREEN"
              // initialParams={{mode: 'FARMER'}}
            />
            <Stack.Screen
              component={ForgotPassword}
              name="FORGOT_PASSWORD_SCREEN"
            />
          </Stack.Navigator>
        </Provider>
      );
    }
  }
}
