import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {HeaderBackButtonStyles as styles} from '../styles/globalStyles';

// This fucntion accepts a title prop that is shown
// in that title we place a back button
// It also accepts a function as a prop named backButtonPressFunction
// This function is executed on press of that button
// it is uusually used to navigate back, so provied a navigating function to navigate to certain screen

const HeaderForBackButton = ({title, backButtonPressFunction}) => {
  return (
    /* Header to Go Back to Login */
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => backButtonPressFunction()}>
        <Icon name="chevron-left" style={styles.icon} size={20} />
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default HeaderForBackButton;
