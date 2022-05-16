import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../routes/AuthProvider';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Icon from 'react-native-vector-icons/AntDesign';
import {ProfileScreenStyles as styles} from '../styles/ProfileStyles';
import AntIcon from 'react-native-vector-icons/AntDesign';

export default function ProfileScreen({navigation}) {
  const [isImageLoading, setImageLoading] = useState(true);
  const {logout, user} = useContext(AuthContext);

  return (
    <View style={{...styles.container, backgroundColor: '#42af7f66'}}>
      <Pressable
        style={styles.edit}
        onPress={() => navigation.navigate('EDIT_PROFILE-MODAL')}>
        <Text style={styles.editText}>
          Edit Profile
          <AntIcon name="edit" style={styles.editIcon} size={15} />
        </Text>
      </Pressable>
      {/*  */}
      <ImageBackground
        source={
          user.photoURL
            ? {uri: user.photoURL}
            : require('../assets/images/logo.png')
        }
        imageStyle={{resizeMode: 'cover'}}
        style={styles.imageBackground}
        blurRadius={1}></ImageBackground>

      <View style={styles.profileContainer}>
        <SkeletonPlaceholder />
        <Image
          source={
            user.photoURL
              ? {uri: user.photoURL}
              : require('../assets/images/screens/user.png')
          }
          onLoadEnd={() => setImageLoading(false)}
          style={styles.userImage}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}>
        <View>
          <Text style={styles.username}>
            {user.displayName ? user.displayName : '@no_username'}
          </Text>

          <View style={styles.phone}>
            <Icon name="phone" size={22} color="#ccc" />
            <Text style={styles.detailText}>
              {user.phoneNumber ? user.phoneNumber : 'NA'}
            </Text>
          </View>

          <View style={styles.phone}>
            <Icon name="mail" size={22} color="#ccc" />
            <Text style={styles.detailText}>
              {user.email ? user.email : 'NA'}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              paddingVertical: 15,
              paddingHorizontal: 10,
            }}>
            <View>
              <Text style={styles.smallDetail}>Today's Sales</Text>
              <Text style={styles.someStats}>NPR 40</Text>
            </View>
            <View>
              <Text style={styles.smallDetail}>Products Sold</Text>
              <Text style={styles.someStats}>45</Text>
            </View>
          </View>

          <FunctionButtons title="ORDERS" icon="mail" />
          <FunctionButtons title="SALES" icon="mail" />
          <FunctionButtons title="DISEASE DIAGNOSIS" icon="mail" />
          <FunctionButtons title="SOIL PH CHECK" icon="mail" />
          {/* <FunctionButtons title="FARM OVERVIEW" icon="mail" /> */}

          <FunctionButtons
            title="LOGOUT"
            icon="logout"
            onPress={() => logout()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const FunctionButtons = ({title, icon, ...props}) => {
  return (
    <Pressable style={styles.functions} {...props}>
      <Icon name={icon} size={22} color="#aaa" />
      <Text style={styles.functionText}>{title}</Text>
    </Pressable>
  );
};
