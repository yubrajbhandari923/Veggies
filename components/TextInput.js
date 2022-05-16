import React from 'react';
import {View, Text} from 'react-native';
import {TextInput as Input} from 'react-native-paper';
import {inputStyles as styles} from '../styles/globalStyles';
import {theme} from '../core/theme';

export default function TextInput({
  errorText,
  description,
  initialText,
  style,
  icon,
  ...props
}) {
  return (
    <View style={styles.container}>
      <Input
        style={{...styles.input, ...style}}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        left={
          initialText ? (
            <Input.Affix text={initialText} />
          ) : icon ? (
            <Input.Icon icon={() => icon} />
          ) : null
        }
        {...props}
      />

      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}
