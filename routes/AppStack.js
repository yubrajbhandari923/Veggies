import React, {Component} from 'react';

import {Provider} from 'react-native-paper';
import {theme} from '../core/theme';
//
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MessageScreen from '../screens/MessagesScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProfileScreen from '../screens/ProfileScreen';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

export const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
export default class AuthStack extends Component {
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
            }}></Stack.Group>
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
      <Stack.Screen
        component={HomeScreen}
        name="HOME-SCREEN"
        options={{
          tabBarIcon: ({color, size}) => (
            <AntIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Stack.Screen
        component={NotificationScreen}
        name="NOTIFICATION-SCREEN"
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="md-notifications-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Stack.Screen
        component={MessageScreen}
        name="MESSAGE-SCREEN"
        options={{
          tabBarIcon: ({color, size}) => (
            <AntIcons name="message1" color={color} size={size} />
          ),
        }}
      />
      <Stack.Screen
        component={ProductsScreen}
        name="PRODUCT-SCREEN"
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="palm-tree"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Stack.Screen
        component={ProfileScreen}
        name="PROFILE-SCREEN"
        options={{
          tabBarIcon: ({color, size}) => (
            <AntIcons name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
