import React, {Component} from 'react';
import {Provider} from 'react-native-paper';
import {theme} from '../core/theme';
//
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntIcons from 'react-native-vector-icons/AntDesign';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Home from '../screens/consumer/Home';

export const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default class FarmerAppStack extends Component {
  render() {
    return (
      <Provider theme={theme}>
        <Stack.Navigator
          initialRouteName="TAB"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="TAB" component={TabNavigator} />

          {/* We render the universal modals here */}
          <Stack.Group
            screenOptions={{
              presentation: 'transparentModal',
              headerShown: false,
              cardOverlayEnabled: true,
              gestureEnabled: true,
              ...TransitionPresets.ModalPresentationIOS,
            }}>
            {/* Modals Here */}
          </Stack.Group>
        </Stack.Navigator>
      </Provider>
    );
  }
}

// The Bottom Tabs are rendered here
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HOME-SCREEN"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: '#2bc48a',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          paddingVertical: 5,
          elevation: 1,
        },
        tabBarItemStyle: {
          marginBottom: 10,
        },
      }}>
      <Tab.Screen
        component={Home}
        name="HOME-SCREEN"
        options={{
          tabBarIcon: ({color, size}) => (
            <AntIcons name="message1" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
