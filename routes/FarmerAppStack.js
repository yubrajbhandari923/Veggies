import React, {Component} from 'react';

import {Provider} from 'react-native-paper';
import {theme} from '../core/theme';
//
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import MessageScreen from '../screens/MessagesScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UsernameUpdate from '../components/modals/UsernameUpdate';
import PhoneUpdate from '../components/modals/PhoneUpdate';
import AddressUpdate from '../components/modals/AddressUpdate';
import EmailVerify from '../components/modals/EmailVerify';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import NewsModal from '../components/modals/NewsModal';
import EditUser from '../screens/EditUser';

export const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();
export default class FarmerAppStack extends Component {
  render() {
    return (
      <Provider theme={theme}>
        <Stack.Navigator
          initialRouteName="EDIT_PROFILE-MODAL"
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
            <Stack.Screen name="NEWS_FEED-MODAL" component={NewsModal} />
            <Stack.Screen
              name="USERNAME_UPDATE-MODAL"
              component={UsernameUpdate}
            />
            <Stack.Screen name="PHONE_UPDATE-MODAL" component={PhoneUpdate} />
            <Stack.Screen
              name="ADDRESS_UPDATE-MODAL"
              component={AddressUpdate}
            />
            <Stack.Screen name="EMAIL_VERIFY-MODAL" component={EmailVerify} />
          </Stack.Group>

          <Stack.Group
            screenOptions={{
              ...TransitionPresets.ModalPresentationIOS,
            }}>
            <Stack.Screen name="EDIT_PROFILE-MODAL" component={EditUser} />
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
      <Tab.Screen
        component={MessageScreen}
        name="MESSAGE-SCREEN"
        options={{
          tabBarIcon: ({color, size}) => (
            <AntIcons name="message1" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        component={HomeScreen}
        name="HOME-SCREEN"
        options={{
          tabBarIcon: ({color, size}) => (
            <AntIcons name="home" color={color} size={35} />
          ),
        }}
      />
      <Tab.Screen
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
      <Tab.Screen
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
