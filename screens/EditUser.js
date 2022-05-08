import {View, Text, ScrollView, Pressable, Image} from 'react-native';
import React from 'react';
import {AuthContext} from '../routes/AuthProvider';
import {EditProfileStyle as styles} from '../styles/ProfileStyles';
import HeaderForBackButton from '../components/HeaderForBackButton';
import Button from '../components/Button';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Octicons from 'react-native-vector-icons/Octicons';

export default function EditUser({navigation}) {
  const {user, address, uploadPP, whichProcessIsHappenningNow} =
    React.useContext(AuthContext);

  return (
    <ScrollView
      style={{paddingRight: 20, paddingLeft: 10}}
      showsVerticalScrollIndicator={false}>
      <HeaderForBackButton
        title="Profile"
        backButtonPressFunction={() =>
          navigation.navigate('TAB', {screen: 'PROFILE-SCREEN'})
        }
      />

      {/* Edit Profile Title */}

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Edit Profile</Text>
      </View>

      <View style={styles.pictureEditor}>
        <View style={styles.imageContainer}>
          <Image
            source={
              user.photoURL
                ? {uri: user.photoURL}
                : require('../assets/images/screens/user.png')
            }
            style={styles.image}
          />
        </View>

        <Text style={styles.profileText}>Profile Picture</Text>

        <Button
          loading={whichProcessIsHappenningNow == 'UPLOAD-PROFILE_PIC'}
          disabled={whichProcessIsHappenningNow == 'UPLOAD-PROFILE_PIC'}
          mode="contained"
          style={{width: '80%'}}
          onPress={() => uploadPP()}>
          Upload
        </Button>
      </View>

      <EditItems
        title="USERNAME"
        subTitle={user.displayName ? user.displayName : 'NA'}
        onPress={() => this.props.navigation.navigate('MODAL_EDIT_USERNAME')}
      />
      <EditItems
        title="Phone"
        subTitle={user.phoneNumber ? user.phoneNumber : 'NA'}
        onPress={() => this.props.navigation.navigate('MODAL_EDIT_PHONE')}
      />
      <EditItems
        title="Address"
        subTitle={address ? address['street'] : 'NA'}
        onPress={() => this.props.navigation.navigate('MODAL_EDIT_ADDRESS')}
      />

      <EditItems
        title="Verify Email"
        subTitle={
          <Octicons
            name={user.emailVerified ? 'verified' : 'unverified'}
            style={user.emailVerified ? styles.verified : styles.unverified}>
            {user.emailVerified ? 'Verified' : 'Verify your account'}
          </Octicons>
        }
        onPress={
          user.emailVerified
            ? null
            : () => this.props.navigation.navigate('MODAL_EDIT_ADDRESS')
        }
      />
    </ScrollView>
  );
}

const EditItems = ({title, subTitle, ...props}) => {
  return (
    <Pressable
      android_ripple={{color: '#eee'}}
      style={styles.editTabsContainer}
      {...props}
      android_disableSound={true}>
      <View style={styles.editTabText}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.actualName}>{subTitle}</Text>
      </View>

      <View style={styles.iconContainer}>
        <EvilIcons name="chevron-right" size={24} color="#888" />
      </View>
    </Pressable>
  );
};
