import React from 'react';
import {Text} from 'react-native-paper';
import {headerStyles as styles} from '../styles/globalStyles';
export default function Header(props) {
  return <Text style={styles.header} {...props} />;
}
