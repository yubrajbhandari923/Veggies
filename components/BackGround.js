import React from 'react';
import {ScrollView} from 'react-native';
import {backgroundStyles as styles} from '../styles/AuthStyles';
export default function Background({children}) {
  return (
    <ScrollView
      resizeMode="repeat"
      style={styles.background}
      contentContainerStyle={styles.container}>
      {/* <View style={styles.container} behavior="padding"> */}
      {children}
      {/* </View> */}
    </ScrollView>
  );
}
