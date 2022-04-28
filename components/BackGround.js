import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {theme} from '../core/theme';

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

const styles = StyleSheet.create({
  background: {
    // flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
