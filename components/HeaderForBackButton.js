import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// This fucntion accepts a title prop that is shown
// in that title we place a back button
// It also accepts a function as a prop named backButtonPressFunction
// This function is executed on press of that button
// it is uusually used to navigate back, so provied a navigating function to navigate to certain screen

const HeaderForBackButton = ({title, backButtonPressFunction}) => {
  return (
    /* Header to Go Back to Login */
    <View
      style={{
        height: 50,
        width: '100%',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          padding: 10,
          alignItems: 'center',
        }}
        activeOpacity={0.8}
        onPress={() => backButtonPressFunction()}>
        <Icon name="angle-left" size={22} color="#36a17bd9" />
        <Text style={{marginLeft: 10, color: '#36a17bd9'}}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default HeaderForBackButton;
