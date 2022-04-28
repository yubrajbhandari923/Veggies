import {Snackbar} from 'react-native-paper';
import {Text, View, Image} from 'react-native';
import React, {useContext} from 'react';
import {SnackBarStyles as styles} from '../styles/SnackBarStyles';
import {AuthContext} from '../routes/AuthProvider';

export default function ActionNotification({...props}) {
  const {setMessage, message} = useContext(AuthContext);

  return (
    <Snackbar
      duration={2200}
      style={{
        backgroundColor: message.error ? '#772121' : '#297558',
        ...styles.snackbarStyle,
      }}
      visible={message.visible}
      theme={{
        colors: {accent: '#fff'},
      }}
      onDismiss={() => setMessage(false, false, null)}
      action={{
        label: 'DISMISS',
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
