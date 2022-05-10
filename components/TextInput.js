import React from 'react';
import {View, Text} from 'react-native';
import {TextInput as Input} from 'react-native-paper';
import {inputStyles as styles} from '../styles/globalStyles';
import {theme} from '../core/theme';

export default function TextInput({errorText, description, ...props}) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}
