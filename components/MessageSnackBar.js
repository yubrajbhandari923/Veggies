import {Snackbar} from 'react-native-paper';
import {Text, View, Image} from 'react-native';
import React, {useContext} from 'react';
import {SnackBarStyles as styles} from '../styles/globalStyles';
import {AuthContext} from '../routes/AuthProvider';
import {theme} from '../core/theme';

export default function ActionNotification({...props}) {
  const {setMessage, message} = useContext(AuthContext);

  return (
    <Snackbar
      duration={2200}
      style={{
        backgroundColor: message.error
          ? theme.colors.error
          : theme.colors.success,
        ...styles.snackbarStyle,
      }}
      visible={message.visible}
      onDismiss={() => setMessage(false, false, null)}
      action={{
        label: <Text style={styles.dismiss}>DISMISS</Text>,
        onPress: () => {
          setMessage(false, false, null);
        },
      }}>
      <View style={styles.snackBarContainer}>
        {/* Show happy face if error is set to false else show sad face */}
        <Image
          style={styles.image}
          size={40}
          source={
            message.error
              ? require('../assets/icons/cancel.png')
              : require('../assets/icons/check.png')
          }
        />
        {/* Message is rendered here */}
        <Text style={styles.message}>{message.message}</Text>
      </View>
    </Snackbar>
  );
}
