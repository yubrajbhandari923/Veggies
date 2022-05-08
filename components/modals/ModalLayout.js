import {ScrollView, View} from 'react-native';
import {ModalLayoutStyles as styles} from '../../styles/ModalStyles';
import React from 'react';

export default ModalLayout = ({children, style, ...props}) => {
  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
      style={{...styles.modalContainer, ...style}}
      contentContainerStyle={{paddingVertical: 20}}>
      <View style={styles.smallBar}></View>
      {children}
    </ScrollView>
  );
};
