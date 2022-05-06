import React from 'react';
import {Button as PaperButton} from 'react-native-paper';
import {buttonStyles as styles} from '../styles/globalStyles';

export default function Button({mode, style, ...props}) {
  return (
    <PaperButton
      // theme={theme}
      style={[
        styles.button,
        mode === 'outlined' && {...styles.outlined},
        style,
      ]}
      labelStyle={{...styles.text, color: mode == 'outlined' ? '#000' : '#fff'}}
      mode={mode}
      {...props}
    />
  );
}
